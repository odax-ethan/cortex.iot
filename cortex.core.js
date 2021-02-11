// network structure and services
const { serverStructure } = require('./source/network/server')
// initialize datase functionality 
const DATABASE = require('./source/database/handler')
// const { database_action } = require('./source/database/handler')


//define all databse settings based on .env db definition
const DB = new DATABASE.DATABASE(process.env.DATABASE)

// serverStructure(); // start network services


// setTimeout(() => {

//     database_action('ADD_DEVICE_HISTORY', 'myDeviceID', { timeStamp: new Date(), data: 28329 } )
//     database_action('GET_ALL_HISTORY').then(function (doc) {
//         console.log(doc);
//     });
// }, 2000);



DB.def();

// setTimeout(() => {

    DB.ADD_DEVICE_HISTORY('mydeviceID', { timeStamp: new Date(), data: 28329 } ).then(data=>{console.log(data);}).catch((err)=>{throw err})
    DB.GET_ALL_HISTORY().then(data=>{console.log(data);}).catch((err)=>{throw err})


// }, 2000);