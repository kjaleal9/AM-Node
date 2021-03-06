console.log('Client side javascript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = '';
    messageTwo.textContent = '';
    messageOne.textContent = 'Loading';
    fetch(`http://localhost:3000/weather?address=${location}`).then(
        response => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecastData;
                }
            });
        }
    );
});
