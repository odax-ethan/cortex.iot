var five = require("johnny-five");

class Relay {
    constructor(device, target_board) {
    
        this.device = device; //devices shape
        this.id = this.device.id // pull id out 
        this.target_board = target_board; //the devices board

    }
