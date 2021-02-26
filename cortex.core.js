// initialize datase functionality 
const DATABASE = require('./source/database/handler')
//define all databse settings based on .env db definition
const DB = new DATABASE.DATABASE(process.env.DATABASE)
module.exports = { DB } // export DB class to access through out cortex
// before moving on create a instance of DB 




// bring in and activate with db connections and logger
const { systemEmitter } = require('./source/util/emitter/systemEmitter') 
// network structure and services
const { serverStructure } = require('./source/network/server')
//include Cortex.iot device bank shaper
const {DEVICEBANK} = require('./source/hardware/device_bank.js')

// how to trigger  base event or warning
// systemEmitter.emit('event','core','OK', 'system has booted and loaded core modules')

// how to trigger  hardware event or warning
// setInterval(() => {
//     systemEmitter.emit('event', 'cool devices', 'hardware','OK', { timeStamp: new Date(), data: 28329 })
// }, 2000);

DB.def(); // log your DB definition

//how you log data to a deviceID
// DB.ADD_DEVICE_HISTORY('cool devices', { timeStamp: new Date(), data: 28329 } )
// .then(data=>{console.log(`Data was successfully logged for ${data.id}`);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_ALL_HISTORY()
// .then(history=>{console.log(history);})
// .catch((err)=>{throw err})

// how you log data to a deviceID
// DB.SET_SETTINGS( { mysettings: new Date(), systemSettings1 : 123889 } )
// .then(()=>{console.log(`Settings have been Saved`);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_SETTINGS()
// .then(settings=>{console.log(settings);})
// .catch((err)=>{throw err})

// var test_shape = [
//     {
//         "uid": "test-1",
//         "nid": "testy-1",
//         "port": "COM3",
//         "product_id": "pi_2",
//         "color": "#F80",
//         "comment": "comment",
//         "devices": [
//             {
//                 "uid": "4123213",
//                 "nid": "123213",
//                 "color": "#0AA",
//                 "comment": "3213",
//                 "board": "test-1",
//                 "class": "relay",
//                 "type": "NO",
//                 "pin": "13"
//             }
//         ]
//     }
// ]

//how you log data to a deviceID
// DB.SET_DEVICEBANK( test_shape )
// .then(()=>{console.log(`deviceBank has been Saved`);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_DEVICEBANK()
// .then(deviceBank=>{console.log(deviceBank);})
// .catch((err)=>{throw err})


//how you log data to a deviceID
// DB.ADD_EVENT( {event:'something', details: 'more'} )
// .then(()=>{console.log(`An event has been Saved`);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_EVENTS()
// .then(events=>{console.log(events);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_TARGET_HISTORY('cool devices')
// .then(target_history=>{console.log(target_history);})
// .catch((err)=>{throw err})

//destroy entire db no undo
// DB.NUKE().then((result)=>{console.log(result);})
// .catch((err)=>{throw err})


// access deviceBank
let deviceBank = new DEVICEBANK(true)
// deviceBank.us_quick_deploy_shape()
deviceBank.us_database_shape()


setTimeout(() => {
    console.log(deviceBank.shape);
    console.log(deviceBank.get_boards_devices());
}, 2000);

// start network services based on .env variables
serverStructure(DB);