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

// Options
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

socket.on('message', ({ text, createdAt }) => {
    const html = Mustache.render(messageTemplate, {
        text,
        createdAt: moment(createdAt).format('h:mm a'),
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', ({ url, createdAt }) => {
    const html = Mustache.render(locationTemplate, {
        url,
        createdAt: moment(createdAt).format('h:mm a'),
    });
    $messages.insertAdjacentHTML('beforeend', html);
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

socket.emit('join', { username, room });
