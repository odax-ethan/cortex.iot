var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')

class THERMOMETER {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
        this.SAMPLE_TEMP_SCALE = process.env.SAMPLE_TEMP_SCALE
    }

    build () {
        
        this.device_container = new five.Thermometer({id:this.uid, pin: this.device.pin, controller: this.device.controller, freq: process.env.HARDWARE_SAMPLE_RATE})

        // this.device_container.on("data" , function() {
        //     console.log("celsius: %d", this.C);
        //     console.log("fahrenheit: %d", this.F);
        //     console.log("kelvin: %d", this.K);
        // });

        // this[ this.id].on("data", function() {
                                   
        //     let eventOBJ = {
        //             'timeStamp': TimeStamp.local,
        //             'deviceID': this.id,
        //             'typeID': 'hardwareEvent',
        //             'dataBundle': this.relativeHumidity
        //     }
        //     return systemEmitter.emit('event', eventOBJ);
        // })


        let SAMPLE_TEMP_SCALE = this.SAMPLE_TEMP_SCALE

        this.device_container.on("data", (data) => {
            
            systemEmitter.emit('event', this.uid, 'trigger', 'OK', data[SAMPLE_TEMP_SCALE] , TIMESTAMP.local)

        })
    }
}


module.exports = { THERMOMETER }