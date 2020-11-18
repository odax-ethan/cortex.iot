var five = require("johnny-five");


// Creating a new class from the parent
class Sensor extends five.Sensor {
    constructor(id, pin, threshold, freq, nid, color) {
        // Chain constructor with super
        super(id, pin, threshold, freq);

        // Add a new property
        this.nid = nid; // nick(name) ID
        this.color = color; // device system display color
    }

}





module.exports = { Sensor };