// Compiled using marko@4.18.14 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/corext.iot$0.0.1/components/app-sample/index.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"navbar\" role=\"navigation\" aria-label=\"main navigation\"><div class=\"navbar-brand\"><a class=\"navbar-item\" href=\"https://bulma.io\"><img src=\"https://bulma.io/images/bulma-logo.png\" width=\"112\" height=\"28\"></a><a role=\"button\" class=\"navbar-burger burger\" aria-label=\"menu\" aria-expanded=\"false\" data-target=\"navbarBasicExample\"><span aria-hidden=\"true\"></span><span aria-hidden=\"true\"></span><span aria-hidden=\"true\"></span></a></div><div id=\"navbarBasicExample\" class=\"navbar-menu\"><div class=\"navbar-start\"><a class=\"navbar-item\">Home</a><a class=\"navbar-item\">Documentation</a><div class=\"navbar-item has-dropdown is-hoverable\"><a class=\"navbar-link\">More</a><div class=\"navbar-dropdown\"><a class=\"navbar-item\">About</a><a class=\"navbar-item\">Jobs</a><a class=\"navbar-item\">Contact</a><hr class=\"navbar-divider\"><a class=\"navbar-item\">Report an issue</a></div></div></div><div class=\"navbar-end\"><div class=\"navbar-item\"><div class=\"buttons\"><a class=\"button is-primary\"><strong>Sign up</strong></a><a class=\"button is-light\">Log in</a></div></div></div></div></nav>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/corext.iot$0.0.1/components/app-sample/index.marko"
  };
