// var five = require("johnny-five");
// const { systemEmitter } = require('../../util/emitter/systemEmitter')

// class HYRGOMETER {
//     constructor(device, target_board) {
//         this.device = device; //devices shape
//         this.uid = this.device.uid // pull id out 
//         this.target_board = target_board; //the devices board
//         this.device_container
//     }

//     build () {
  
//         this.device_container = new five.Hygrometer({id:this.uid, pin: this.device.pin, controller: this.device.controller, freq:2000})
        
//         this.device_container.on("data" , function(data) {
//             systemEmitter.emit('event', this.uid, 'trigger', 'OK', data, TIMESTAMP.local)
//         });
//     }
// }




var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')

class HYGROMETER {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
    }
    build () {
        
        this.device_container = new five.Hygrometer({id:this.uid, pin: this.device.pin, controller: this.device.controller, freq:2000})
        
        this.device_container.on("data" , (data) => {
            systemEmitter.emit('event', this.uid, 'trigger', 'OK', data.relativeHumidity, TIMESTAMP.local)
        });
    }
}


module.exports = { HYGROMETER }

