const { geocode, forecast } = require('./uitls/geocode');

const WSUrl = 'http://api.weatherstack.com/current';
const MPUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const WSapiKey = '3b8e7fc4aec4fbba9c2d6ba53c3fbfec';
const MPapiKey =
    'pk.eyJ1Ijoia2phbGVhbDkiLCJhIjoiY2tkODluMzVvMDJqNzJybm9zZ2pmOWNlayJ9.oFo8_X7zqVfPTT5mpnI4Og';
const location = process.argv[2];
const units = 'f';

if (!location) {
    console.log('Please provide an address, or city!');
} else {
    geocode(location, MPUrl, MPapiKey, (error, {latitude , longitude, location } = {}) => {
        if (error) {
            return console.log('Error', error);
        }
        forecast(
            `${data.latitude},${data.longitude}`,
            WSUrl,
            WSapiKey,
            units,
            (error, forecastData) => {
                if (error) {
                    console.log('Error', error);
                } else {
                    console.log(data.location);
                    console.log(forecastData);
                }
            }
        );
    });
}
