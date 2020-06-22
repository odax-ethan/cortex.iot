// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-navbar-standard/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"navBarWrapper\"><div class=\"front\"> <a href=\"/\"><img src=\"/assets/cortex.iot-brand-logo-mark.PNG\" alt=\"Cortex.iot\"></a></div><div class=\"middle\"></div><div class=\"back\"><a href=\"/settings\"> Settings</a><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSfcp_bDc_GkOH8iZG7ZAxeSo0FVBqu0nNn3hhVWssExK0cPNA/viewform\"> Feed Back</a><a href=\"https://www.notion.so/Cortex-iot-Documentation-2da6afe6f8c24202820144d89615b7bc\"> Docs </a></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-navbar-standard/index.marko"
  };
