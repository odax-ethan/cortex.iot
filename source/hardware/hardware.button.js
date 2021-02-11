var five = require("johnny-five");
const { TimeStamp } = require('../boot/time.js'); // tested
const { systemEmitter } = require('../network/event.emitter.js'); // tested

class Button {
    constructor(device, target_board, system_config) {
    
        this.device = device; //devices shape
        this.id = this.device.id // pull id out 
        this.target_board = target_board; //the devices board
        this.system_config = system_config //grab general settings 

    }

    build() {

        this[this.id] = new five.Button({ id: this.device.id,  pin: this.device.pin, board: this.target_board, invert: false})

        let currentButton = this[this.id]
        let currentID = this.id

        currentButton.on("hold", function() {
            
            let eventOBJ = {
                'timeStamp': TimeStamp.local,
                'deviceID': currentID,
                'typeID': 'hardwareEvent',
                'dataBundle': `hold`
            }
            systemEmitter.emit('event', eventOBJ);

          });
        
          currentButton.on("down", function() {
            
            let eventOBJ = {
                'timeStamp': TimeStamp.local,                                       
                'deviceID': currentID,
                'typeID': 'hardwareEvent',
                'dataBundle': `down`
            }
            systemEmitter.emit('event', eventOBJ);

          });
        
          currentButton.on("up", function() {
           
            let eventOBJ = {
                'timeStamp': TimeStamp.local,
                'deviceID': currentID,
                'typeID': 'hardwareEvent',
                'dataBundle': `up`
            }
            systemEmitter.emit('event', eventOBJ);

          });

    }


}


module.exports = { Button };