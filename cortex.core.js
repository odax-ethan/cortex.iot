// network structure and services
const { serverStructure } = require('./source/network/server')
// initialize datase functionality 
const DATABASE = require('./source/database/handler')
// const { database_action } = require('./source/database/handler')


//define all databse settings based on .env db definition
const DB = new DATABASE.DATABASE(process.env.DATABASE)

// log your DB definition
DB.def();

DB.ADD_DEVICE_HISTORY('cool devices', { timeStamp: new Date(), data: 28329 } )
.then(data=>{console.log(`Data was successfully logged for ${data.id}`);})
.catch((err)=>{throw err})

DB.GET_ALL_HISTORY()
.then(history=>{console.log(history);})
.catch((err)=>{throw err})





// start network services based on .env variables
serverStructure();