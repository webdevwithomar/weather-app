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
    if (req.query.address) {
        geocode(req.query.address, (error, response) => {
            if (error) {
                return res.render('index', { error })
            } else {
                const places = [];
                const storeForecast = []

                for (let i = 0; i < response.length; i++) {
                    places.push(response[i]);

                    const lat = response[i].center[0];
                    const long = response[i].center[1];

                    forecast(long, lat, (error, data) => {
                        if (error) {
                            storeForecast.push({ error: error });
                        } else {
                            storeForecast.push(data);
                        }
                    })
                }

                console.log(storeForecast);
                return res.render('index', {
                    geolocation: places,
                    weather: storeForecast
                });
            }
        });
    }
});

app.listen(port, () => {
    console.log('App is up and running at port ' + port);
});