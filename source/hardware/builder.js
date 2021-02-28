var five = require("johnny-five"); // Generic J5
var {DEVICEBANK} = require('./device_bank')
const { systemEmitter } = require('../util/emitter/systemEmitter') 

// hard class
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

          // call on board switch with in the deviceBank for each instance of board
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