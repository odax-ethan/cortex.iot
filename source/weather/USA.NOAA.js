// this is used to collect local weather data from your corrdinates. 


// var token:lvTxkSMEBjopgchAlnCNduIgypJeziHs

// https://www.ncdc.noaa.gov/cdo-web/api/v2


//Name	= MEDFORD 0.6 W, MA US
// Network:ID =	GHCND:US1MAMD0152
// Latitude/Longitude  =	42.422038°, -71.120537°

fetch('https://www.ncdc.noaa.gov/cdo-web/api/v2')
  .then(response => response.json())
  .then(data => {
      console.log(data.properties);
  });
