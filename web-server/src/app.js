const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocode, forecast } = require('./uitls/geocode');
const WSUrl = 'http://api.weatherstack.com/current';
const MPUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const WSapiKey = '3b8e7fc4aec4fbba9c2d6ba53c3fbfec';
const MPapiKey =
    'pk.eyJ1Ijoia2phbGVhbDkiLCJhIjoiY2tkODluMzVvMDJqNzJybm9zZ2pmOWNlayJ9.oFo8_X7zqVfPTT5mpnI4Og';
const units = 'f';
const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

// Setup static directory to use
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kris Leal',
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kris Leal',
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kris Leal',
        helpText: 'This is some helpful text',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address',
        });
    }
    geocode(req.query.address, MPUrl, MPapiKey, (error, data) => {
        if (error) {
            return res.send({
                error: 'Cannot connect to location services',
            });
        }
        forecast(
            `${data.latitude},${data.longitude}`,
            WSUrl,
            WSapiKey,
            units,
            (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'Cannot connect to location services',
                    });
                }
                res.send({
                    location: data.location,
                    forecastData: forecastData,
                });
            }
        );
    });
});

app.get('/help/*', (req, res) => {
    res.render('my404page', {
        title: '404',
        text: 'Help article not found',
        name: 'Kris Leal',
    });
});

app.get('*', (req, res) => {
    res.render('my404page', {
        title: '404',
        text: 'Page not found',
        name: 'Kris Leal',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
