// this contains the database.
// this contains the logic which triggers events in Johnny-Five
var five = require("johnny-five");


const { relayerTimerTest, timerLogicTester } = require('./cortex-logic.js'); //cortex events / listeners components
const { statusEmitter } = require('./cortex-events.js'); //cortex events / listeners components
const PouchDB = require('pouchdb');
const {systemConfigTemplate} = require('../config/systemConfig.js'); //cortex support components

//create database
var masterDB = new PouchDB('masterDB');

//////////////////////////////////////////////////////////////////////////////////

//get system Settings
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
  constructor(systemConfig) {
    this.systemConfig = systemConfig
    this.devices = this.systemConfig.devices
    this.nodes = this.systemConfig.nodes
    this.nodeCOUNT = this.nodes.length; // named nodeConfig length
    this.timerTESTrate = this.systemConfig.timerTESTrate


  } // end of the constructor


  generator(){

    new five.Boards(this.nodes).on("ready", function() {

      console.log("BOARD CONNECTED:");
      // Boards are initialized!

      // test sequence for relays
      // array of relay objects - with array of time state objects.
      






    });

  }

} // end of Syetem Class


/////////////////////////////////////////////////////////////////////////////////

module.exports = { System, getSystemConfig, deleteSystemConfig };
