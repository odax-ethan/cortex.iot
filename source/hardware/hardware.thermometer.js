var five = require("johnny-five");


// Creating a new class from the parent
class Thermometer extends five.Thermometer {
    constructor(id, pin, toCelsius, enabled, freq, nid, color) {
        // Chain constructor with super
        super(id, pin, toCelsius, enabled, threshold, freq);

        // Add a new property
        this.nid = nid; // nick(name) ID
        this.color = color; // device system display color
    } 

}

module.exports = { Thermometer };