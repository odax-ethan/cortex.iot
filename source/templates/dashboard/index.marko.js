// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/source/templates/dashboard/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    lasso_page_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/config-tag")),
    lasso_head_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/head-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    lasso_body_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/body-tag")),
    browser_refresh_tag = marko_loadTag(require("browser-refresh-taglib/refresh-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  lasso_page_tag({
      dirname: __dirname,
      filename: __filename
    }, out);

  out.w("<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Cortex.iot dashboard view</title><meta name=\"Description\" content=\"hub for the cortex.iot system\"><script src=\"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js\" charset=\"utf-8\"></script><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Weather PWA\"><meta name=\"theme-color\" content=\"#2F3BA2\">");

  lasso_head_tag({}, out, __component, "10");

  lasso_head_tag({}, out, __component, "11");

  out.w("</head><body>");

  component_globals_tag({}, out);

  out.w("<script>\r\n  window.socket = io();\r\n  socket.on('eventStream-newEvent-socketStream', (data)=>{\r\n    console.log(data);\r\n  })\r\n</script><p> hi </p><style>\r\n  body {\r\n    overflow: hidden; /* Hide scrollbars */\r\n  }\r\n</style>");

  lasso_body_tag({}, out, __component, "15");

  browser_refresh_tag({}, out, __component, "16");

  lasso_body_tag({}, out, __component, "17");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "18");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/cortex.iot$0.0.40/source/templates/dashboard/index.marko",
    tags: [
      "@lasso/marko-taglib/taglib/config-tag",
      "@lasso/marko-taglib/taglib/head-tag",
      "marko/src/core-tags/components/component-globals-tag",
      "@lasso/marko-taglib/taglib/body-tag",
      "browser-refresh-taglib/refresh-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
