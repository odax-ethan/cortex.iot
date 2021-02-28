var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')

class RELAY {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
    }

    build () {
        this.device_container = new five.Relay({id:this.uid, pin: this.device.pin ,  type: this.device.type})
        this.device_container.close();

        // listen for events in system
        systemEmitter.on(`relay-trigger-${this.uid}-on`, () => {
                                    
            this.device_container.close()

        });// end of system emitter

        // listen for events in system
        systemEmitter.on(`relay-trigger-${this.uid}-off`, () => {
    
            this.device_container.open()

        })// end of system emitter


    }
}


module.exports = { RELAY }