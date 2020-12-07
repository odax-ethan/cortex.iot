////////////////////////////////////////////////////////////////////////////////
// boards
////////////////////////////////////////////////////////////////////////////////

// define all boards in the system

// name your board with nid - this is how it will identified in the ui
// space and caps allowed
// no duplicate names - it will start but will not return correct values

// Define port based on your OS's style
// LINUX:
// OXS: "/dev/ttyACM*" [example: ttyACM0, ttyACM1]
// WINDOWS: COM**  [example: COM2, COM54 ]


const boards = [
    {
      id: 'dev_test_board',
      nid: 'dev test board',
      port: "COM3",
      color: "#AAA9E6",
      devices: []
    }
  ]



////////////////////////////////////////////////////////////////////////////////
// device
////////////////////////////////////////////////////////////////////////////////

// starter template:
// edit this for quick deployment of a predefined system.
// you do not define freq -> the system will use the system_master_freq

const devices = [

    //fruiting chamber temp
    { 
        id:'fruiting_temp', 
        nid:'Fruiting Temp', 
        class:'thermometer',
        controller: 'SHT31D',
        // pin: '7',
        board:'dev_test_board',
        color: '#d82c2c',
        triggers: []
    },

    // { 
    //     id:'fruiting_temp', 
    //     nid:'Fruiting Temp', 
    //     class:'thermometer',
    //     controller: 'DS18B20',
    //     pin: '8',
    //     board:'dev_test_board',
    //     color: '#d82c2c',
    //     triggers: []
    // },


    // //relay to controll relay for humidifier
    { 
        id:'fruiting_heater', 
        nid:'heater', 
        class:'relay',
        pin: 13,
        type: 'NC',
        board:'dev_test_board',
        color: "#5647FF",
        CRON: []
    },

    //Hygrometer
    // { 
    //     id:'fruiting_temp', 
    //     nid:'Fruiting Temp', 
    //     class:'hygrometer',
    //     controller: 'SHT31D',
    //     board:'dev_test_board',
    //     color: '#d82c2c'
    // },

    //    fruiting chamber temp
    // { 
    //     id:'fruiting_temp', 
    //     nid:'Fruiting Temp', 
    //     class:'thermometer',
    //     controller: 'SHT31D',
    //     board:'dev_test_board',
    //     color: '#d82c2c'
    // },

    //LED
    // { 
    //     id:'led',
    //     nid: 'test led',
    //     class:'led',
    //     pinL: 13,
    //     board:'dev_test_board',
    //     color: '#d82c2c'
    // },

]


////////////////////////////////////////////////////////////////////////////////
// event schedular / CRON
////////////////////////////////////////////////////////////////////////////////


CRONs = [

    //test cron
    {
        id: 'test_cron',
        nid: 'test cron',
        target: 'fruiting_heater',
        type: 'burst',
        shape: ' */15 * * * * * ',
        length: 5000,
        color: '#7def71'
    }

]



////////////////////////////////////////////////////////////////////////////////
// triggers: Me and my tiggers
////////////////////////////////////////////////////////////////////////////////

triggers = [

    //test trigger
    {
        id: 'test_trigger',
        nid: 'test trigger',
        origin: 'fruiting_temp',
        target: 'fruiting_heater',
        state: true, 
        range: [-999, 200],
        color: '#7def71'
    }


]



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// warning: changes bellow could break software,
// understanding what you are doing, before changing anything.
////////////////////////////////////////////////////////////////////////////////
// don't do it if you don't understand it.
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////  


var board_bank = new Map()
var device_bank = new Map()
var cron_bank = new Map()
var trigger_bank = new Map()

//assemble into a map
boards.forEach(element => {
    board_bank.set(element.id, element)
});

//assemble into a map
devices.forEach(element => {
    device_bank.set(element.id, element)
});

//assemble into a map
CRONs.forEach(element => {
    cron_bank.set(element.id, element)
});

//assemble into a map
triggers.forEach(element => {
    trigger_bank.set(element.id, element)
});

//sort device.id's into the correct board.devices[]
board_bank.forEach(element => {
    board_id = element.id //grab current board id
    device_bank.forEach(element => { //for each device in the bank 
        deviceBoard_id = element.board //grab this.devices target board id
        device_id = element.id
        // console.log(device_id);
        if (deviceBoard_id === board_id ) { //if equal grab device and set it


            cron_bank.forEach(element => { //for each device in the bank 
                cron_id = element.target //grab this.devices target board id

                if (device_id === cron_id ) { //if equal grab device and set it
                    target_device = device_bank.get(device_id)
                    target_device.CRON.push(element)   
                }
            });

            trigger_bank.forEach(element => { //for each device in the bank 
                trigger_id = element.origin //grab this.devices target board id
                
                if (device_id === trigger_id ) { //if equal grab device and set it
                    target_device = device_bank.get(device_id)
                    target_device.triggers.push(element)   
                }
                // console.log('tested');
            });


            target_board = board_bank.get(board_id)
            target_board.devices.push(element)
        }
    });
});


// board_bank.forEach( device => {
//     // console.log(device.devices);
//     device.devices.forEach(target => {
//         // console.log(target.CRON);
//     });
// });

// console.log(board_bank.get('dev_test_board').devices[0].triggers);


module.exports = { board_bank };

