// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-current-board-device-template/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_styleAttr = require("marko/src/runtime/html/helpers/style-attr");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"deviceContainer-parent\"><div class=\"deviceContainer-child\">");

  var $for$0 = 0;

  marko_forOf(input.hardwareBank, function(boards) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<div class=\"columns\" style=\"margin:.2rem;\"><div class=\"column-1 raised\"" +
      marko_styleAttr(("background-color: " + boards.color) + "; margin-bottom: 1rem;") +
      "><div class=\"columns\"><div class=\"column-3\"><div class=\"columns  text-capitalize\" style=\"padding-left:.4rem; \"><i class=\"fas fa-microchip\" style=\"padding-right:.5rem;\"></i>" +
      marko_escapeXml(boards.id) +
      "</div><div class=\"columns\"></div><div class=\"columns text-right\" style=\"padding-right:.5rem;\"><a href=\"#\" style=\"padding-right:.5rem;\"><i class=\"fas fa-plus-circle\"></i></a><a href=\"#\" style=\"padding-right:.5rem;\"><i class=\"fas fa-cogs\"></i></a><a href=\"#\" style=\"padding-right:.5rem;\"><i class=\"fas fa-ban\"></i></a></div></div></div>");

    var $for$1 = 0;

    marko_forOf(boards.devices, function(device) {
      var $keyScope$1 = "[" + ((($for$1++) + $keyScope$0) + "]");

      if (device.deviceTYPE === "relay") {
        out.w("<div class=\"columns text-center\"" +
          marko_styleAttr("margin-left:2rem; margin-top:.02rem; background-color: " + device.color) +
          "><div class=\"columns\"><div class=\"column-3\"><div class=\"columns text-left text-capitalize\" style=\"padding-left:.4rem;\"><span class=\"relaySignal background-secondary\"></span> " +
          marko_escapeXml(device.deviceID) +
          " <small> @ pin 8</small></div><div class=\"columns text-left\"></div><div class=\"columns text-right\" style=\"padding-right:.5rem;\"><a href=\"#\" style=\"padding-right:.5rem;\"><i class=\"fas fa-power-off\"></i></a><a href=\"#\" style=\"padding-right:.5rem;\"><i class=\"fas fa-database\"></i></a><a href=\"#\" style=\"padding-right:.5rem;\"><i class=\"fas fa-cogs\"></i></a><a href=\"#\" style=\"padding-right:.5rem;\"><i class=\"fas fa-ban\"></i></a></div></div></div></div>");
      }

      if (device.deviceTYPE === "thermometer") {
        out.w("<div class=\"columns text-center background-white-4\"" +
          marko_styleAttr("margin-left:2rem; margin-top:.02rem; background-color: " + device.color) +
          "><div class=\"columns\"><div class=\"column-3\"><div class=\"columns text-left text-capitalize\" style=\"padding-left:.4rem;\"><span>12.39*</span> device name <small> @ pin 8</small></div><div class=\"columns text-left\"></div><div class=\"columns text-right\" style=\"padding-right:.5rem;\"><a href=\"#\"><i class=\"fas fa-temperature-high\"></i></a><a href=\"#\"><i class=\"fas fa-database\"></i></a><a href=\"#\"><i class=\"fas fa-cogs\"></i></a><a href=\"#\"><i class=\"fas fa-ban\"></i></a></div></div></div></div>");
      }
    });

    out.w("</div></div>");
  });

  out.w("</div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-dashboard-current-board-device-template/index.marko"
  };
