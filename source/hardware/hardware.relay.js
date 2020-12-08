var five = require("johnny-five");
const { systemEmitter } = require('../network/event.emitter.js'); // tested
const { TimeStamp } = require('../boot/time.js'); // tested
var CronJob = require('cron').CronJob; // event schedular


 class Relay {
                            constructor(device, target_board, system_config) {
                            
                                this.device = device; //devices shape
                                this.id = this.device.id // pull id out 
                                this.target_board = target_board; //the devices board
                                this.system_config = system_config //grab general settings 


                                this.CRON = this.device.CRON
                                console.log(this.CRON);

                            }

                            build (){
                                
                                this[this.id] = new five.Relay({id: this.device.id, type: this.device.type, pin: this.device.pin, board: this.target_board})

                                let currentRelay =  this[this.id]

                                // create listeners for triggers

                                // listen for events in system
                                systemEmitter.on(`relay-trigger-${this.id}-on`, () => {
                                    
                                    currentRelay.close()

                                });// end of system emitter

                                // listen for events in system
                                systemEmitter.on(`relay-trigger-${this.id}-off`, () => {
    
                                    currentRelay.open()

                                })// end of system emitter


                                //create Crons

                                if (this.CRON.length > 0 ) {

                                    // for each cron in the devices cron array create a cron based on its type
                                    return this.CRON.forEach((cron,index,arr)=>{
                                        // console.log(cron.type);

                                        switch (cron.type) {
                                            case 'burst':

                                                console.log(cron.shape);
                                                
                                                var cronID = `cron-${cron.id}` // create dynamic variable for cron
                                                this[cronID] = new CronJob(cron.shape, function() {

                                                    console.log('cron started');

                                                    // at start of event close relay (i.e. turn it on)
                                                    currentRelay.close()
                                                    //notify the event stream event has occured
                                                    let eventOBJ = {
                                                        'timeStamp': TimeStamp.local,
                                                        'deviceID': cron.id,
                                                        'typeID': 'hardwareEvent',
                                                        'dataBundle': `cron burst event [${cron.id}][on]`
                                                    }
                                                    systemEmitter.emit('event', eventOBJ);

                                                    // turn off relay (i.e. open it)
                                                    setTimeout(() => {
                                                        console.log('cron timed out');
                                                        currentRelay.open()
                                                        let eventOBJ = {
                                                            'timeStamp': TimeStamp.local,
                                                            'deviceID': cron.target,
                                                            'typeID': 'hardwareEvent',
                                                            'dataBundle': `cron burst event [${cron.id}][off]`
                                                        }
                                                        systemEmitter.emit('event', eventOBJ);
                                                    }, cron.length);

                                                    
                                                
                                                }); // end of cron

                                                //start cron that was just created
                                                this[cronID].start();

                                                break;
                                        
                                            default:
                                                
                                                break;
                                        } //end of switch for cron type


                                    }); // end of cron.forEach()
                                    
                                } else {
                                    
                                    return console.log('No Cron');

                                }//end of CRON relay Builder



                            } // end of build()



} // end of class Hygrometer


module.exports = { Relay };