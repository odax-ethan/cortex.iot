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
    this.devicesLength = this.devices.length
    this.nodes = this.systemConfig.nodes
    this.nodesLength = this.nodes.length
    this.nodeCOUNT = this.nodes.length; // named nodeConfig length
    this.timerTESTrate = this.systemConfig.timerTESTrate


    // Create sorted Device banks
    this.thermometerList = [] // PARSED thermometer LIST
    this.relayList = [] // parsed Relay List

    for (var i = 0; i < this.devicesLength; i++) {
      switch (this.devices[i].deviceTYPE) {
        case 'thermometer':
            this.thermometerList.push({id:devices[i].deviceID, controller:devices[i].controller, pin: devices[i].devicePIN, board: devices[i].deviceNODE, freq: devices[i].freq})
          break;
        default:

      }
    }

  } // end of the constructor


  generateSystem(){

    switch (this.nodesLength) {
      case null:
            console.log("system is blank please set up nodes");
        break;
        case !null:
              console.log("system is connecting to nodes....");
              new five.Boards(this.nodes).on("ready", function() {

                // add repel comands to get systemConfig - reset db - ect.

                console.log("BOARD CONNECTED:");
                // Boards are initialized!

                // test sequence for relays
                // array of relay objects - with array of time state objects.


                // test for each instance of board test againt deveice generators
                this.each(function(board) {

                  // test generate list for thermometer class devices and create system
                   for (var i = 0; i < this.thermometerList.length; i++) {
                        if (this.thermometerList[i].board === board.id) {
                          let varname = this.thermometerList[i].id
                           // console.log(this.thermometerList[i]);
                           let value = new five.Thermometer({controller: this.thermometerList[i].controller, pin: this.thermometerList[i].pin, board:board, freq: this.thermometerList[i].freq});
                           this[varname] = value;
                           this[varname].on("data", function() {
                           // console.log(varname+ ": "+this.celsius + "°C");

                           // let transmitData = {deviceID: varname, value: this.celsius }
                           let transmitData = {deviceID: varname, value: this.fahrenheit }

                           sensorEmitter.emit('new', transmitData);
                             // console.log("0x" + this.address.toString(16));
                           });

                           console.log(`created the ${this.thermometerList[i].id} device for the ${board.id} node`);
                        } else {
                          console.log(`device was not create for the ${board.id} node`  );
                        }
                   }
                }); //end of each.board

              });

          break;
      default:

    }


  }

} // end of System Class


/////////////////////////////////////////////////////////////////////////////////

module.exports = { System, getSystemConfig, deleteSystemConfig };
