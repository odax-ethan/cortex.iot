var five = require("johnny-five");
const { systemEmitter } = require('../network/event.emitter.js'); // tested
const { TimeStamp } = require('../boot/time.js'); // tested

class Switch {
	constructor(device, target_board, system_config) {
	
	    this.device = device; //devices shape
	    this.id = this.device.id // pull id out 
	    this.target_board = target_board; //the devices board
	    this.system_config = system_config //grab general settings 
	
	}
	
	build (){
                //create a Switch device with a dynamic variables using the device ID
            this[this.id] = new five.Switch({id: this.device.id, pin: this.device.pin, board: this.target_board})
        
            //create a variable to call within build()
            let currentSwitch =  this[this.id]
            let currentID = this.id
            
            currentSwitch.on("open", function() {

                let eventOBJ = {
                    'timeStamp': TimeStamp.local,
                    'deviceID': currentID,
                    'typeID': 'hardwareEvent',
                    'eventMeta': 'state',
                    'dataBundle': `open`
                }
                systemEmitter.emit('event', eventOBJ);
                
            });
            
            currentSwitch.on("close", function() {


                let eventOBJ = {
                    'timeStamp': TimeStamp.local,
                    'deviceID': currentID,
                    'typeID': 'hardwareEvent',
                    'eventMeta': 'state',
                    'dataBundle': `close`
                }

                systemEmitter.emit('event', eventOBJ);

        
            });

            

        }


}





module.exports = { Switch };