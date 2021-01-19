var five = require("johnny-five");
const { systemEmitter } = require('../network/event.emitter.js'); // tested
const { TimeStamp } = require('../boot/time.js'); // tested

 class Hygrometer {
                            constructor(device, target_board, system_config) {
                            
                                this.device = device;
                                this.id = this.device.id
                                this.target_board = target_board;
                                this.system_config = system_config
                                this.triggers = this.device.triggers // get triggers from device bundle

                                // console.log(this.device);

                                // place holder class variable for current sensor reading
                                this.currentReading
                            }

                            build (){
                                let triggerBundle = this.triggers // grab
                                console.log( triggerBundle);

                                this[ this.id] = new five.Hygrometer({ id: this.device.id, controller: this.device.controller, board: this.target_board, freq: this.system_config.freq })
                              
                                this[ this.id].on("data", function() {
                                   
                                let eventOBJ = {
                                        'timeStamp': TimeStamp.local,
                                        'deviceID': this.id,
                                        'typeID': 'hardwareEvent',
                                        'dataBundle': this.relativeHumidity
                                }

                               
                                        //test if there is a trigger
                                if (triggerBundle) {
                                        triggerBundle.forEach(element => {

                                            // This is called when the sensor's value property falls within 100-200
                                            // console.log(element.origin);
                                            // console.log(element.target);
                                            console.log('handling trigger');
                            
                                            let rangeBottom = element.range[0]
                                            let rangeCap = element.range[1]
                                            
                                            if (rangeBottom < eventOBJ.dataBundle < rangeCap) {

                                                console.log('action should happen');

                                                switch (element.state) {
                                                    case true:
                                                        console.log('triggered on');
                                                        systemEmitter.emit(`relay-trigger-${element.target}-on`)
                                                        break;
                            
                                                    case false:
                                                        console.log('triggered off');
                                                        systemEmitter.emit(`relay-trigger-${element.target}-off`)
                                                        break;
                                                    default:
                                                        console.log('error: trigger range');
                                                        break;
                                                }
                                            } else {
                                                console.log('out range');
                                            }
                            
                                        }); // end triggerBundle.forEach()


                                } else {
                                    console.log('no triggers to handle');
                                }

                                return systemEmitter.emit('event', eventOBJ);
                                })

                            } // end of build()

} // end of class Hygrometer

module.exports = { Hygrometer };

