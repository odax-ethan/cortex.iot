// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/source/templates/events_analytics/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    lasso_page_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/config-tag")),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    lasso_head_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/head-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    lasso_body_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/body-tag")),
    app_navbar_standard_template = require("../../../components/app-navbar-standard"),
    app_navbar_standard_tag = marko_loadTag(app_navbar_standard_template),
    browser_refresh_tag = marko_loadTag(require("browser-refresh-taglib/refresh-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  lasso_page_tag({
      dirname: __dirname,
      filename: __filename
    }, out);

  out.w("<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>" +
    marko_escapeXml(input.targetInfo.deviceUID) +
    " analytics View</title><meta name=\"Description\" content=\"hub for the cortex.iot system\"><script src=\"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js\" charset=\"utf-8\"></script><script charset=\"utf-8\" src=\"../../../lib/cortex/math.js\"></script><script src=\"https://cdn.plot.ly/plotly-latest.min.js\"></script><script src=\"https://unpkg.com/mathjs@7.0.2/dist/math.min.js\"></script><link rel=\"stylesheet\" href=\"../../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css\"><link rel=\"stylesheet\" href=\"../../../styles/master.css\"><link rel=\"stylesheet\" href=\"../../../styles/topbar.css\"><meta name=\"targetDevice\"" +
    marko_attr("content", input.targetInfo.deviceUID) +
    "><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Cortex.iot\"><meta name=\"theme-color\" content=\"#5968e8\">");

  lasso_head_tag({}, out, __component, "14");

  lasso_head_tag({}, out, __component, "15");

  out.w("</head><body>");

  component_globals_tag({}, out);

  lasso_body_tag({}, out, __component, "17");

  out.w("<script>\n              window.socket = io();\n          </script>");

  app_navbar_standard_tag({}, out, __component, "18");

  out.w(" A list of all events <ul id=\"output\"></ul><script>\n\n            socket.emit('eventHistory', 'ALL');\n\n            socket.on('eventHistory-response', (data) => {\n              // number of history values to display\n              var lengthValue = 1000;\n\n              // simple place\n              // let pre = document.getElementById('output');\n              // let jstring = JSON.stringify(data, null, 4);\n              // pre.textContent = jstring;\n\n\n              // get data from dataBundle\n              let dataBundle = data.doc.data;\n              let prebundle = dataBundle.slice(1).slice(-lengthValue)\n              console.log(dataBundle);\n\n              for (var i = lengthValue - 1; i >= 0; i--) {\n                var node = document.createElement(\"LI\"); // Create a <li> node\n                let jstring = JSON.stringify(prebundle[i], null, 4);\n                console.log(jstring);\n                var textnode = document.createTextNode(jstring);         // Create a text node\n                node.appendChild(textnode);                              // Append the text to <li>\n                document.getElementById(\"output\").appendChild(node);\n              }\n\n\n\n\n\n              //console.log(data)\n\n\n            });\n\n          </script><style>\n            body {\n              overflow: hidden; /* Hide scrollbars */\n              }\n\n            .pre{\n                border:1px solid grey;\n                min-height:10em;\n              }\n        </style>");

  browser_refresh_tag({}, out, __component, "21");

  lasso_body_tag({}, out, __component, "22");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "23");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "package: ./browser.json"
    ],
    id: "/cortex.iot$0.0.40/source/templates/events_analytics/index.marko",
    tags: [
      "@lasso/marko-taglib/taglib/config-tag",
      "@lasso/marko-taglib/taglib/head-tag",
      "marko/src/core-tags/components/component-globals-tag",
      "@lasso/marko-taglib/taglib/body-tag",
      "../../../components/app-navbar-standard",
      "browser-refresh-taglib/refresh-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
