var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')
var cronNode = require('node-cron');

class RELAY {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
        this.cron = this.device.cron
    }

    build () {
        this.device_container = new five.Relay({id:this.uid, pin: this.device.pin ,  type: this.device.type})
        this.device_container.close();

        // listen for events in system
        systemEmitter.on(`relay-trigger-${this.uid}-on`, () => {
                                    
            this.device_container.close()

        });// end of system emitter

        // listen for events in system
        systemEmitter.on(`relay-trigger-${this.uid}-off`, () => {
    
            this.device_container.open()

        })// end of system emitter


        //check if there are any crons in device shape
        if (this.cron) {
            //for each cron shape in this.cron build a cron based on its type
            this.cron.forEach(cron => {

                //check the shape of the current cron & build correct tooling
                switch (cron.type) {
                    //create tooling for on on/off 
                    case "on/off":

                        // on/off is a 2 cron events, one is on/close and off is off/open
                        // it does not check if it should be on if the system is in between on and off
                        console.log(cron.shape);

                        //create cron for on/off start
                        var cronID_on = `cron-${cron.id}-on` // create dynamic variable for cron

                        //assign variable to cron event the first part of cron.shape[0] = on
                        this[cronID_on] = cronNode.schedule(cron.shape[0], () => {
                            console.log('running cron on');                    
                            // at start of event close relay (i.e. turn it on)
                            return this.device_container.close()
                        }); // end of cron on


                        //create cron for off
                        var cronID_off = `cron-${cron.id}-off` // create dynamic variable for cron

                        //assign variable to cron event the first part of cron.shape[0] = on
                        this[cronID_off] = cronNode.schedule(cron.shape[1], () => {
                            console.log('running cron off');                    
                            // at start of event close relay (i.e. turn it off)
                            return  this.device_container.open()
                        });  // end of cron off

                        break; // end of on/off tooling
                
                    default:
                        console.log("failed to load a cron");
                        break;
                }
                
            });


        
        }


    }
}


module.exports = { RELAY }