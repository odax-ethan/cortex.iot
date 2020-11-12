var five = require("johnny-five");
const { systemEmitter } = require('../network/event.emitter.js'); // untested
const { TimeStamp } = require('../boot/time.js'); // untested

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
            console.log('error');
    }


}

var dbPRFTemp = 'F'

// Creating a new class from the parent
Thermometer = (device, target_board, hardware_standards) => {      
    // console.log( target_board);        
    if (target_board.id === device.board) { //check that device.board matches the current target board
        varname = device.id
        this[varname] = new five.Thermometer({ id: device.id, controller: device.controller, pin: device.pin, board: target_board, freq: hardware_standards.freq })
        this[varname].on("data", function() {

            //filter output for anomlies
            //rerun datapull.
            
            //make sure to get temp in correct messurement
            // tempSwitch(this, dbPRFTemp)

            eventOBJ = {
                'timeStamp': TimeStamp.local,
                'deviceID': varname,
                'typeID': 'hardwareEvent',
                'dataBundle': tempSwitch(this, dbPRFTemp)
            }
            systemEmitter.emit('event', (eventOBJ));

            //trigger event output

          });

    }    
}


module.exports = { Thermometer };