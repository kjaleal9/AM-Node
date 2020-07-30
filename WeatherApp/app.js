const request = require('postman-request');

const WSUrl = 'http://api.weatherstack.com/current';
const MPUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const WSapiKey = '3b8e7fc4aec4fbba9c2d6ba53c3fbfec';
const MPapiKey =
    'pk.eyJ1Ijoia2phbGVhbDkiLCJhIjoiY2tkODluMzVvMDJqNzJybm9zZ2pmOWNlayJ9.oFo8_X7zqVfPTT5mpnI4Og';
const location = 'Chicago';
const units = 'f';

const mapBoxRequest = `${MPUrl}/${location}.json?access_token=${MPapiKey}`;

const weatherRequest = `${WSUrl}?access_key=${WSapiKey}&query=${location}&units=${units}`;

// request({ url: weatherRequest, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service');
//     } else if (response.body.error) {
//         console.log('Unable to find location');
//     } else {
//         const {
//             temperature,
//             feelslike,
//             weather_descriptions,
//         } = response.body.current;

//         console.log(
//             `
//             ${weather_descriptions[0]}.
//             It is currently ${temperature} degrees out.
//             It feels like ${feelslike} degrees out
//             `
//         );
//     }
// });

request({ url: mapBoxRequest, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather services');
    } else if (response.body.features.length === 0) {
        console.log('Try again with different search term');
    } else {
        console.log(response.body.features[0].center);
        longitude = response.body.features[0].center[0];
        latitude = response.body.features[0].center[1];
    }
});
