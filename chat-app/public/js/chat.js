const socket = io();

socket.on('countUpdated', count => {
    console.log('The count has been updated!', count);
    countElement.innerHTML = count;
});

document.querySelector('#increment').addEventListener('click', e => {
    socket.emit('increment');
});

const countElement = document.querySelector('#count');
