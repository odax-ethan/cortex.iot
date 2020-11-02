var five = require("johnny-five");


// Creating a new class from the parent
class Hygrometer extends five.Hygrometer {
    constructor(id, pin, RH, relativeHumidity, freq, nid, color) {
        // Chain constructor with super
        super(id, pin, RH, relativeHumidity, freq, freq);

        // Add a new property
        this.nid = nid; // nick(name) ID
        this.color = color; // device system display color
    }

}


module.exports = { Hygrometer };