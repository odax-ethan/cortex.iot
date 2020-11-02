var five = require("johnny-five");


// Creating a new class from the parent
class Relay extends five.Relay {
    constructor(id, type, pin, nid, color) {
        // Chain constructor with super
        super(id, type, pin);

        // Add a new property
        this.nid = nid; // nick(name) ID
        this.color = color; // device system display color
    }

}





module.exports = { Relay };