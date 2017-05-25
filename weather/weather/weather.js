const request = require('request');

var getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/e0785785a0fb59a4f3dda4d9d0967aaf/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                reject('Unable to fetch weather');
            } else {
                resolve({
                    temperature: Math.round(body.currently.temperature),
                    apparentTemperature: Math.round(body.currently.apparentTemperature)
                });
            }
        });
    });
}

module.exports = {
    getWeather
}
