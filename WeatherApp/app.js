const request = require('postman-request')

const URL = 'http://api.weatherstack.com/current'
const apiKey = '3b8e7fc4aec4fbba9c2d6ba53c3fbfec'
const location = 'Chicago'

const weatherRequest = `${URL}?access_key=${apiKey}&query=${location}`


request({url: weatherRequest}, (err, response) =>  {
    const data = JSON.parse(response.body)
    console.log(data.current)
})