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
        this.device_container = new five.Thermometer({id:this.uid, pin: this.device.pin, controller: this.device.controller, freq: 2000})
        
        let temp_scale = this.SAMPLE_TEMP_SCALE 

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

        this.device_container.on("data", (data) => {
            
            systemEmitter.emit('event', this.uid, 'trigger', 'OK', this[temp_scale] , TIMESTAMP.local)

        })
    }
}


module.exports = { THERMOMETER }