const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoid2ViZGV2d2l0aG9tYXIiLCJhIjoiY2p4a3JlZWZ1MTVycTN0cXBpdmRxbTl1eiJ9.jyfkWpdxdMAHJ41sy-SgbA&limit=1`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('There was an error connecting to the server.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Couldn\'t find the place you are looking for.', undefined);
        } else {
            callback(undefined, response.body.features);
        }
    });
}

module.exports = geocode;