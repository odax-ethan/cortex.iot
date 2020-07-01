// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-analytics-device-template/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    app_analytics_visualize_target_sensor_plotly_template = require("../app-analytics-visualize-target-sensor-plotly"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    app_analytics_visualize_target_sensor_plotly_tag = marko_loadTag(app_analytics_visualize_target_sensor_plotly_template),
    app_analytics_device_sensor_metrics_template = require("../app-analytics-device-sensor-metrics"),
    app_analytics_device_sensor_metrics_tag = marko_loadTag(app_analytics_device_sensor_metrics_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"cortexWrapper\"><div class=\"visualizerWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Visualize current Target</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div>");

  app_analytics_visualize_target_sensor_plotly_tag({}, out, __component, "7");

  out.w("</div><div class=\"deviceDetailsWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Device Details</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div><div class=\"targetDeviceDetailsContainer\">DeviceName: <br><br> Last reading: 10C @ 13:20:30 (2min's ago) <br><br> Device Type: <br> Color: <br> Device Pin: <br><br></div></div><div class=\"deviceStatsWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Device Details</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div><div class=\"\"></div><div class=\"targetDeviceStatsContainer\">");

  app_analytics_device_sensor_metrics_tag({}, out, __component, "31");

  out.w("</div></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-analytics-device-template/index.marko",
    tags: [
      "../app-analytics-visualize-target-sensor-plotly",
      "../app-analytics-device-sensor-metrics"
    ]
  };
