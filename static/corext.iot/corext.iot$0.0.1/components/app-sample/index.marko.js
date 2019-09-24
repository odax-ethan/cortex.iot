$_mod.def("/corext.iot$0.0.1/components/app-sample/index.marko", function(require, exports, module, __filename, __dirname) { // Compiled using marko@4.18.14 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require('/marko$4.18.14/src/vdom'/*"marko/src/vdom"*/).t(),
    marko_component = {
        onCreate: function() {
          this.state = {
              count: 0
            };
        },
        onMount: function() {
          console.log("Mounted in the browser!");
        },
        increment: function() {
          this.state.count++;
        }
      },
    components_helpers = require('/marko$4.18.14/src/runtime/components/helpers-browser'/*"marko/src/runtime/components/helpers"*/),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/corext.iot$0.0.1/components/app-sample/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_attrs0 = {
        "class": "count"
      },
    marko_attrs1 = {
        type: "button",
        "class": "example-button"
      };

function render(input, out, __component, component, state) {
  var data = input;

  out.e("p", null, "0", component, 2)
    .t("Hello ")
    .t(input.name);

  out.e("div", marko_attrs0, "1", component, 1)
    .t(state.count);

  out.e("button", marko_attrs1, "2", component, 1, 0, {
      onclick: __component.d("click", "increment", false)
    })
    .t("Click me");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

});