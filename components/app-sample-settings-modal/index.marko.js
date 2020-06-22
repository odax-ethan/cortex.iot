// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-settings-modal/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_styleAttr = require("marko/src/runtime/html/helpers/style-attr");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<button id=\"myBtn\"><i class=\"fas fa-cogs\"></i></button><div id=\"myModal\" class=\"modal\"><div class=\"modal-content\"><span class=\"close\">&times;</span>");

  var $for$0 = 0;

  marko_forOf(input.hardwareBank, function(boards) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<p>" +
      marko_escapeXml(boards.id) +
      "</p>");

    var $for$1 = 0;

    marko_forOf(boards.devices, function(device) {
      var $keyScope$1 = "[" + ((($for$1++) + $keyScope$0) + "]");

      if (device.deviceTYPE === "relay") {
        out.w("<div" +
          marko_styleAttr(" background-color: " + device.color) +
          ">" +
          marko_escapeXml(device.deviceID) +
          ", " +
          marko_escapeXml(device.devicePIN) +
          "</div>");
      }

      if (device.deviceTYPE === "thermometer") {
        out.w("<div" +
          marko_styleAttr(" background-color: " + device.color) +
          ">" +
          marko_escapeXml(device.deviceID) +
          ", " +
          marko_escapeXml(device.devicePIN) +
          "</div>");
      }
    });
  });

  out.w("</div></div><script>\r\n\r\n      // Get the modal\r\n      var modal = document.getElementById(\"myModal\");\r\n\r\n      // Get the button that opens the modal\r\n      var btn = document.getElementById(\"myBtn\");\r\n\r\n      // Get the <span> element that closes the modal\r\n      var span = document.getElementsByClassName(\"close\")[0];\r\n\r\n      // When the user clicks on the button, open the modal\r\n      btn.onclick = function() {\r\n        modal.style.display = \"block\";\r\n      }\r\n\r\n      // When the user clicks on <span> (x), close the modal\r\n      span.onclick = function() {\r\n        modal.style.display = \"none\";\r\n      }\r\n\r\n      // When the user clicks anywhere outside of the modal, close it\r\n      window.onclick = function(event) {\r\n        if (event.target == modal) {\r\n          modal.style.display = \"none\";\r\n        }\r\n      }\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-settings-modal/index.marko"
  };
