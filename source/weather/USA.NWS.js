// this is used to collect local weather data from your corrdinates. 

// get grid point from here:
//https://api.weather.gov/points/{lat},{lon}
const fetch = require('node-fetch');

fetch('https://api.weather.gov/points/42.4209,-71.1082')
  .then(response => response.json())
  .then(data => console.log(data));