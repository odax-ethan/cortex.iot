// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-weather-mini-chart/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<canvas id=\"chart\" width=\"100%\" max-height=\"100px\"></canvas><div style=\"visibility: hidden;display:none\"><div id=\"lat\">42.3601</div><div id=\"long\">-71.0589</div></div><script>\r\n\r\n  window.onload = function(){\r\n    var lat = document.getElementById('lat').innerHTML\r\n    var long = document.getElementById('long').innerHTML\r\n    console.log(long)\r\n    var coordinates = lat +\",\"+ long\r\n    var url = 'https://api.weather.gov/points/' + coordinates ;\r\nfetch(url)\r\n  .then(res => res.json())\r\n  .then((data) => {\r\n    //console.log('Checkout this JSON! ', data);\r\n\r\n    // Searched Cords - specific details\r\n    //console.log(data.properties.relativeLocation.properties)\r\n    let cityName = data.properties.relativeLocation.properties.city\r\n    let stateName = data.properties.relativeLocation.properties.state\r\n    //nws forecast\r\n    //console.log(data.properties.forecast)\r\n    let weatherURL = data.properties.forecast\r\n\r\n\r\n    fetch(weatherURL)\r\n      .then(res => res.json())\r\n      .then((data) => {\r\n       console.log('Checkout this JSON! ', data);\r\n\r\n        var weatherDataPeriodTotalArray = []\r\n\t\t\t\tlet labelArray = []\r\n        let weatherPeriodData = data.properties.periods\r\n        let weatherPeriodLength = weatherPeriodData.length\r\n        for (var i = 0; i < weatherPeriodLength; i++) {\r\n          \t let periodTemp = weatherPeriodData[i].temperature\r\n             let periodName = weatherPeriodData[i].name\r\n             weatherDataPeriodTotalArray.push(periodTemp);\r\n             labelArray.push(periodName)\r\n        }\r\n        console.log(weatherDataPeriodTotalArray)\r\n    }).catch(err => {\r\n      throw err\r\n    });\r\n});\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/cortex.iot$0.0.40/components/app-dashboard-weather-mini-chart/index.marko"
  };
