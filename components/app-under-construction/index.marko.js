// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-under-construction/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"imgContainer\"><img src=\"https://media3.giphy.com/media/l1J3NaHI0JONGmN1K/giphy.gif?cid=790b7611b8d9bcac918bcb7429ab835485458adf14f77d9a&amp;amp;rid=giphy.gif\" alt=\"animation love GIF by Jimmy Simpson\" style=\"width: 45vh; opacity: 100;\"><br></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "#imgContainer {\r\n   position: relative;\r\n   top: 17vh;\r\n   left: 35vw;\r\n   }\r\n      body {\r\n     background-color:white;\r\n   }",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        }
    ],
    id: "/cortex.iot$0.0.40/components/app-under-construction/index.marko"
  };
