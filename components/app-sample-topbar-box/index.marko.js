// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-topbar-box/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"topBar-Box drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Event Stream</a><a href=\"#\">Event Record</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div> events</div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/cortex.iot$0.0.40/components/app-topbar-box/index.marko"
  };
