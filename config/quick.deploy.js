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
      id: 'fruiting_tent',
      nid: 'Fruiting Tent',
      port: "/dev/ttyACM0",
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


    // relays

    { //fruiting chamber light relay
        id:'tent_light_relay', 
        nid:'Tent Grow Light', 
        class:'relay', // relay class
        pin: '2', // digital or analog pinv
        type: 'NC', // either NO or NC 
        board:'fruiting_tent',
        color: "#ff8e51",
        CRON: [] //do not manually add
    },

    { // fruiting chamber fan/humidifier relay
        id:'input_air_relay', 
        nid:'Fan + Humidifier', 
        class:'relay', // relay class
        pin: '3', // digital or analog pin
        type: 'NC', // either NO or NC 
        board:'fruiting_tent',
        color: "#71ffad",
        CRON: [] //do not manually add
    },

    // thermometers

    { // fruiting environment temperature main space
        id:'temp_main_space', 
        nid:'Main Space Temp', 
        class:'thermometer', // thermometer class
        controller: 'DS18B20', //examples controller 
        pin: '8', // input digital pin
        board:'fruiting_tent',
        color: '#83baf8',
        triggers: [] //do not manually add
    },

    { // fruiting environment temperature fruiting tent
        id:'temp_fruiting_tent', 
        nid:'Fruiting Tent Temp', 
        class:'thermometer', // thermometer class
        controller: 'DS18B20', //examples controller 
        pin: '7', // input digital pin
        board:'fruiting_tent',
        color: '#f672b2v',
        triggers: [] //do not manually add
    },

    //hygrometer

    { //main room hygrometer
        id:'hygro_main_room', 
        nid:'Main Room Humidity', 
        class:'hygrometer', // hygrometer class
        controller: 'SHT31D', //examples controller uses i2c no pins need to be defined
        board:'fruiting_tent',
        color: '#fa7d7d',
        triggers: []  //do not manually add
    },

    { // fruiting tent hygrometer
        id:'hygro_fruiting_tent', 
        nid:'Fruiting Tent Humidity', 
        class:'hygrometer', // hygrometer class
        controller: 'SHT31D', //examples controller uses i2c no pins need to be defined
        board:'fruiting_tent',
        color: '#f6de80',
        triggers: []  //do not manually add
    },



]


////////////////////////////////////////////////////////////////////////////////
// event schedular / CRON
////////////////////////////////////////////////////////////////////////////////

//create a cron system for on/off schedualled events

CRONs = [
 
    {
       id:'light_cycle_cron', 
       nid:'Light Cycle CRON',
       target: 'tent_light_relay',
       type: 'on/off',
       shape: ['0 6 * * *' , '0 23 * * *'],
       color: '#0dce8b'
   },

    {
        id:'humidity-cycle-0', 
        nid:'Fan/Humidity Cycle',
        target: 'input_air_relay',
        type: 'burst',
        shape: '30 */7 * * * *',
        length: 120000,
        color: '#0dce8b'
    }
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

