// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-visualize-connected-sensor-plotly/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"graph-container\"><div id=\"graph\"></div></div><script>\r\n\r\n\r\n // socket.emit('device-history-request', {target: 'Light', recordCount: 10});\r\n //\r\n // socket.on('device-history-response', (data)=>{\r\n //   console.log(data);\r\n //    var dataArray = data.dataBundle\r\n //    dataArray.forEach((data) => {\r\n //      console.log(data)\r\n //      sensor1.y.push(data.data)\r\n //      sensor1.x.push(data.eventTriggerDate)\r\n //    });\r\n //\r\n //    console.log(sensor1);\r\n //   //0: {data: \"ON\", eventTriggerDate: \"3/13/2020, 12:33:32 AM\", status: \"normal\", detail: \"event trigger by cron morning_fans\"}\r\n //\r\n //  })\r\n\r\n\r\n socket.emit('device-history-request', {target: 'CURRENT', recordCount: 10});\r\n\r\n // when you get response\r\n socket.on('device-history-response', (data)=>{\r\n    // console.log(data);\r\n\r\n    chartData = []\r\n\r\n    //for each item in the data array response\r\n    data.forEach((device, i) => {\r\n      //current target device id\r\n      console.log(device.id);\r\n\r\n      chartSet = {\r\n        x: [],\r\n        y : [],\r\n        type: 'scatter'\r\n      }\r\n\r\n      let x = chartSet.x\r\n      let y = chartSet.y\r\n\r\n      // console.log(device.doc.data);\r\n      dataSet = device.doc.data\r\n\r\n      // for each data bundle in the bundle\r\n      dataSet.forEach((dataBundle, i) => {\r\n        y.push(dataBundle.data)\r\n        x.push(dataBundle.eventTriggerDate)\r\n      });\r\n\r\n      return chartData.push(chartSet);\r\n    });\r\n\r\n\r\n\r\n    var config = {responsive: true};\r\n    var layout = {\r\n      margin: {t:5,r:5,b:130,l:33},\r\n      xaxis: {\r\n       tickangle: 90,\r\n     },\r\n      legend: {\r\n        x: 1,\r\n        y: 0.5\r\n      },\r\n      autosize: true,\r\n      paper_bgcolor :'rgba(0,0,0,0)',\r\n      plot_bgcolor : 'rgba(0,0,0,0)',\r\n    };\r\n\r\n    Plotly.newPlot('graph', chartData, layout, config);\r\n\r\n\r\n    // console.log(chartData);\r\n\r\n})\r\n\r\n\r\n\r\n    //\r\n    // var sensor1 = {\r\n    //   x:['2020/03/16  1:2:20', '2020/03/16  2:2:20', '2020/03/16  3:2:20', '2020/03/16  4:2:20', '2020/03/16  5:2:20', '2020/03/16  6:2:20', '2020/03/16  7:2:20', '2020/03/16 82:2:20', '2020/03/16  9:2:20'],\r\n    //   y:[4,1,3,4,1,3,4,1,3],\r\n    //   type: 'scatter'\r\n    // };\r\n    //\r\n    // var sensor2 = {\r\n    //   x:['2020/03/16  1:2:20', '2020/03/16  2:2:20', '2020/03/16  3:2:20', '2020/03/16  4:2:20', '2020/03/16  5:2:20', '2020/03/16  6:2:20', '2020/03/16  7:2:20', '2020/03/16 82:2:20', '2020/03/16  9:2:20'],\r\n    //   y:[2,3,4,2,3,5,2,4,5],\r\n    //   type: 'scatter'\r\n    // };\r\n\r\n\r\n\r\n\r\n    // var chartData = [sensor1, sensor2];\r\n\r\n    // var config = {responsive: true};\r\n    // var layout = {\r\n    //   margin: {t:5,r:5,b:130,l:33},\r\n    //   xaxis: {\r\n    //    tickangle: 90,\r\n    //  },\r\n    //   legend: {\r\n    //     x: 1,\r\n    //     y: 0.5\r\n    //   },\r\n    //   autosize: true,\r\n    //   paper_bgcolor :'rgba(0,0,0,0)',\r\n    //   plot_bgcolor : 'rgba(0,0,0,0)',\r\n    // };\r\n    //\r\n    // Plotly.newPlot('graph', chartData, layout, config);\r\n\r\n\r\n\r\n\r\n  setTimeout(function () {\r\n    var evt = document.createEvent('UIEvents');\r\n    evt.initUIEvent('resize', true, false,window,0);\r\n    window.dispatchEvent(evt);\r\n  }, 0);\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-dashboard-visualize-connected-sensor-plotly/index.marko"
  };
