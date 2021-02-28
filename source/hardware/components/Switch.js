var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')

class SWITCH {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
    }

    build () {
        this.device_container = new five.Switch({id:this.uid, pin: this.device.pin, type: this.device.type})
       
        //share state change in  the client
       this.device_container.on("open", function() {
            console.log('open');

            // systemEmitter.emit(`switch-trigger-${this.uid}-open`)

        });
        
        //share state change in  the client
       this.device_container.on("close", function() {
            console.log('closed');
        
        });

    }
}


module.exports = { SWITCH }