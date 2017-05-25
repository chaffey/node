const request = require('request');
const axios = request('axios');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google map api');
            } else if (body.status === 'ZERO_RESULTS' || body.status === 'INVALID_REQUEST') {
                reject(`Unable to find address '${address}'`);
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            } else {
                reject('Not sure what happend');
            }
        });
    });
}

module.exports = {
    geocodeAddress
}
