const { Hardware_config } = require('./settings.pouchdb.js');
var PouchDB = require('pouchdb');
var historyDB = new PouchDB('history'); //record of each device by nID - nickname ID


//get system config from local history_DB
// if this is clean install ie. no ver. already exist from system_config.cortex.js
const Device_history_add = async (device_id, to_save) => {
  const result = await historyDB.get(device_id).catch(function ( err) {
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
  }).then(function (doc) {

    //define eventHistory.data
    // dataTarget = doc.eventHistory;
    // //push data to target
    // dataTarget.push(data);


    let target = doc
    
    target.eventHistory.push(to_save)

    historyDB.put(target)
    // console.log('new doc saved');
    // console.log(doc);
    
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
    console.log(result);
    return result
  }).catch(function (err) {
    console.log(err);
  });
  return result
}



module.exports = {Device_history_add, bulk_device_history}