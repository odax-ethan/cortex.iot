var five = require("johnny-five");

// Creating a new class from the parent
Thermometer = (device, target_board, hardware_standards) => {      
    console.log( target_board);        
    if (target_board.id === device.board) { //check that device.board matches the current target board
        console.log(device);
        varname = device.id
        this[varname] = new five.Thermometer({ id: device.id, controller: device.controller, pin: device.pin, board: target_board, freq: hardware_standards.freq })
        this[varname].on("data", function() {
            console.log("celsius: %d", this.C);
            console.log("fahrenheit: %d", this.F);
            console.log("kelvin: %d", this.K);
          });

    }    
}


module.exports = { Thermometer };