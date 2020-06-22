// Compiled using marko@4.18.48 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/cortex.iot$0.0.40/components/app-settings-modal-board-adder/index.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_attr = require("marko/src/runtime/html/helpers/attr");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<a class=\"actionButton\"" +
    marko_attr("onclick", "openBoardModal(\"newBoard\")") +
    " target=\"_blank\" rel=\"nofollow noopener\">Add A New Board</a><div" +
    marko_attr("id", "newBoard_Modal") +
    " class=\"modal\"><div class=\"modal-content\"><span" +
    marko_attr("id", "newBoard_Modal_closer") +
    " class=\"close\">&times;</span><div id=\"newBoard_adder_div\">BoardName: <input id=\"newBoardID\"> <br> Color <input id=\"newBoardColor\" value=\"- Select A Color -\" data-huebee=\"{ &#34;notation&#34;: &#34;rgb&#34;, &#34;saturations&#34;: 2 }\"> <br> Board Port: <input id=\"newBoardPort\"> <br></div><button type=\"button\" onclick=\"createNewBoard()\"> Create Board</button><button type=\"button\"> Cancel</button></div></div><script>\r\n      //open modal target\r\n       openBoardModal = (targetName) => {\r\n\r\n              // Get the modal\r\n              var modal = document.getElementById(targetName+`_Modal`);\r\n\r\n              // Get the button that opens the modal\r\n              var btn = document.getElementById(\"targetBoard_\"+targetName);\r\n\r\n              // Get the <span> element that closes the modal\r\n              var span = document.getElementById( targetName + '_Modal_closer');\r\n\r\n              // When the user clicks on the button, open the modal\r\n              //btn.onclick = function() {\r\n              //  modal.style.display = \"block\";\r\n              //}\r\n              modal.style.display = \"block\";\r\n\r\n              // When the user clicks on <span> (x), close the modal\r\n              span.onclick = function() {\r\n                modal.style.display = \"none\";\r\n              }\r\n\r\n              // When the user clicks anywhere outside of the modal, close it\r\n              window.onclick = function(event) {\r\n                if (event.target == modal) {\r\n                  modal.style.display = \"none\";\r\n                }\r\n              }\r\n\r\n\r\n\r\n      }\r\n\r\n      createNewBoard = () => {\r\n          var input = document.querySelectorAll('div#newBoard_adder_div input'); // get the input element\r\n\r\n          var newBoardID = input[0].value\r\n          var newBoardColor = input[1].value\r\n          var newBoardPort = input[2].value\r\n\r\n          newBoardBundle = {\r\n            id: newBoardID,\r\n            port: newBoardPort,\r\n            color: newBoardColor\r\n          }\r\n\r\n          //console.log(newBoardBundle);\r\n\r\n          socket.emit('add-new-board', newBoardBundle);\r\n\r\n      }\r\n\r\n\r\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    deps: [
      "./style.css"
    ],
    id: "/cortex.iot$0.0.40/components/app-settings-modal-board-adder/index.marko"
  };
