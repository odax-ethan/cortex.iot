var five = require("johnny-five");


// Creating a new class from the parent
class Board extends five.Board {
    constructor(id, port, repl, debug, timeout, nid, color) {
        // Chain constructor with super
        super(id, port, repl, debug, timeout);

        // Add a new property
        this.nid = nid; // nick(name) ID
        this.color = color; // device system display color
    }

}





module.exports = { Board };