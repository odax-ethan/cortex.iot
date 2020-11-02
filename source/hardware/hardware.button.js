var five = require("johnny-five");


// Creating a new class from the parent
class Button extends five.Button {
    constructor(id, pin, invert, isPullup, isPulldown, holdtime, nid, color) {
        // Chain constructor with super
        super(id, pin, invert, isPullup, isPulldown, holdtime);

        // Add a new property
        this.nid = nid; // nick(name) ID
        this.color = color; // device system display color
    }

}





module.exports = { Button };