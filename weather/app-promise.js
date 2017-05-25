const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
    .options({
        address: {
            describe: 'Address for weather',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/e0785785a0fb59a4f3dda4d9d0967aaf/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var current = Math.round(response.data.currently.temperature);
    var apparent = Math.round(response.data.currently.apparentTemperature);
    console.log(`- Currently it's ${current}º, and feels like ${apparent}º`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log("Unable to connect to API services.");
    } else {
        console.log(e.message);
    }
});
