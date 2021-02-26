// take full board bank and create needed sections to init johnny five

const fs = require("fs");
const path = require("path")
const { DB } = require('../../cortex.core')


class DEVICEBANK {
    constructor(  ) { 
        this.shape = null
        this.all_devices = null

     }

    shape () {
        return this.shape
    }

    async us_quick_deploy_shape () {
                
                let cortex_shape_path = path.join(__dirname,"../../config/cortex_shape.json")
                var output = await fs.readFile(cortex_shape_path, "utf8", (err, jsonString) => {
                    if (err) {
                    console.log("Error reading file from disk:", err);
                    return;
                    }
                    try {
                    const boardBank = JSON.parse(jsonString);
                    this.shape  = boardBank
                    DB.SET_DEVICEBANK( boardBank )
                    .then(()=>{
                        console.log(`deviceBank has been Saved`);
                        console.log(this.shape);
                        return this.shape
                    })
                    .catch((err)=>{throw err})
                
                    } catch (err) {
                    console.log("Error parsing JSON string:", err);
                    }
            });
            return output;
    }

    async us_database_shape () {
        console.log('working');
        var output = await DB.GET_DEVICEBANK()
        .then(deviceBank=>{
            this.shape = deviceBank.deviceBank
            console.log(this.shape);
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
        
    }

}

  

 module.exports = { DEVICEBANK }

