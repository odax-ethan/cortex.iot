// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-weather-template/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    app_dashboard_weather_mini_chart_template = require("../app-dashboard-weather-mini-chart"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    app_dashboard_weather_mini_chart_tag = marko_loadTag(app_dashboard_weather_mini_chart_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"wrapperWeather\"><div id=\"noaWeatherImg\"><img id=\"todayIcon\" style=\"height: 7rem;\"></div><div id=\"weatherTemp\"><strong><span style=\"font-size:3rem;\" id=\"today\"></span>*f</strong> <span style=\" border-right: thick solid #ff0000;  margin-left:1rem; margin-right:1rem\"></span> <small><span id=\"tonight\" style=\"font-size:1rem;\"></span>*f</small></div><div class=\"spacer1\">");

  app_dashboard_weather_mini_chart_tag({}, out, __component, "10");

  out.w("</div><div id=\"weatherLongDescription\"><div id=\"todayDetailedForecast\"></div><div><span id=\"cityName\">City Name</span>, <span id=\"stateName\"> State </span></div></div></div><script>\r\n\r\n  window.onload = function(){\r\n\r\n\r\n      var lat = document.getElementById('lat').innerHTML\r\n      var long = document.getElementById('long').innerHTML\r\n      console.log(long)\r\n      var coordinates = lat +\",\"+ long\r\n      var url = 'https://api.weather.gov/points/' + coordinates ;\r\n      var biDailyReportArray\r\n\r\n\r\n      fetch(url)\r\n        .then(res => res.json())\r\n        .then((data) => {\r\n          //console.log('Checkout this JSON! ', data);\r\n\r\n          // Searched Cords - specific details\r\n          //console.log(data.properties.relativeLocation.properties)\r\n          let cityName = data.properties.relativeLocation.properties.city\r\n          let stateName = data.properties.relativeLocation.properties.state\r\n          document.getElementById(\"cityName\").innerHTML = cityName;\r\n          document.getElementById(\"stateName\").innerHTML = stateName;\r\n          //nws forecast\r\n          //console.log(data.properties.forecast)\r\n          let weatherURL = data.properties.forecast\r\n          fetch(weatherURL)\r\n            .then(res => res.json())\r\n            .then((data) => {\r\n                        console.log('Checkout this JSON! ', data);\r\n              let today = data.properties.periods[0].temperature\r\n              let todayDetailedForecast = data.properties.periods[0].detailedForecast\r\n              let todayIcon = data.properties.periods[0].icon\r\n              let todayName = data.properties.periods[0].name\r\n\r\n              let tonight = data.properties.periods[1].temperature\r\n      \t\t\t\tlet tonightName = data.properties.periods[1].name\r\n\r\n\r\n\r\n\r\n              document.getElementById(\"today\").innerHTML = today;\r\n              //document.getElementById(\"todayName\").innerHTML = todayName;\r\n              document.getElementById(\"todayDetailedForecast\").innerHTML = todayDetailedForecast;\r\n              var imgReplace = document.getElementById(\"todayIcon\");\r\n              imgReplace.src = todayIcon;\r\n\r\n              document.getElementById(\"tonight\").innerHTML = tonight;\r\n            //    document.getElementById(\"tonightName\").innerHTML = tonightName;\r\n\r\n\r\n            }).catch(err => {\r\n              throw err\r\n            });\r\n\r\n\r\n        }).catch(err => {\r\n          throw err\r\n        });\r\n\r\n};\r\n\r\n\r\n\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: ".noaWeatherImghistoryChart{\r\n        grid-area: noaWeatherImg;\r\n      }\r\n\r\n      .weatherTemp{\r\n        grid-area: weatherNowTemp;\r\n\r\n        /* display: grid;\r\n        grid-gap: 10px;\r\n        grid-template-columns: 1fr 1fr; */\r\n        /* grid-template-rows: 52px; */\r\n      /*   grid-template-areas: */\r\n      }\r\n\r\n        .weatherLaterTemp{\r\n        grid-area: weatherLaterTemp;\r\n      }\r\n\r\n         .weatherLongDescription{\r\n        grid-area: weatherLongDescription;\r\n      }\r\n\r\n      .spacer1{\r\n        grid-area: spacer1;\r\n      }\r\n\r\n    .wrapperWeather {\r\n        height:24vh;\r\n        max-width:34vw;\r\n        display: grid;\r\n        grid-gap: 10px;\r\n        grid-template-columns: 1fr 6fr;\r\n        grid-template-rows: 52px 2fr;\r\n        grid-template-areas:\r\n          \"noaWeatherImg weatherTemp\"\r\n          \"spacer1 weatherLongDescription\";\r\n\r\n      }",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        }
    ],
    id: "/cortex.iot$0.0.40/components/app-dashboard-weather-template/index.marko",
    tags: [
      "../app-dashboard-weather-mini-chart"
    ]
  };
