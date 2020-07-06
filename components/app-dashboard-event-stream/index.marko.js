// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-event-stream/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div style=\"margin:.1rem;\"><ul id=\"eventStreamList\"></ul></div><script>\r\n\r\n socket.on('eventStream-newEvent', (data)=>{\r\n    //console.log(data);\r\n\r\n\r\n    // var node = document.createElement(\"LI\");                 // Create a <li> node\r\n    // var textnode = document.createTextNode(data);         // Create a text node\r\n    // node.appendChild(textnode);                              // Append the text to <li>\r\n    // document.getElementById(\"eventStreamList\").prepend(node);     // Append <li> to <ul> with id=\"myList\"\r\n\r\n\r\n\r\n\r\n    // var thermometerText = `<li>[19:32:03][<span class='thermometer'> thermometer </span>][Tent-1-Thermometer][<span class='reading'> reading </span>]: Success </li>`\r\n    //var relayText = `<li>[${data.data.eventTriggerDate}][<span class='relay'> relay </span>][${data.deviceID.deviceID}][<span class='cron'> cron </span>]: [${data.data.data}]</li>`;\r\n\r\n    var placeholderText = `<li>[${data.data.eventTriggerDate}][${data.data.deviceID}]: [${data.data.data}]</li>`;\r\n\r\n\r\n\r\n    var newItem = document.createElement(\"LI\");\r\n    // var newDiv = document.createElement(\"DIV\");\r\n    newItem.innerHTML = placeholderText\r\n    // var textnode = document.createTextNode(newDiv);\r\n    // newItem.appendChild(textnode);\r\n\r\n    var list = document.getElementById(\"eventStreamList\");\r\n    list.insertBefore(newItem, list.childNodes[0]);\r\n\r\n  })\r\n\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-dashboard-event-stream/index.marko"
  };
