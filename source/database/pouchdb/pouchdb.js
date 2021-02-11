



var PouchDB = require('pouchdb'); //pouchdb module

var historyDB = new PouchDB('pouch_db_local'); //record of each device by nID - nickname ID


//get system config from local history_DB
// if this is clean install ie. no ver. already exist from system_config.cortex.js
const Device_history_add = async (device_id, to_save) => {
  const result = await historyDB.get(device_id).catch(function ( err) {
    
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
    historyDB.put(target).catch((err)=>{throw err})
    
    return doc
    
  }).catch(function (err) {
    // handle any errors
    throw err;
});
return result
}


//get all data from history
const bulk_device_history = async () => {
  const result = await historyDB.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    // handle result
    // console.log(result);
    return result
  }).catch(function (err) {
    console.log(err);
  });
  return result
}


//get system config from local history_DB
// if this is clean install ie. no ver. already exist from system_config.cortex.js
const Set_Settings = async ( settings_bundle )  => {
  const result = await historyDB.get('settings').catch(function ( err) {
    
    //if the target device is not in the database create doc for it.
    if (err.name === 'not_found') {
      documentSchema = {
        _id: settings,
        settings_OBJ : {}
      }

        //to save iteration push
      return documentSchema
    } else { // hm, some other error
      throw err;
    }

    //if device does exist go to next step

  }).then(function (doc) {

    //create a copy of orginal doc
    let target = doc
    
    //save eventHistory object by replacing old settinsg obj
    target.settinsg_OBJ = settings_bundle

    //place entire doc back in database replacing old entire old doc.
    historyDB.put(target)
    
    return doc
  }).catch(function (err) {
    // handle any errors
    throw err;
});
return result
}


//get all data from history
const Get_Setting_OBJ = async () => {
  const result = await historyDB.get('settings').then(function (doc) {
    // return settings object 
    return doc.settings_OBJ;
  }).catch(function (err) {
    console.log(err);
  });
  return result
}



module.exports = {Device_history_add, bulk_device_history, Set_Settings, Get_Setting_OBJ}