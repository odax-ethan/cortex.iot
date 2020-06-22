// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-settings-board-device-template/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    app_settings_modal_device_adder_template = require("../app-settings-modal-device-adder"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    app_settings_modal_device_adder_tag = marko_loadTag(app_settings_modal_device_adder_template),
    app_settings_modal_board_template = require("../app-settings-modal-board"),
    app_settings_modal_board_tag = marko_loadTag(app_settings_modal_board_template),
    app_settings_modal_device_template = require("../app-settings-modal-device"),
    app_settings_modal_device_tag = marko_loadTag(app_settings_modal_device_template),
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
      "</div><div class=\"columns\"></div><div class=\"columns text-right\" style=\"padding-right:.5rem;\">");

    app_settings_modal_device_adder_tag({
        targetBoard: boards.id,
        hardwareBank: input.hardwareBank
      }, out, __component, "10" + $keyScope$0);

    out.w("<span style=\"padding-left:.4rem;\"></span>");

    app_settings_modal_board_tag({
        targetBoard: boards.id,
        hardwareBank: input.hardwareBank
      }, out, __component, "12" + $keyScope$0);

    out.w("<span style=\"padding-left:.4rem;\"></span></div></div></div>");

    var $for$1 = 0;

    marko_forOf(boards.devices, function(device) {
      var $keyScope$1 = "[" + ((($for$1++) + $keyScope$0) + "]");

      if (device.deviceTYPE === "relay") {
        out.w("<div class=\"columns text-center\"" +
          marko_styleAttr("margin-left:2rem; margin-top:.02rem; background-color: " + device.color) +
          "><div class=\"columns\"><div class=\"column-3\"><div class=\"columns text-left text-capitalize\" style=\"padding-left:.4rem;\"><span class=\"relaySignal background-secondary\"></span> " +
          marko_escapeXml(device.deviceID) +
          " <small> @ pin: " +
          marko_escapeXml(device.devicePIN) +
          "</small></div><div class=\"columns text-left\"></div><div class=\"columns text-right\" style=\"padding-right:.5rem;\"><a href=\"#\"><i class=\"fas fa-power-off\"></i></a><span style=\"padding-left:.4rem;\"></span>");

        app_settings_modal_device_tag({
            targetBoard: boards.id,
            targetDevice: device.deviceID,
            hardwareBank: input.hardwareBank
          }, out, __component, "25" + $keyScope$1);

        out.w("<span style=\"padding-left:.4rem;\"></span></div></div></div></div>");
      }

      if (device.deviceTYPE === "thermometer") {
        out.w("<div class=\"columns text-center background-white-4\"" +
          marko_styleAttr("margin-left:2rem; margin-top:.02rem; background-color: " + device.color) +
          "><div class=\"columns\"><div class=\"column-3\"><div class=\"columns text-left text-capitalize\" style=\"padding-left:.4rem;\"><span> " +
          marko_escapeXml(device.deviceID) +
          "</span> <small> @ pin: " +
          marko_escapeXml(device.devicePIN) +
          "</small></div><div class=\"columns text-left\"></div><div class=\"columns text-right\" style=\"padding-right:.5rem;\"><a href=\"#\"><i class=\"fas fa-temperature-high\"></i></a><span style=\"padding-left:.4rem;\"></span>");

        app_settings_modal_device_tag({
            targetBoard: boards.id,
            targetDevice: device.deviceID,
            hardwareBank: input.hardwareBank
          }, out, __component, "38" + $keyScope$1);

        out.w("<span style=\"padding-left:.4rem;\"></span></div></div></div></div>");
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
    id: "/cortex.iot$0.0.40/components/app-settings-board-device-template/index.marko",
    tags: [
      "../app-settings-modal-device-adder",
      "../app-settings-modal-board",
      "../app-settings-modal-device"
    ]
  };
