// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-promo/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"promoContainer\"><div class=\"guideSection\"><p>Let's Make You Better At Cortex.iot</p><div class=\"linkList\"><div></div><div><a href=\"https://www.notion.so/Cortex-iot-Documentation-2da6afe6f8c24202820144d89615b7bc?p=950d2b2357b44dbe8e2ae645f45dfe07\">Guide</a><a href=\"https://www.notion.so/Cortex-iot-Documentation-2da6afe6f8c24202820144d89615b7bc\">Documentation</a></div></div></div><div class=\"webStoreSection\"><p>Need Hardware, Plugins Or Kits?</p><div class=\"linkList\"><div></div><div><a href=\"https://ethans-fantabulous-project-9b6e05.webflow.io/products\">Webstore</a></div></div></div><div><p id=\"hideMe\">Make This Go Away</p></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-dashboard-promo/index.marko"
  };
