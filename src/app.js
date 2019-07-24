// core module
const path = require('path');

// npm modules
const express = require('express');
const hbs = require('hbs');

// local imports
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.port || 3000;
const app = express();

// path
const publicDirectoryPath = path.join(__dirname, '../public');
const pathViews = path.join(__dirname, '../templates/views');
const pathPartials = path.join(__dirname, '../templates/partials');

// serve static files
app.use(express.static(publicDirectoryPath))

// view engine
app.set('view engine', 'hbs');
app.set('views', pathViews);
hbs.registerPartials(pathPartials);

// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please type a location'
        })
    }

    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        const locationName = response[0].place_name;

        return forecast(response[0].center[0], response[0].center[1], (error, response) => {
            if (error) {
                return res.send({ error: error })
            }

            return res.send({ weather: response, location: locationName })
        })
    })
});

app.listen(port, () => {
    console.log('App is up and running at port ' + port);
});