var five = require("johnny-five"); // Generic J5
var {DEVICEBANK} = require('./device_bank')
//test if to include raspberry pi tooling
try {
    var rasp_gpio = require('/raspi-io');
    // do stuff
} catch (ex) {
    console.log('raspberry pi tool is not installed and will not be used');
}


// deviceBank = new DEVICEBANK()
// deviceBank.us_deploy_shape()
// console.log(deviceBank.shape);


//define the shape of the instance
var boards_shape = [
    {id:'myBoard', port: "COM3", repl: false}
]

//update and validate instance 
boards_shape.forEach(board => {
    if (board.port === 'PI') {
        return board.port = new Raspi()
    }
})

//report final boards_shape
console.log(boards_shape);


//create an instance of boards
const boards = new five.Boards(boards_shape);

//turn on a johnny five instance
boards.on("ready", () => {

  //for each initiallized board
  boards.each(board => {
    //   console.log(board);
      boards.info(`${board.id}`, "I got somethin' to say!", { foo: 1 });
      
      const led = new five.Led(13);
      led.on();
  

    }) // end of forEach board

  //turn off boards instance
  boards.on("exit", () => {
    led.off();
  });
});