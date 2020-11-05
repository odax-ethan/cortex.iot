// this is used to collect local weather data from your corrdinates. 
const fetch = require('node-fetch');

var token:lvTxkSMEBjopgchAlnCNduIgypJeziHs

// https://www.ncdc.noaa.gov/cdo-web/api/v2

fetch('https://www.ncdc.noaa.gov/cdo-web/api/v2')
  .then(response => response.json())
  .then(data => console.log(data));