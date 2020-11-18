var five = require("johnny-five");


// Creating a new class from the parent
class Switch extends five.Switch {
    constructor(id, pin, type, nid, color) {
        // Chain constructor with super
        super(id, pin, type,);

        // Add a new property
        this.nid = nid; // nick(name) ID
        this.color = color; // device system display color
    }

}


module.exports = { Switch };