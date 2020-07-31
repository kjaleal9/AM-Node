const path = require('path');
const express = require('express');
const hbs = require('hbs')

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

// Setup static directory to use
app.use(express.static(publicDirectory));

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kris Leal'
    })
})
app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kris Leal'
    })
})
app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kris Leal',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    res.send('Your weather');
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
