var PouchDB = require('pouchdb');
var db = new PouchDB('settings');
const { system_config } = require('../../config/system_config.cortex.js');
const { board_bank } = require('../../config/quick.deploy.js');

//get system config from local db
// if this is clean install ie. no ver. already exist from system_config.cortex.js
const System_config = async () => {
   const result = await db.get('system_config').catch(function (err) {
      if (err.name === 'not_found') {
        console.log('new setting system');
        //make changes act you need to put here
        return system_config
      } else { // hm, some other error
        throw err;
      }
    }).then(function (configDoc) {
      // sweet, here is our configDoc
      // console.log(configDoc);
      return configDoc
    }).catch(function (err) {
      // handle any errors
      throw err;
  });

  return result

}

//check for config- if none use quick deploy - if there is one update to ubject
const System_config_update = async () => {
  await db.get('system_config').catch(function (err) {
     if (err.name === 'not_found') {
       return system_config
     } else { // hm, some other error
       throw err;
     }
   }).then(function (configDoc) {
     // sweet, here is our configDoc
     // console.log(configDoc);
     return configDoc
   }).catch(function (err) {
     // handle any errors
     throw err;
 });
}

//get system config from local db
// if this is clean install ie. no ver. already exist from hardware_config in quick.deploy.js
const Hardware_config = async () => {
  const result = await db.get('board_bank').catch(function (err) {
     if (err.name === 'not_found') {
       console.log('new setting hardware');
       //make changes act you need to put here
       return board_bank
     } else { // hm, some other error
       throw err;
     }
   }).then(function (configDoc) {
     // sweet, here is our configDoc
    //  console.log(configDoc);
     return configDoc
   }).catch(function (err) {
     // handle any errors
     throw err;
 });

 return result

}

//check for config- if none use quick deploy - if there is one update to ubject
const Hardware_config_update = async () => {
  await db.get('board_bank').catch(function (err) {
     if (err.name === 'not_found') {
       return board_bank
     } else { // hm, some other error
       throw err;
     }
   }).then(function (configDoc) {
     // sweet, here is our configDoc
     // console.log(configDoc);
     return configDoc
   }).catch(function (err) {
     // handle any errors
     throw err;
 });
}



module.exports = { System_config, Hardware_config }

