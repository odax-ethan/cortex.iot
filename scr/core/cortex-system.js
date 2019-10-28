// create masterdata Base
const EventEmitter = require('events');
const statusEmitter = new EventEmitter(); //create event for status

//sensor base event
statusEmitter.on('newEvent', (data) => {
  console.log(data);
  // statusEmitter.emit('sensor-socket-update', data)
})
//////////////////////////////////////////////////////////////////////////////////
var PouchDB = require('pouchdb');
const {systemConfigTemplate} = require('../config/systemConfig.js'); //cortex support components
//create database
var masterDB = new PouchDB('masterDB');

let getSystemConfig = masterDB.get('systemConfig').catch(function (err) {
   if (err.name === 'not_found') {
     // emit event - no System Config found -  creating a new a new system.
     statusEmitter.emit('newEvent', "no System Config found -  creating a new a new system.")
     //console.log(systemConfigTemplate);
     return masterDB.put(systemConfigTemplate)
   } else { // hm, some other error
     throw err;
   }
 }).then(function (doc) {
   // emit event - system variafied database and cortex may start
   statusEmitter.emit('newEvent', "system variafied database and cortex may start")
   return doc
 }).catch(function (err) {
   // handle any errors
   throw err;
 });


function deleteSystemConfig() {

  masterDB.get('systemConfig').then(function (doc) {
       statusEmitter.emit('newEvent', "deleted settings... to restore settings relaunch Cortex.iot")
      return masterDB.remove(doc);
  });

}


//////////////////////////////////////////////////////////////////////////////////
class System {
  constructor(data) {

  } // end of the constructor

  config(){
    return this.config
  }
} // end of Syetem Class
/////////////////////////////////////////////////////////////////////////////////

module.exports = { System, statusEmitter, getSystemConfig, deleteSystemConfig };
