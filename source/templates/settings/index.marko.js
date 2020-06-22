// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/source/templates/settings/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    lasso_page_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/config-tag")),
    asset_var_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/asset-var/renderer")),
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    lasso_head_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/head-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    lasso_body_tag = marko_loadTag(require("@lasso/marko-taglib/taglib/body-tag")),
    app_navbar_standard_template = require("../../../components/app-navbar-standard"),
    app_navbar_standard_tag = marko_loadTag(app_navbar_standard_template),
    app_settings_template_template = require("../../../components/app-settings-template"),
    app_settings_template_tag = marko_loadTag(app_settings_template_template),
    browser_refresh_tag = marko_loadTag(require("browser-refresh-taglib/refresh-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  lasso_page_tag({
      dirname: __dirname,
      filename: __filename
    }, out);

  out.w("<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Cortex.iot dashboard view</title><meta name=\"Description\" content=\"hub for the cortex.iot system\"><script src=\"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js\" charset=\"utf-8\"></script><script src=\"https://cdn.plot.ly/plotly-latest.min.js\"></script>");

  asset_var_tag({
      values: [
          require.resolve("../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css")
        ],
      renderBody: function renderBody(out, __href) {
        out.w("<link rel=\"stylesheet\"" +
          marko_attr("href", __href.url) +
          ">");
      }
    }, out, __component, "25");

  out.w("<link rel=\"stylesheet\" href=\"./styles/master.css\"><link rel=\"stylesheet\" href=\"./styles/topbar.css\"><link rel=\"stylesheet\" href=\"./lib/huebee/huebee.min.css\"><script src=\"./lib/huebee/huebee.pkgd.min.js\"></script><meta name=\"apple-mobile-web-app-capable\" content=\"yes\"><meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\"><meta name=\"apple-mobile-web-app-title\" content=\"Cortex.iot\"><meta name=\"theme-color\" content=\"#5968e8\">");

  lasso_head_tag({}, out, __component, "14");

  lasso_head_tag({}, out, __component, "15");

  out.w("</head><body>");

  component_globals_tag({}, out);

  lasso_body_tag({}, out, __component, "17");

  out.w("<script>\r\n      //create window variable for socket.io\r\n      window.socket = io();\r\n      //define window variable to carry current Modal target\r\n      window.currentModalTarget = 0;\r\n  </script>");

  app_navbar_standard_tag({}, out, __component, "18");

  app_settings_template_tag({
      hardwareBank: data.hardwareBank,
      systemSettings: data.systemSettings
    }, out, __component, "19");

  out.w("<p></p><style>\r\n  body {\r\n    overflow: hidden; /* Hide scrollbars */\r\n  }\r\n</style>");

  browser_refresh_tag({}, out, __component, "22");

  lasso_body_tag({}, out, __component, "23");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "24");

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
    id: "/cortex.iot$0.0.40/source/templates/settings/index.marko",
    tags: [
      "@lasso/marko-taglib/taglib/config-tag",
      "@lasso/marko-taglib/taglib/asset-var/renderer",
      "@lasso/marko-taglib/taglib/head-tag",
      "marko/src/core-tags/components/component-globals-tag",
      "@lasso/marko-taglib/taglib/body-tag",
      "../../../components/app-navbar-standard",
      "../../../components/app-settings-template",
      "browser-refresh-taglib/refresh-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };