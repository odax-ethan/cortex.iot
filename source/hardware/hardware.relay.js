var five = require("johnny-five");
const { systemEmitter } = require('../network/event.emitter.js'); // tested
const { TimeStamp } = require('../boot/time.js'); // tested


 class Relay {
                            constructor(device, target_board, system_config) {
                            
                                this.device = device; //devices shape
                                this.id = this.device.id // pull id out 
                                this.target_board = target_board; //the devices board
                                this.system_config = system_config //grab general settings 

                            }

                            build (){
                                
                                this[this.id] = new five.Relay({id: this.device.id, type: this.device.type, pin: this.device.pin, board: this.target_board})

                                let currentRelay =  this[this.id]

                                // listen for events in system
                                systemEmitter.on(`relay-trigger-${this.id}-on`, () => {
                                    
                                    currentRelay.close()

                                });// end of system emitter

                                // listen for events in system
                                systemEmitter.on(`relay-trigger-${this.id}-off`, () => {
    
                                    currentRelay.open()

                                })// end of system emitter



                            } // end of build()



} // end of class Hygrometer


module.exports = { Relay };