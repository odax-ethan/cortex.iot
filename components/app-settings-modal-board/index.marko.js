// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-settings-modal-board/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    marko_forOf = require("marko/src/runtime/helpers/for-of");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<a" +
    marko_attr("id", "targetBoard_" + input.targetBoard) +
    marko_attr("onclick", ("openBoardModal(\"" + input.targetBoard) + "\")") +
    "><i class=\"fas fa-cogs\"></i></a><div" +
    marko_attr("id", input.targetBoard + "_Modal") +
    " class=\"modal\"><div class=\"modal-content\"><span" +
    marko_attr("id", input.targetBoard + "_Modal_closer") +
    " class=\"close\">&times;</span><div id=\"board_container\">");

  var $for$0 = 0;

  marko_forOf(input.hardwareBank, function(boards) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    if (boards.id === input.targetBoard) {
      out.w("BoardName: <input id=\"boardID\"" +
        marko_attr("value", boards.id) +
        "> <br> Board Color: <input id=\"boardColor\"" +
        marko_attr("value", boards.color) +
        "> <br> Board Port: <input id=\"boardPort\"" +
        marko_attr("value", boards.port) +
        "> <br> fish");
    }
  });

  out.w("<button type=\"button\" onclick=\"updateBoard()\"> Set Board</button><button type=\"button\"> Cancel</button></div></div></div><script>\r\n\r\n       openBoardModal = (targetName) => {\r\n\r\n              // Get the modal\r\n              var modal = document.getElementById(targetName+`_Modal`);\r\n\r\n              // Get the button that opens the modal\r\n              var btn = document.getElementById(\"targetBoard_\"+targetName);\r\n\r\n              // Get the <span> element that closes the modal\r\n              var span = document.getElementById( targetName + '_Modal_closer');\r\n\r\n              // When the user clicks on the button, open the modal\r\n              //btn.onclick = function() {\r\n              //  modal.style.display = \"block\";\r\n              //}\r\n              modal.style.display = \"block\";\r\n\r\n              // When the user clicks on <span> (x), close the modal\r\n              span.onclick = function() {\r\n                modal.style.display = \"none\";\r\n              }\r\n\r\n              // When the user clicks anywhere outside of the modal, close it\r\n              window.onclick = function(event) {\r\n                if (event.target == modal) {\r\n                  modal.style.display = \"none\";\r\n                }\r\n              }\r\n\r\n      }\r\n\r\n\r\n\r\n      updateBoard = () => {\r\n          var input = document.querySelectorAll('div#board_container input'); // get the input element\r\n\r\n          var newBoardID = input[0].value\r\n          var newBoardColor = input[1].value\r\n          var newBoardPort = input[2].value\r\n\r\n          updateBoard = {\r\n            id: newBoardID,\r\n            port: newBoardPort,\r\n            color: newBoardColor\r\n          }\r\n\r\n          //console.log(updateBoard);\r\n          socket.emit('update-board', updateBoard);\r\n\r\n      }\r\n\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-settings-modal-board/index.marko"
  };
