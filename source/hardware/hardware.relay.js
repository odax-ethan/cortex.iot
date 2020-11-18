var five = require("johnny-five");
const { systemEmitter } = require('../network/event.emitter.js'); // tested
const { TimeStamp } = require('../boot/time.js'); // tested


// Creating a new class from the parent
// Relay = (device, target_board) => {               
//                 if (target_board === device.board) { //check that device.board matches the current target board
//                     varname = device.id
//                     this[varname] = new five.Relay({ id: device.id, type: device.type, pin: device.pin, board: target_board })
//                     // this[varname].open()
//                     // this[varname].close()
//                     this[varname].toggle()
//                 }    
// }

 class Relay {
                            constructor(device, target_board, system_config) {
                            
                                this.device = device;
                                this.id = this.device.id
                                this.target_board = target_board;
                                this.system_config = system_config

                            }

                            build (){
                            
                                this[ this.id] = new five.Hygrometer({ id: this.device.id, controller: this.device.controller, board: this.target_board, freq: this.system_config.freq })
                                this[ this.id].on("data", function() {

                                // let eventOBJ = {
                                //         'timeStamp': TimeStamp.local,
                                //         'deviceID': this.id,
                                //         'typeID': 'hardwareEvent',
                                //         'dataBundle': this.relativeHumidity
                                // }
                                // return systemEmitter.emit('event', eventOBJ);
                                })

                            } // end of build()

} // end of class Hygrometer


module.exports = { Relay };