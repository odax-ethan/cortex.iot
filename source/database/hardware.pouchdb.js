const { Hardware_config } = require('./settings.pouchdb.js');
var PouchDB = require('pouchdb');
var db = new PouchDB('history'); //record of each device by nID - nickname ID


//get system config from local db
// if this is clean install ie. no ver. already exist from system_config.cortex.js
const Device_history_add = async (device_id, to_save) => {
    await db.get(device_nid).catch(function (err) {
       if (err.name === 'not_found') {

        //device history event save schema

        var deviceHistorySchema = {
          nid: device_id,
          deviceHistory =[]
        }


         return system_config
       } else { // hm, some other error
         throw err;
       }
     }).then(function (configDoc) {
       // sweet, here is our configDoc
       console.log(configDoc);





       return configDoc
     }).catch(function (err) {
       // handle any errors
       throw err;
   });
}
 