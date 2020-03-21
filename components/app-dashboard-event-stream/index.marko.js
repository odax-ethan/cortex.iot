// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-event-stream/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div style=\"margin:.1rem;\"><ul id=\"eventStreamList\"></ul></div><script>\n\n socket.on('eventStream-newEvent', (data)=>{\n    console.log(data);\n\n\n    // var node = document.createElement(\"LI\");                 // Create a <li> node\n    // var textnode = document.createTextNode(data);         // Create a text node\n    // node.appendChild(textnode);                              // Append the text to <li>\n    // document.getElementById(\"eventStreamList\").prepend(node);     // Append <li> to <ul> with id=\"myList\"\n\n\n\n\n    // var thermometerText = `<li>[19:32:03][<span class='thermometer'> thermometer </span>][Tent-1-Thermometer][<span class='reading'> reading </span>]: Success </li>`\n    //var relayText = `<li>[${data.data.eventTriggerDate}][<span class='relay'> relay </span>][${data.deviceID.deviceID}][<span class='cron'> cron </span>]: [${data.data.data}]</li>`;\n\n    var placeholderText = `<li>[${data.data.eventTriggerDate}][${data.deviceID.deviceID}]: [${data.data.data}]</li>`;\n\n\n\n    var newItem = document.createElement(\"LI\");\n    // var newDiv = document.createElement(\"DIV\");\n    newItem.innerHTML = placeholderText\n    // var textnode = document.createTextNode(newDiv);\n    // newItem.appendChild(textnode);\n\n    var list = document.getElementById(\"eventStreamList\");\n    list.insertBefore(newItem, list.childNodes[0]);\n\n  })\n\n\n</script>");
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
