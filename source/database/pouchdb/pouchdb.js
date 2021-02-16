var PouchDB = require('pouchdb'); //pouchdb module

var localDB = new PouchDB('pouch_db_local', {auto_compaction: true} ); //record of each device by nID - nickname ID

//get system config from local history_DB
// if this is clean install ie. no ver. already exist from system_config.cortex.js
const Device_history_add = async (device_id, to_save) => {
  const result = await localDB.get(device_id).catch(function ( err) {
    
    //if the target device is not in the database create doc for it.
    if (err.name === 'not_found') {

      documentSchema = {
        _id: device_id,
        deviceID: device_id,
        eventHistory: []
      }

        //to save iteration push
      return documentSchema
    } else { // hm, some other error
      throw err;
    }

    //if device does exist go to next step

  }).then(function (doc) {

    //create a target 
    let target = doc
    
    //save eventHistory object
    target.eventHistory.push(to_save)
    
    //place entire doc back in database.
    return localDB.put(target).catch((err)=>{throw err})
    
  }).catch(function (err) {
    // handle any errors
    throw err;
});
return result
}

//get all data from history
const bulk_device_history = async () => {
  const result = await localDB.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    // handle result
    // console.log(result);

    var dataBundle = []

    result.rows.forEach(element => {
      dataBundle.push({deviceID: element.doc.deviceID, eventHistory: element.doc.eventHistory})
    });

    return dataBundle
  }).catch(function (err) {
    console.log(err);
  });
  return result
}

//get system config from local history_DB
// if this is clean install ie. no ver. already exist from system_config.cortex.js
const Set_Settings = async ( settings_bundle )  => {
  const result = await localDB.get('settings').catch(function ( err) {
    
    //if the target device is not in the database create doc for it.
    if (err.name === 'not_found') {
      documentSchema = {
        _id: 'settings',
        settings_OBJ : settings_bundle
      }

      return localDB.put(documentSchema).catch((err)=>{throw err})
    } else { // hm, some other error
      throw err;
    }

    //if device does exist go to next step

  }).then(function (doc) {

   //create a target 
   let target = doc
    
   //save eventHistory object
   target.settings_OBJ = settings_bundle
   
   //place entire doc back in database.
   return localDB.put(target).catch((err)=>{throw err})
  
  }).catch(function (err) {
    // handle any errors
    throw err;
});
return result
}

//get all data from history
const Get_Setting_OBJ = async () => {
  const result = await localDB.get('settings').then(function (doc) {
    // return settings object 
    return doc;
  }).catch(function (err) {
    console.log(err);
  });
  return result
}

module.exports = {Device_history_add, bulk_device_history, Set_Settings, Get_Setting_OBJ}