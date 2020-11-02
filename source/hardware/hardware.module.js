var five = require("johnny-five"); // Generic J5

//Board refactored
const { Board } = require('./hardware.board.js'); // tested

//Board Sensor refactored
const { Sensor } = require('./hardware.sensor.js'); // tested

//Board Thermometer refactored
const { Thermometer } = require('./hardware.thermometer.js'); // untested

//Board Hygrometer refactored
const { Hygrometer } = require('./hardware.hygrometer.js'); //untested

//Board Button refactored
const { Button } = require('./hardware.button.js'); //untested

//Board Switch refactored
const { Switch } = require('./hardware.switch.js'); //untested




// test systems

// var board = new Board({
//     port: 'COM3'
// });

// board.on("ready", function() {
//   /*
//     Initialize pin 13, which 
//     controls the built-in LED
//   */
//   var led = new five.Led(13);

//   this.repl.inject({
//     led: led
//   });

// });
