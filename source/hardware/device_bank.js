// take full board bank and create needed sections to init johnny five
const fs = require("fs");
const path = require("path")
const { DB } = require('../../cortex.core')
var five = require("johnny-five"); // Generic J5
const { systemEmitter } = require('../util/emitter/systemEmitter')

// NEEDED FOR PI TO ACCESS GPIO
// const Raspi = require('raspi-io').RaspiIO;

// relay custom class
const { RELAY } = require('./components/Relay')
//switch custom class
const { SWITCH } = require('./components/Switch')

const { THERMOMETER } = require('./components/Thermometer')
//switch custom class
const { HYGROMETER } = require('./components/Hygrometer')

class DEVICEBANK {
    constructor(  ) { 
        this.shape = null
        this.all_devices = null
     }

    shape () {
        return this.shape
    }

    use_quick_deploy_shape () {
        var shape = new Promise((resolve)=>{
                
            let cortex_shape_path= path.join(__dirname,"../../config/cortex_shape.json")
                fs.readFile(cortex_shape_path, "utf8", (err, jsonString) => {
                    if (err) {
                        console.log("Error reading file from disk:", err);
                        return;
                    }
                    const boardBank = JSON.parse(jsonString);
                    // console.log(boardBank);
                    this.shape = boardBank
                    DB.SET_DEVICEBANK(boardBank)
                    .then(() => {
                        console.log(`deviceBank has been Saved`);
                        resolve(this.shape)
                    })
                    .catch((err) => { throw err; });
                    
                })            
        })
        return shape

    }

    async use_database_shape () {
        console.log('working');
        var output = await DB.GET_DEVICEBANK()
        .then(deviceBank=>{
            this.shape = deviceBank.deviceBank
            return  this.shape 
        })
        .catch((err)=>{throw err})
        
        return output
    }

    get_boards_devices () {
        var output = []
        var shape = this.shape
        shape.forEach( (board, index) => {
            var target_board_devices = {board: board.uid, device: board.devices}
            output.push(target_board_devices)
        });
        return output;
    }

    get_j5_boards_array () {
        var output = []
        var shape = this.shape
        shape.forEach( (board, index) => {

            // var pi_shape = {
            //     io: new Raspi()
            // }

            // var normal_port = {
            //     port: board.port
            // }

            // var target_board_devices = (board.port === "pi_io") ? {id: board.uid, ...pi_shape} : { id:board.uid, ...normal_port};
            var target_board_devices = {id: board.uid, port: board.port}

            output.push(target_board_devices)
        });
        return output;
        
    }

    device_switch (target_board) {

        var target_device_array

        this.shape.forEach(board => {

            if (target_board === board.uid) {
                console.log('found tagret');
                target_device_array = board.devices
                // console.log(target_device_array);
            }

        });

        target_device_array.forEach(device => {

            console.log(`BUILDING:[${device.uid}]@[${target_board}]`);

            //check which device class should be used to build the device
            switch (device.class) {
                case 'relay':
                    new RELAY(device, target_board).build()
                    break;
                case 'switch':
                    new SWITCH(device, target_board).build()
                break;
                case 'thermometer':
                    new THERMOMETER(device, target_board).build()
                    break;
                case 'hygrometer':
                    new HYGROMETER(device, target_board).build()
                break;
                default:
                    break;
            }

        });

    }

}

module.exports = { DEVICEBANK }

