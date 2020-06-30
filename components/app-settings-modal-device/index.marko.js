// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-settings-modal-device/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<a" +
    marko_attr("id", ((("targetBoard_" + input.targetBoard) + "_device_") + input.targetDevice) + "_btn") +
    marko_attr("onclick", ((("openDevice(\"" + input.targetBoard) + "\",\"") + input.targetDevice) + "\")") +
    "><i class=\"fas fa-cogs\"></i></a><div" +
    marko_attr("id", ((input.targetBoard + "_") + input.targetDevice) + "_Modal") +
    " class=\"modal\"><div class=\"modal-content\"><span" +
    marko_attr("id", ((("targetBoard_" + input.targetBoard) + "_device_") + input.targetDevice) + "_Modal_closer") +
    " class=\"close\">&times;</span><div id=\"device_container\">");

  var $for$0 = 0;

  marko_forOf(input.hardwareBank, function(boards) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    if (boards.id === input.targetBoard) {
      out.w("<p> device @ " +
        marko_escapeXml(boards.id) +
        " </p>");

      var $for$1 = 0;

      marko_forOf(boards.devices, function(device) {
        var $keyScope$1 = "[" + ((($for$1++) + $keyScope$0) + "]");

        if (device.deviceID === input.targetDevice) {
          if (device.deviceTYPE === "relay") {
            out.w("DeviceName: <input" +
              marko_attr("id", "deviceID_" + device.deviceID) +
              marko_attr("value", device.deviceID) +
              "> <br> Device Type: <input" +
              marko_attr("id", "deviceTYPE_" + device.deviceID) +
              marko_attr("value", device.deviceTYPE) +
              "> <br> Color <input" +
              marko_attr("id", "deviceColor_" + device.deviceID) +
              marko_attr("value", device.color) +
              " class=\"device-adder-color-picker\" data-huebee=\"{ &#34;notation&#34;: &#34;rgb&#34;, &#34;saturations&#34;: 2 }\"> <br> Device Pin: <input" +
              marko_attr("id", "devicePIN_" + device.deviceID) +
              marko_attr("value", device.devicePIN) +
              "> <br> Relay Type: <input" +
              marko_attr("id", "relayType_" + device.deviceID) +
              marko_attr("value", device.relayType) +
              "> <br><hr>");

            var $for$2 = 0;

            marko_forOf(device.cron, function(cron, index) {
              out.w("CRON id: " +
                marko_escapeXml(cron.cronID) +
                " ");

              var $keyScope$2 = "[" + ((($for$2++) + $keyScope$1) + "]");

              out.w("<br> CRON string: " +
                marko_escapeXml(cron.cronOBJ) +
                " <br> CRON Type: " +
                marko_escapeXml(cron.cronTYPE) +
                " <br> CRON Burst Length: " +
                marko_escapeXml(cron.cronEventLength) +
                " <br><hr>");
            });

            out.w("<hr>");
          }

          if (device.deviceTYPE === "thermometer") {
            out.w("DeviceName: <input" +
              marko_attr("id", "deviceID_" + device.deviceID) +
              marko_attr("value", device.deviceID) +
              "> <br> Device Type: <input" +
              marko_attr("id", "deviceTYPE_" + device.deviceID) +
              marko_attr("value", device.deviceTYPE) +
              "> <br> Color <input" +
              marko_attr("id", "deviceColor_" + device.deviceID) +
              marko_attr("value", device.color) +
              " class=\"device-adder-color-picker\" data-huebee=\"{ &#34;notation&#34;: &#34;rgb&#34;, &#34;saturations&#34;: 2 }\"> <br> Device Frequancy: <input" +
              marko_attr("id", "freq_" + device.deviceID) +
              marko_attr("value", " " + device.freq) +
              "> <br> Device Pin: <input" +
              marko_attr("id", "devicePIN_" + device.deviceID) +
              marko_attr("value", device.devicePIN) +
              "> <br> Sensor Controller: <input" +
              marko_attr("id", "controller_" + device.deviceID) +
              marko_attr("value", device.controller) +
              "> <br>");
          }
        }
      });
    }
  });

  out.w("</div><button type=\"button\"" +
    marko_attr("onclick", ("updateDevice(\"" + input.targetBoard) + "\")") +
    "> Update Device</button><button type=\"button\"> Cancel</button></div></div><script>\r\n\r\n       openDevice = (targetBoard, targetDevice) => {\r\n\r\n              // Get the modal\r\n              var modal = document.getElementById(targetBoard+\"_\"+ targetDevice +`_Modal`);\r\n\r\n              // Get the button that opens the modal\r\n              var btn = document.getElementById(\"targetBoard_\"+targetBoard+\"_device_\"+ targetDevice + \"_btn\");\r\n\r\n              // Get the <span> element that closes the modal\r\n              var span = document.getElementById(\"targetBoard_\" + targetBoard + \"_device_\" + targetDevice + '_Modal_closer');\r\n\r\n              // When the user clicks on the button, open the modal\r\n              //btn.onclick = function() {\r\n              //  modal.style.display = \"block\";\r\n              //}\r\n              modal.style.display = \"block\";\r\n\r\n              // When the user clicks on <span> (x), close the modal\r\n              span.onclick = function() {\r\n                modal.style.display = \"none\";\r\n              }\r\n\r\n              // When the user clicks anywhere outside of the modal, close it\r\n              window.onclick = function(event) {\r\n                if (event.target == modal) {\r\n                  modal.style.display = \"none\";\r\n                }\r\n              }\r\n      }\r\n\r\n      updateDevice = (targetBoard) => {\r\n          var input = document.querySelectorAll('div#device_container input'); // get the input element\r\n\r\n          var deviceID = input[0].value\r\n          var deviceType = input[1].value\r\n          var deviceColor = input[2].value\r\n          var deviceFreq = input[3].value\r\n          var devicePin = input[4].value\r\n          var deviceController = input[5].value\r\n\r\n\r\n            var deviceUpdateBundle = {\r\n              deviceID: deviceID,\r\n              deviceTYPE: deviceType,\r\n              devicePIN: devicePin,\r\n              deviceBOARDS: targetBoard,\r\n              color: deviceColor_Adder,\r\n              controller: deviceController\r\n              freq: deviceFreq\r\n            }\r\n\r\n          //console.log(deviceUpdate);\r\n          socket.emit('update-device', deviceUpdateBundle);\r\n\r\n      }\r\n\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-settings-modal-device/index.marko"
  };
