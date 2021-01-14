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
      port: "COM4",
      color: "#AAA9E6",
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

    // { //TEST fruiting chamber humidity
    //     id:'fruiting_tent_humidity', 
    //     nid:'Fruiting Environment Humidity', 
    //     class:'hygrometer',
    //     controller: 'SHT31D',
    //     board:'fruiting_tent',
    //     color: '#d82c2c',
    //     triggers: []
    // },

    // { //TEST fruiting environment humidity
    //     id:'fruiting_enviro_humidity', 
    //     nid:'Fruiting Environment Humidity', 
    //     class:'hygrometer',
    //     controller: 'SHT31D',
    //     board:'fruiting_tent',
    //     color: '#d82c2c',
    //     triggers: []
    // },

    // { //TEST fruiting tent temperature
    //     id:'fruiting_tent_temp', 
    //     nid:'Fruiting Tent Temperature', 
    //     class:'thermometer',
    //     controller: 'DS18B20',
    //     pin: '11',
    //     board:'fruiting_tent',
    //     color: '#d82c2c',
    //     triggers: []
    // },

    // { //TEST fruiting environment temperature
    //     id:'fruiting_enviro_temp', 
    //     nid:'Fruiting Environment Temperature', 
    //     class:'thermometer',
    //     controller: 'DS18B20',
    //     pin: '10',
    //     board:'fruiting_tent',
    //     color: '#d82c2c',
    //     triggers: []
    // },


    //TEST fruiting chamber fan relay
    // { 
    //     id:'fruiting_tent_fan', 
    //     nid:'Fruiting Duct-Tent Fan', 
    //     class:'relay',
    //     pin: 7,
    //     type: 'NO',
    //     board:'fruiting_tent',
    //     color: "#5647FF",
    //     CRON: []
    // },


    //TEST fruiting chamber humidifier relay
    // { 
    //     id:'fruiting_tent_humidifier', 
    //     nid:'Fruiting Tent Humidifier', 
    //     class:'relay',
    //     pin: 6,
    //     type: 'NO',
    //     board:'fruiting_tent',
    //     color: "#5647FF",
    //     CRON: []
    // },

    //TEST fruiting chamber light relay
    { 
        id:'fruiting_tent_light', 
        nid:'Fruiting Tent Light', 
        class:'relay',
        pin: 2,
        type: 'NO',
        board:'fruiting_tent',
        color: "#5647FF",
        CRON: []
    },

    //Hygrometer
    // { 
    //     id:'fruiting_temp', 
    //     nid:'Fruiting Temp', 
    //     class:'hygrometer',
    //     controller: 'SHT31D',
    //     board:'fruiting_tent',
    //     color: '#d82c2c'
    // },

    //LED
    // { 
    //     id:'led',
    //     nid: 'test led',
    //     class:'led',
    //     pinL: 13,
    //     board:'fruiting_tent',
    //     color: '#d82c2c'
    // },

    // TEMPERATURE
    // { 
    //     id:'fruiting_tent_temp', 
    //     nid:'Fruiting Environment Temperature', 
    //     class:'thermometer',
    //     controller: 'DS18B20',
    //     pin: '8',
    //     board:'fruiting_tent',
    //     color: '#d82c2c',
    //     triggers: [] // Do NOT manually Add triggers here
    // },

    // RELAY
    // { 
    //     id:'fruiting_heater', 
    //     nid:'heater', 
    //     class:'relay',
    //     pin: 13,
    //     type: 'NO',
    //     board:'fruiting_tent',
    //     color: "#5647FF",
    //     CRON: [] // Do NOT manually Add CRONs here
    // },

]


////////////////////////////////////////////////////////////////////////////////
// event schedular / CRON
////////////////////////////////////////////////////////////////////////////////

//create a cron system for on/off schedualled events

CRONs = [
 
    // //burst cron
    // {
    //     id: 'test_cron',
    //     nid: 'test cron',
    //     target: 'fruiting_tent_light',
    //     type: 'burst',
    //     shape: ' 15 * * * * * ',
    //     length: 5000,
    //     color: '#7def71'
    // },

    // //on/off cron
    // {
    //     id: 'light_test_cron',
    //     nid: 'light cron',
    //     target: 'fruiting_tent_light',
    //     type: 'on/off',
    //     shape: [' * * 8 * * * ' , ' * * 20 * * * '],
    //     color: '#7def71'
    // }

    //on/off cron
    {
        id: 'light_test_cron',
        nid: 'light cron',
        target: 'fruiting_tent_light',
        type: 'on/off',
        shape: [' 15 * * * * * ' , ' 45 * * * * * '],
        color: '#7def71'
    }

]



////////////////////////////////////////////////////////////////////////////////
// triggers: Me and my tiggers
////////////////////////////////////////////////////////////////////////////////

triggers = [

    //humidifier system trigger
    // {
    //     id: 'humidifier_fan',
    //     nid: 'Humidifier Fan Trigger',
    //     origin: 'fruiting_tent_humidity',
    //     target: 'fruiting_tent_fan',
    //     state: false, 
    //     range: [-999, 94],
    //     color: '#7def71'
    // },

    //humidifier system trigger
    // {
    //     id: 'humidifier_ultrasonic_device',
    //     nid: 'Humidifier Fan Trigger',
    //     origin: 'fruiting_tent_humidity',
    //     target: 'fruiting_tent_humidifier',
    //     state: false, 
    //     range: [-999, 94],
    //     color: '#7def71'
    // }


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

