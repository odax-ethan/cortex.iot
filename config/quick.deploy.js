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
      id: 'test_board',
      nid: 'test board',
      port: "COM3",
      color: "#0078ff",
      devices: [] // don't add to array
    }
  ]



////////////////////////////////////////////////////////////////////////////////
// device
////////////////////////////////////////////////////////////////////////////////

// starter template:
// edit this for quick deployment of a predefined system.
// you do not define freq -> the system will use the system_master_freq

const devices = [

    // 2 relays - 1 light - fan/humidifier
    // 2 temp sensors - main room - fruiting chamber
    // 2 hygrometer - main room - fruiting chamber


    { //TEST fruiting chamber fan relay
        id:'water_level_trigger', 
        nid:'water float', 
        class:'switch', // relay class
        pin: '7', // digital or analog pin
        board:'test_board',
        color: "#0078ff",
        trigger: [] //do not manually add
    },




]


////////////////////////////////////////////////////////////////////////////////
// event schedular / CRON
////////////////////////////////////////////////////////////////////////////////

//create a cron system for on/off schedualled events

CRONs = [
    
]



////////////////////////////////////////////////////////////////////////////////
// triggers: Me and my tiggers
////////////////////////////////////////////////////////////////////////////////

triggers = [


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

// console.log(board_bank.get('fruiting_tent').devices[0].triggers);


module.exports = { board_bank };

