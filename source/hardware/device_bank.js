// take full board bank and create needed sections to init johnny five

const fs = require("fs");
const path = require("path")
const { DB } = require('../../cortex.core')
var five = require("johnny-five"); // Generic J5


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

    get_target_board (target_board_uid) {

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

    get_target_device (target_device_uid) {

    }

    get_j5_boards_array () {
        var output = []
        var shape = this.shape
        shape.forEach( (board, index) => {
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
                    var varname =  device.uid
                  
                    console.log(device.type);
                    this[varname] = new five.Relay({id:device.uid, pin: device.pin, type: device.type})
                    // this[varname] = new five.Relay({id:device.uid, pin: device.pin, type: device.type, board: target_board})
                    this[varname].close();
                    break;
                case 'switch':
                    var varname =  device.uid
                    this[varname] = new five.Switch({id:device.uid, pin: device.pin})
                   
                    this[varname].on("open", function() {
                        console.log('open');
                      });
                    
                    this[varname].on("close", function() {
                        console.log('closed');
                    });

                break;
                default:
                    break;
            }

        });

    }

}

  

 module.exports = { DEVICEBANK }

