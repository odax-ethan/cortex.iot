// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-dashboard-visualize-connected-sensor/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"graph-container\"><div id=\"graph\"></div><div><b>Zoom:</b><a href=\"#\" id=\"hour\">hour</a><a href=\"#\" id=\"day\">day</a><a href=\"#\" id=\"week\">week</a><a href=\"#\" id=\"month\">month</a><a href=\"#\" id=\"full\">full</a><b>Pan:</b><a href=\"#\" id=\"left\">left</a><a href=\"#\" id=\"right\">right</a></div></div><script>\r\n\r\n  // Specifying fields and data explicitly\r\n  var csv = Papa.unparse({\r\n    \"fields\": [\"Date\", \"sensor1\", \"sensor2\"],\r\n    data: [\r\n      [\"20070101\", \"46\", \"43\"],\r\n      [\"20070102\", \"99\", \"-50\"],\r\n      [\"20070202\", \"99\", \"-50\"],\r\n      [\"20070302\", \"99\", \"-50\"],\r\n      [\"20070402\", \"99\", \"-50\"]\r\n    ],\r\n  });\r\n\r\nvar target= document.getElementById(\"graph\")\r\n\r\n  g = new Dygraph(\r\n    target,\r\n    // For possible data formats, see http://dygraphs.com/data.html\r\n    // The x-values could also be dates, e.g. \"2012/03/15\"\r\n    csv, {\r\n      // options go here. See http://dygraphs.com/options.html\r\n      legend: 'always',\r\n      animatedZooms: true\r\n    });\r\n\r\n\r\n\r\n  /* var orig_range = [ data[0][0].valueOf(), data[data.length - 1][0].valueOf() ]; */\r\n  var desired_range = null,\r\n    animate;\r\n\r\n  function approach_range() {\r\n    if (!desired_range) return;\r\n    // go halfway there\r\n    var range = g.xAxisRange();\r\n    if (Math.abs(desired_range[0] - range[0]) < 60 &&\r\n      Math.abs(desired_range[1] - range[1]) < 60) {\r\n      g.updateOptions({\r\n        dateWindow: desired_range\r\n      });\r\n      // (do not set another timeout.)\r\n    } else {\r\n      var new_range;\r\n      new_range = [0.5 * (desired_range[0] + range[0]),\r\n        0.5 * (desired_range[1] + range[1])\r\n      ];\r\n      g.updateOptions({\r\n        dateWindow: new_range\r\n      });\r\n      animate();\r\n    }\r\n  }\r\n  animate = function() {\r\n    setTimeout(approach_range, 50);\r\n  };\r\n\r\n  var zoom = function(res) {\r\n    var w = g.xAxisRange();\r\n    desired_range = [w[0], w[0] + res * 1000];\r\n    animate();\r\n  };\r\n\r\n  var reset = function() {\r\n          desired_range = data[0];\r\n          animate();\r\n        };\r\n\r\n  var pan = function(dir) {\r\n    var w = g.xAxisRange();\r\n    var scale = w[1] - w[0];\r\n    var amount = scale * 0.25 * dir;\r\n    desired_range = [w[0] + amount, w[1] + amount];\r\n    animate();\r\n  };\r\n\r\n  document.getElementById('hour').onclick = function() {\r\n    zoom(3600);\r\n  };\r\n  document.getElementById('day').onclick = function() {\r\n    zoom(86400);\r\n  };\r\n  document.getElementById('week').onclick = function() {\r\n    zoom(604800);\r\n  };\r\n  document.getElementById('month').onclick = function() {\r\n    zoom(30 * 86400);\r\n  };\r\n  document.getElementById('full').onclick = function() {\r\n     zoom(2 * 86400);\r\n  };\r\n  document.getElementById('left').onclick = function() {\r\n    pan(-1);\r\n  };\r\n  document.getElementById('right').onclick = function() {\r\n    pan(+1);\r\n  };\r\n\r\n  setTimeout(function () {\r\n    var evt = document.createEvent('UIEvents');\r\n    evt.initUIEvent('resize', true, false,window,0);\r\n    window.dispatchEvent(evt);\r\n  }, 0);\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-dashboard-visualize-connected-sensor/index.marko"
  };
