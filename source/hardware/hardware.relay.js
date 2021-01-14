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
                                this.CRON = this.device.CRON // grab cron array

                            }

                            build (){
                                
                                //create a relay device with a dynamic variables using the device ID
                                this[this.id] = new five.Relay({id: this.device.id, type: this.device.type, pin: this.device.pin, board: this.target_board})

                                //create a variable to call within build()
                                let currentRelay =  this[this.id]

                                // create listeners for triggers

                                // listen for events in system
                                systemEmitter.on(`relay-trigger-${this.id}-on`, () => {
                                    
                                    //check current state if off then turn on
                                    if (currentRelay.isOn === false){
                                        currentRelay.close()
                                    }
                                    

                                });// end of system emitter

                                // listen for events in system
                                systemEmitter.on(`relay-trigger-${this.id}-off`, () => {
    
                                     //check current state if on then turn off
                                     if (currentRelay.isOn === true){
                                        currentRelay.open()
                                    }
                                    

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
                                            case 'on/off':

                                                //create cron for on/off start
                                                var cronID_on = `cron-${cron.id}-on` // create dynamic variable for cron
                                               
                                                this[cronID_on] = new CronJob(cron.shape[0], function() {

                                                    
                                                    //notify the event stream event has occured
                                                    let eventOBJ = {
                                                        'timeStamp': TimeStamp.local,
                                                        'deviceID': cron.id,
                                                        'typeID': 'hardwareEvent',
                                                        'dataBundle': `cron on/off event [${cron.id}][on]`
                                                    }
                                                    systemEmitter.emit('event', eventOBJ);
                                                    

                                                    // at start of event close relay (i.e. turn it on)
                                                    return currentRelay.close()
                                                });

                                                

                                                //create cron for on/off end
                                                var cronID_off = `cron-${cron.id}-off` // create dynamic variable for cron
                                                this[cronID_off] = new CronJob(cron.shape[1], function() {

                                                   
                                                    let eventOBJ = {
                                                        'timeStamp': TimeStamp.local,
                                                        'deviceID': cron.target,
                                                        'typeID': 'hardwareEvent',
                                                        'dataBundle': `cron on/off event [${cron.id}][off]`
                                                    }
                                                    systemEmitter.emit('event', eventOBJ);
                                                    return  currentRelay.open()
                                                })

                                                this[cronID_on].start()
                                                this[cronID_off].start()
                                                
                                                break;
                    
                                            default:
                                                console.log('device type is not defined');
                                                break;
                                        } //end of switch for cron type


                                    }); // end of cron.forEach()
                                    
                                } else {
                                    
                                    return console.log('No Cron');

                                }//end of CRON relay Builder



                            } // end of build()



} // end of class Hygrometer


module.exports = { Relay };