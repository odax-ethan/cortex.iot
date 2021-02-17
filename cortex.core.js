// bring in and activate 
const { systemEmitter } = require('./source/util/emitter/systemEmitter') 
// network structure and services
const { serverStructure } = require('./source/network/server')
// initialize datase functionality 
const DATABASE = require('./source/database/handler')

//define all databse settings based on .env db definition
const DB = new DATABASE.DATABASE(process.env.DATABASE)
module.exports = { DB } // export DB class to access through out cortex

DB.def(); // log your DB definition

//how you log data to a deviceID
// DB.ADD_DEVICE_HISTORY('cool devices', { timeStamp: new Date(), data: 28329 } )
// .then(data=>{console.log(`Data was successfully logged for ${data.id}`);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_ALL_HISTORY()
// .then(history=>{console.log(history);})
// .catch((err)=>{throw err})

//how you log data to a deviceID
// DB.SET_SETTINGS( { mysettings: new Date(), systemSettings1 : 123889 } )
// .then(()=>{console.log(`Settings have been Saved`);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_SETTINGS()
// .then(settings=>{console.log(settings);})
// .catch((err)=>{throw err})


//how you log data to a deviceID
// DB.SET_DEVICEBANK( [{board: 'mytestboard', devices:[{deviceID: 'myTestDevice'}]},{board: 'mytestboard1', devices:[{deviceID: 'myTestDevice1'}]}] )
// .then(()=>{console.log(`deviceBank has been Saved`);})
// .catch((err)=>{throw err})

// how to get all device data
// DB.GET_DEVICEBANK()
// .then(deviceBank=>{console.log(deviceBank);})
// .catch((err)=>{throw err})


// start network services based on .env variables
serverStructure(DB);