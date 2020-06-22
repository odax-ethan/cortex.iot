// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-settings-template/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    app_settings_modal_board_adder_template = require("../app-settings-modal-board-adder"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    app_settings_modal_board_adder_tag = marko_loadTag(app_settings_modal_board_adder_template),
    app_settings_board_device_template_template = require("../app-settings-board-device-template"),
    app_settings_board_device_template_tag = marko_loadTag(app_settings_board_device_template_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"cortexWrapper\"><div class=\"visualizerWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">General Settings</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div><div class=\"generalSettingsDiv\">Enironment Name: <input id=\"environmentName\"" +
    marko_attr("value", input.systemSettings.environmentName) +
    "> <br> Admin Name: <input id=\"adminName\"" +
    marko_attr("value", input.systemSettings.adminName) +
    "> <br><hr> Coordinates Latitude: <input id=\"lat\"" +
    marko_attr("value", input.systemSettings.coordinates.lat) +
    "> <br> Longitude: <input id=\"long\"" +
    marko_attr("value", input.systemSettings.coordinates.long) +
    "> <br><hr><a class=\"actionButton\" href=\"#\" target=\"_blank\" rel=\"nofollow noopener\">Update General Settings</a></div></div><div class=\"nodeBankWrapper drop-shadow-sharp\"><div class=\"topBar\"><div class=\"topBarTabs\"><a href=\"#\">Connect Devices</a></div><div class=\"topBarTabOption\"><a href=\"#\">|</a></div></div>");

  app_settings_modal_board_adder_tag({}, out, __component, "25");

  app_settings_board_device_template_tag({
      hardwareBank: input.hardwareBank
    }, out, __component, "26");

  out.w("</div></div><script>\r\n  //  var settingsInputs = document.querySelectorAll('div.cortexWrapper input'); // get the input element\r\n  //resizing function\r\n  // function resizeInput() {\r\n  //   this.style.width =  3 + this.value.length + \"ch\";\r\n  // }\r\n  //\r\n  // //set resizing for inputss so they can drop in.\r\n  // settingsInputs.forEach((input) => {\r\n  //   input.addEventListener('input', resizeInput); // bind the \"resizeInput\" callback on \"input\" event\r\n  //   resizeInput.call(input); // immediately call the function\r\n  //\r\n  // });\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-settings-template/index.marko",
    tags: [
      "../app-settings-modal-board-adder",
      "../app-settings-board-device-template"
    ]
  };
