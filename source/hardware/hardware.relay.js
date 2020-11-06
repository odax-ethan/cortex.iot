var five = require("johnny-five");


// Creating a new class from the parent
class Relay {
    constructor(data) {
        // Chain constructor with super

        this.relay = new five.Relay({
            id : data.id, // nick(name) ID
            type : data.type, // device system display color
            pin : data.pin,
        });

        // Add a new property
        this.nid = data.nid; // nick(name) ID
        this.color = data.color; // device system display color

    }

    action() {
        this.relay.on()
        console.log(this.relay);
    }



}





module.exports = { Relay };