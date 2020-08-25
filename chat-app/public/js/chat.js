const socket = io();

// Elements
const $chatForm = document.querySelector('#chatForm');
const $chatInput = $chatForm.querySelector('input');
const $chatButton = $chatForm.querySelector('button');
const $locButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild;

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // Visible height
    const visibleHeight = $messages.offsetHeight;

    // Height of message container
    const containerHeight = $messages.scrollHeight;

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }
};

socket.on('message', ({ username, text, createdAt }) => {
    const html = Mustache.render(messageTemplate, {
        username,
        text,
        createdAt: moment(createdAt).format('h:mm:ss a'),
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('locationMessage', ({ username, url, createdAt }) => {
    const html = Mustache.render(locationTemplate, {
        username,
        url,
        createdAt: moment(createdAt).format('h:mm a'),
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users,
    });
    document.querySelector('#sidebar').innerHTML = html;
});

$chatForm.addEventListener('submit', e => {
    e.preventDefault();

    $chatButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, error => {
        $chatButton.removeAttribute('disabled');
        $chatInput.value = '';
        $chatInput.focus();

        if (error) {
            return console.log(error);
        }

        console.log('Message delivered!');
    });
});

$locButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }
    $locButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        socket.emit('sendLocation', { latitude, longitude }, () => {
            console.log('Location shared!');
            $locButton.removeAttribute('disabled');
        });
    });
});

socket.emit('join', { username, room }, error => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});
