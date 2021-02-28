var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')

class THERMOMETER {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
    }

    build () {
        this.device_container = new five.Thermometer({id:this.uid, pin: this.device.pin, controller: this.device.controller, freq: 2000})
        
        this.device_container.on("data" , function() {
            console.log("celsius: %d", this.C);
            console.log("fahrenheit: %d", this.F);
            console.log("kelvin: %d", this.K);
        });
       
    }
}


module.exports = { THERMOMETER }