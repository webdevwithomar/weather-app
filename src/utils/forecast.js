const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/5a9f3ebfae037c192d18ddf4971d63dd/${lat},${long}?units=si&exclude=hourly,flags`;

    request({ url, json: true }, (error, data) => {
        if (error) {
            callback('Couldn\'t connect to the server.', undefined);
        } else if (data.body.error) {
            callback(data.body.error, undefined);
        } else {
            callback(undefined, data.body);
        }
    });
}

module.exports = forecast;