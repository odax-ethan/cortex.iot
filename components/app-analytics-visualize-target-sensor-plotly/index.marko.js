// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-analytics-visualize-target-sensor-plotly/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"graph-container\"><div id=\"graph\"></div></div><script>\r\n\r\n  //get target\r\n  var targetDevice = document.getElementsByName('targetDevice')[0].content;\r\n  console.log(targetDevice)\r\n      //request target data\r\n  socket.emit('device-history-request', {targetUID: targetDevice });\r\n\r\n  //recieve data and parse\r\n  // socket.on('device-history-response', (data)=>{\r\n  //   console.log(data)\r\n  //\r\n  //   chartSet = {\r\n  //     x: [],\r\n  //     y : [],\r\n  //     type: 'scatter',\r\n  //     name: device.id,\r\n  //     mode: 'lines',\r\n  //      line: {\r\n  //        color: device.doc.color,\r\n  //        width: 2.3,\r\n  //        shape: 'linear'\r\n  //      }\r\n  //   }\r\n  // })\r\n\r\n\r\n\r\n // id=\"allDataChartJS\"  hardwareBank = input.hardwareBank\r\n// var script_tag = document.getElementById('allDataChartJS')\r\n// var hardwareBank = script_tag.getAttribute(\"hardwareBank\");\r\n// console.log(hardwareBank)\r\n\r\n // socket.emit('device-history-request', {target: 'Light', recordCount: 10});\r\n //\r\n // socket.on('device-history-response', (data)=>{\r\n //   console.log(data);\r\n //    var dataArray = data.dataBundle\r\n //    dataArray.forEach((data) => {\r\n //      console.log(data)\r\n //      sensor1.y.push(data.data)\r\n //      sensor1.x.push(data.eventTriggerDate)\r\n //    });\r\n //\r\n //    console.log(sensor1);\r\n //   //0: {data: \"ON\", eventTriggerDate: \"3/13/2020, 12:33:32 AM\", status: \"normal\", detail: \"event trigger by cron morning_fans\"}\r\n //\r\n //  })\r\n\r\n\r\n //socket.emit('device-history-request', {targetUID: 'ALL'});\r\n\r\n // when you get response\r\n socket.on('device-history-response', (data)=>{\r\n    // console.log(data);\r\n\r\n    dataArray = [data] // create array for resuability\r\n\r\n    //create global variable of dataset so other systems can run math\r\n    window.targetUIDDBDoc = data;\r\n\r\n\r\n    chartData = []\r\n\r\n    //for each item in the data array response\r\n    dataArray.forEach((device, i) => {\r\n      //current target device id\r\n      //console.log(device);\r\n\r\n      chartSet = {\r\n        x: [],\r\n        y : [],\r\n        type: 'scatter',\r\n        name: device.id,\r\n        mode: 'lines',\r\n         line: {\r\n           color: device.doc.color,\r\n           width: 2.3,\r\n           shape: 'linear'\r\n         }\r\n      }\r\n\r\n\r\n      let x = chartSet.x\r\n      let y = chartSet.y\r\n\r\n      // console.log(device.doc.data);\r\n      dataSet = device.doc.data\r\n\r\n      // for each data bundle in the bundle\r\n      dataSet.forEach((dataBundle, i) => {\r\n        y.push(dataBundle.data)\r\n        x.push(dataBundle.eventTriggerDate)\r\n      });\r\n\r\n      //console.log(chartSet)\r\n      return chartData.push(chartSet);\r\n    });\r\n\r\n\r\n\r\n    //function get length of the dataset\r\n    testDataSetLength = () => {\r\n      testDataSet = chartData[0].x\r\n      return testDataSet.length\r\n    }\r\n\r\n   //console.log(testDataSetLength()); //report datasetlength\r\n\r\n\r\n    //get upper range of dates\r\n    getDateUpperRange = (lengthOfDataSet) => {\r\n      testDataSet = chartData[0].x\r\n      arrayOffSet = lengthOfDataSet-1\r\n      return testDataSet[arrayOffSet]\r\n    }\r\n\r\n\r\n    // get lowest range of dates\r\n    getDateLowerRange = () => {\r\n      testDataSet = chartData[0].x\r\n      return testDataSet[0]\r\n    }\r\n\r\n\r\n\r\n    var config = {responsive: true};\r\n    var layout = {\r\n      margin: {t:5,r:5,b:10,l:33},\r\n      xaxis: {\r\n       tickangle: 90,\r\n\r\n        rangeselector: {buttons: [\r\n          {\r\n            count: 12,\r\n            label: '12h',\r\n            step: 'hour',\r\n            stepmode: 'backward'\r\n          },\r\n            {\r\n              count: 1,\r\n              label: '24h',\r\n              step: 'day',\r\n              stepmode: 'backward'\r\n            },\r\n            {\r\n              count: 3,\r\n              label: '72h',\r\n              step: 'day',\r\n              stepmode: 'backward'\r\n            },\r\n            {\r\n              count: 1,\r\n              label: '1m',\r\n              step: 'month',\r\n              stepmode: 'backward'\r\n            },\r\n            {\r\n              count: 6,\r\n              label: '6m',\r\n              step: 'month',\r\n              stepmode: 'backward'\r\n            },\r\n            {step: 'all'}\r\n          ]},\r\n        rangeslider: {range: [getDateLowerRange(), getDateUpperRange(testDataSetLength())]},\r\n     },\r\n     yaxis: {\r\n      tickangle: 90,\r\n     },\r\n      legend: {\r\n        x: 1,\r\n        y: 0.5\r\n      },\r\n      autosize: true,\r\n      paper_bgcolor :'rgba(0,0,0,0)',\r\n      plot_bgcolor : 'rgba(0,0,0,0)',\r\n    };\r\n\r\n    Plotly.newPlot('graph', chartData, layout, config);\r\n\r\n\r\n    // console.log(chartData);\r\n\r\n})\r\n\r\n\r\n\r\n\r\n  setTimeout(function () {\r\n    var evt = document.createEvent('UIEvents');\r\n    evt.initUIEvent('resize', true, false,window,0);\r\n    window.dispatchEvent(evt);\r\n  }, 0);\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-analytics-visualize-target-sensor-plotly/index.marko"
  };