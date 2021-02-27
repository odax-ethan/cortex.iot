var five = require("johnny-five"); // Generic J5
var {DEVICEBANK} = require('./device_bank')


// deviceBank = new DEVICEBANK()
// deviceBank.us_deploy_shape()
// console.log(deviceBank.shape);


// //define the shape of the instance
// var boards_shape = [
//     {id:'myBoard', port: "COM3", repl: false}
// ]

// //update and validate instance 
// boards_shape.forEach(board => {
//     if (board.port === 'PI') {
//         return board.port = new Raspi()
//     }
// })

// //report final boards_shape
// console.log(boards_shape);


// //create an instance of boards
// const boards = new five.Boards(boards_shape);

// //turn on a johnny five instance
// boards.on("ready", () => {

//   //for each initiallized board
//   boards.each(board => {
//     //   console.log(board);
//       boards.info(`${board.id}`, "I got somethin' to say!", { foo: 1 });
      
//       const led = new five.Led(13);
//       led.on();
  

//     }) // end of forEach board

//   //turn off boards instance
//   boards.on("exit", () => {
//     led.off();
//   });
// });




// class of hardware
build_devices = (target_board, boards_shape) => {

  // console.log(board_id);
  // console.log(boards_shape); 

  // var target_device_array

  // boards_shape.forEach(board => {

  //   if (target_board === board.uid) {
  //     console.log('found tagret');
  //     target_device_array = board.devices
  //     // console.log(target_device_array);
  //   }

  // });

  // target_device_array.forEach(device => {

  //     // console.log(device.uid);
  //     // console.log(device.class);
  //     // console.log(device.pin);
  //     // console.log(device.type);
  //     var varnam =  device.uid
  //     this[varnam] = new five.Relay({id:device.uid, pin: device.pin, type: device.type})

  //     // this[varnam] = new five.Relay({id: device.uid, pin: device.pin, board: target_board})
  //     // console.log(this[varnam]);
  //     this[varnam].open();
  //     this[varnam].close();
  //     this[varnam].open();
  //     this[varnam].close();
  //     this[varnam].open();
  //     this[varnam].close();



  // });

  


}




class HARDWARE {
  constructor (DEVICEBANK_class, quick_deploy) {

    // booleon if true us_quick_deploy shape
    this.quick_deploy = quick_deploy
    // get boards shape
    this.DEVICEBANK_class = DEVICEBANK_class
    //get correct shape base on quick deploy settings
    this.shape = [] 

    //this will be all hardware and J5
    this.boards

    //test quick deploy variable and get correct shape and place in this.shape
    var test_quick_deploy = (this.quick_deploy) ? this.DEVICEBANK_class.use_quick_deploy_shape().then(data=>{return this.shape = data}) : this.DEVICEBANK_class.use_database_shape().then((data)=>{return this.shape = data});

    // plugin shape
    //test if to include raspberry pi tooling
    try {
      var rasp_gpio = require('/raspi-io');
      // do stuff
    } catch (ex) {
      console.log('raspberry pi tool is not installed and will not be used');
    }

    //define j5 boards & build devices 

  }

  report() {
    console.log(this.quick_deploy);
    console.log(this.shape);
    console.log(this.shape[0]);
  }

  build_boards () {
    // //create an instance of boards
    console.log(this.DEVICEBANK_class.get_j5_boards_array());
    this.boards = new five.Boards(this.DEVICEBANK_class.get_j5_boards_array());


    //turn on a johnny five instance
    this.boards.on("ready", () => {

      //for each initiallized board
      this.boards.each(board => {
        //   console.log(board);
          this.boards.info(`${board.id}`, "I got somethin' to say!", { foo: 1 });
          // build_devices(board.id, this.shape )

          this.DEVICEBANK_class.device_switch(board.id)
        

      }) // end of forEach board

      //turn off boards instance
      this.boards.on("exit", () => {
        console.log('ended hardware instance');
      });
    });


  }

  end() {
    return this.boards.emit("exit")
  }

}

module.exports = { HARDWARE }