// core module
const path = require('path');

// npm modules
const express = require('express');
const hbs = require('hbs');

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

app.listen(port, () => {
    console.log('App is up and running at port ' + port);
});