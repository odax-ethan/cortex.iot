// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-template/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    app_dashboard_visualize_connected_sensor_template = require("../app-dashboard-visualize-connected-sensor"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    app_dashboard_visualize_connected_sensor_tag = marko_loadTag(app_dashboard_visualize_connected_sensor_template),
    app_dashboard_current_board_device_template_template = require("../app-dashboard-current-board-device-template"),
    app_dashboard_current_board_device_template_tag = marko_loadTag(app_dashboard_current_board_device_template_template),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    app_dashboard_weather_template_template = require("../app-dashboard-weather-template"),
    app_dashboard_weather_template_tag = marko_loadTag(app_dashboard_weather_template_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"cortexWrapper\"><div class=\"visualizerWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Visualize Connect Sensors</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div>");

  app_dashboard_visualize_connected_sensor_tag({}, out, __component, "7");

  out.w("</div><div class=\"nodeBankWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Connect Devices</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div>");

  app_dashboard_current_board_device_template_tag({
      hardwareBank: input.hardwareBank
    }, out, __component, "14");

  out.w("</div><div class=\"eventWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Event Stream</a><a href=\"#\">Event Record</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div><p>" +
    marko_escapeXml(input.hardwareBank) +
    "</p></div><div class=\"weatherWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Weather Report</a><a href=\"#\">Weather Forcast</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div>");

  app_dashboard_weather_template_tag({
      coordinates: input.coordinate
    }, out, __component, "30");

  out.w("</div><div class=\"promoWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Our Promo Space</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div> promospace</div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-dashboard-template/index.marko",
    tags: [
      "../app-dashboard-visualize-connected-sensor",
      "../app-dashboard-current-board-device-template",
      "../app-dashboard-weather-template"
    ]
  };
