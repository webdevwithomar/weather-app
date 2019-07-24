const request = require('request');

const forecast = (longitude, latutude, callback) => {
    const url = `https://api.darksky.net/forecast/5a9f3ebfae037c192d18ddf4971d63dd/${latutude},${longitude}?units=si&exclude=hourly,flags`;

    request({ url, json: true }, (error, res) => {
        if (error) {
            callback(['Couldn\'t connect to the server.'], undefined);
        } else if (res.body.error) {
            callback([res.body.error], undefined);
        } else {
            callback(undefined, res.body);
        }
    });
}

module.exports = forecast;