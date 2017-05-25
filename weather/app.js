const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address).then((result) => {
    console.log(result.address);
    return weather.getWeather(result.latitude, result.longitude);
}).then((result) => {
    console.log(
        `  - It's currently ${result.temperature}º, and feels like ${result.apparentTemperature}º.`);
}).catch((errorMessage) => {
    console.log(errorMessage);
});
