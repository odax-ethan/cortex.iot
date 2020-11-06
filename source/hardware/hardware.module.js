var five = require("johnny-five"); // Generic J5

//Board refactored
const { Board } = require('./hardware.board.js'); // untested

//Board Sensor refactored
const { Sensor } = require('./hardware.sensor.js'); // untested

//Board Relay refactored
const { Relay } = require('./hardware.relay.js'); //untested

//Board Thermometer refactored
const { Thermometer } = require('./hardware.thermometer.js'); // untested

//Board Hygrometer refactored
const { Hygrometer } = require('./hardware.hygrometer.js'); //untested

//Board Button refactored
const { Button } = require('./hardware.button.js'); //untested

//Board Switch refactored
const { Switch } = require('./hardware.switch.js'); //untested


const {Hardware_config, System_config} = require('../database/settings.pouchdb');


//build ports obj for boards.j5
board_port_builder = (board_map) => {
    //expects a map

    let j5_boards = []

    board_map.forEach(element => {
        let id = element.id
        let port = element.port
        j5_boards.push({ id: id, port: port}) 
        // console.log( element);
    });

    // console.log(j5_boards);
    return j5_boards
}

//assemble ports + board.j5
board_assembler = (port_obj, board_map, hardware_settings) => {

    let hardware_standards = {
        freq : hardware_settings.system_master_freq,  //grab hardware master freq
        standard_temp : hardware_settings.system_reading_temp_standard  //standardized temp to one reading C,F, or K
    }
  
    new five.Boards(port_obj).on("ready", function() {

        // Both "A" and "B" are initialized
        // (connected and available for communication)
      
        // |this| is an array-like object containing references
        // to each initialized board.
        this.each(function(board) {
      
        //get devices from board_map
        boards_devices = board_map.get(board.id).devices
        device_switch(boards_devices, board, hardware_standards) // run boards devices through switch
       

         });//end of boards.each
    }); //end of boards



};

//switch and run correct p5 class based on device array
device_switch = (devices, target_board, hardware_standards) => {

    devices.forEach(device => {

        //test for class
        switch (device.class) {
            case "sensor":
                console.log(device.id);
                break;
            case "thermometer":
                // run standard Thermometer Function
                Thermometer(device, target_board, hardware_standards)
                break;
            case "hygrometer":
                console.log(device.id);
            break;
            case "button":
                console.log(device.id);
                break;
            case "switch":
                console.log(device.id);
                break;
            case "relay":
                // run standard Relay Function
                Relay(device, target_board)
 
                Relay
                break;
            case "led":
                varname = device.id
                this[varname] = new five.Led({ id: device.id, pin: device.pin, board: target_board })
                // this[varname].open()
                // this[varname].close()
                // this[varname].toggle()
                break;
            default:
                console.log('no functionality is present to handle this device');
                break;
        }

    });

}

//get hardware_config and start process of staring/running johnny-five
setupHardware = () => {
    

    Hardware_config().then((data)=>{
        // console.log(data);
        return [data, board_port_builder(data)]
    }).catch(err =>{
        console.log(err);
    }).then((data)=>{
        // console.log(data[0]);
        // console.log(data[1]);

        //get system_settings
        System_config().then((data_bundle)=>{
            // console.log(data);
            return board_assembler(data[1], data[0], data_bundle ); // send prebuilt board_ports + full hardware_map
        }).catch(err =>{
            console.log(err);
        })
    
        
    })

}


// setupHardware()

module.exports = { setupHardware };
