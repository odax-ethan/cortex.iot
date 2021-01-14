var five = require("johnny-five");
const { systemEmitter } = require('../network/event.emitter.js'); // tested
const { TimeStamp } = require('../boot/time.js'); // tested

// function to get correct temp reading based on your db prefrances
tempSwitch = (tempOBJ, dbPref) =>{

    // uncomment to log sensor reading

    switch (dbPref) {
        case 'K':
            // console.log("kelvin: %d", tempOBJ.K);
            return tempOBJ.K    
        case 'F':
            // console.log("fahrenheit: %d", tempOBJ.F);
            return tempOBJ.F    
        case 'C':
            // console.log("celsius: %d", tempOBJ.C);
             return tempOBJ.C    
        default:
            console.log('error: for some reason we cant seem to tell what your reading unit is (K,F,C) ');
            console.log(dbPref);
    }


}

class Thermometer {
    constructor(device, target_board, system_config) {
    
        this.device = device;
        this.id = this.device.id
        this.target_board = target_board;
        this.system_config = system_config // get baseline hardware settings
        this.dbPRFTemp = 'F' //tell class which reading formate to save
        this.triggers = this.device.triggers // get triggers from device bundle

        // place holder class variable for current sensor reading
        this.currentReading
    }


    build (){
        let dbPRFTemp = this.dbPRFTemp
        let triggerBundle = this.triggers

        this[this.id] = new five.Thermometer({id: this.device.id, controller: this.device.controller, pin: this.device.pin, board: this.target_board, freq: this.system_config.freq })
        
        // console.log(this[this.id]);
        
        this[this.id].on("data", function() {
           
            // console.log(this);
        let eventOBJ = {
                'timeStamp': TimeStamp.local,
                'deviceID': this.id,
                'typeID': 'hardwareEvent',
                'dataBundle': tempSwitch(this, dbPRFTemp)
        }

        //test if there is a trigger
        if (triggerBundle) {

            triggerBundle.forEach(element => {

                // This is called when the sensor's value property falls within 100-200
                // console.log(element.origin);
                // console.log(element.target);

                let rangeBottom = element.range[0]
                let rangeCap = element.range[1]



                if (rangeBottom < eventOBJ.dataBundle < rangeCap) {
                    console.log('in range');

                    switch (element.state) {
                        case true:
                            console.log('triggered on');
                            systemEmitter.emit(`relay-trigger-${element.target}-on`)
                            break;

                        case false:
                            console.log('triggered off');
                            systemEmitter.emit(`relay-trigger-${devielement.targetceID}-off`)
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


} // end of class Thermometer

module.exports = { Thermometer };