var five = require("johnny-five");


// Creating a new class from the parent
Relay = (device, target_board) => {               
                if (target_board === device.board) { //check that device.board matches the current target board
                    varname = device.id
                    this[varname] = new five.Relay({ id: device.id, type: device.type, pin: device.pin, board: target_board })
                    // this[varname].open()
                    // this[varname].close()
                    this[varname].toggle()
                }    
}




module.exports = { Relay };