// this contains the database.
// this contains the logic which triggers events in Johnny-Five
var five = require("johnny-five");


const { relayerTimerTest, timerLogicTester } = require('./cortex-logic.js'); //cortex events / listeners components
const { systemEmitter } = require('./cortex-events.js'); //cortex events / listeners components
const PouchDB = require('pouchdb');
const {systemConfigTemplate} = require('../config/systemConfig.js'); //cortex support components

//create database
var masterDB = new PouchDB('masterDB');

//////////////////////////////////////////////////////////////////////////////////

//get system Settings
let getSystemConfig = masterDB.get('systemConfig').catch(function (err) {
   if (err.name === 'not_found') {
     // emit event - no System Config found -  creating a new a new system.
     systemEmitter.emit('newEvent', "no System Config found -  creating a new a new system.")
     //console.log(systemConfigTemplate);
     return masterDB.put(systemConfigTemplate)
   } else { // hm, some other error
     throw err;
   }
 }).then(function (doc) {
   // emit event - system variafied database and cortex may start
   systemEmitter.emit('newEvent', "system variafied database and cortex may start")
   return doc
 }).catch(function (err) {
   // handle any errors
   throw err;
 });


function resetSystemConfig() {
  masterDB.get('systemConfig').then(function (doc) {
       systemEmitter.emit('newEvent', "deleted settings... to restore settings relaunch Cortex.iot")
       return masterDB.remove(doc);
  });


  masterDB.get('systemConfig').catch(function (err) {
     if (err.name === 'not_found') {
       // emit event - no System Config found -  creating a new a new system.
       systemEmitter.emit('newEvent', "no System Config found -  creating a new a new system.")
       //console.log(systemConfigTemplate);
       return masterDB.put(systemConfigTemplate)
     } else { // hm, some other error
       throw err;
     }
   }).then(function (doc) {
     // emit event - system variafied database and cortex may start
     systemEmitter.emit('newEvent', "system Configuration has been reset")
     setTimeout(function () {

     }, 3525);
     return doc
   }).catch(function (err) {
     // handle any errors
     throw err;
   });
}


function createNode(newDataOBJ) {
  masterDB.get('systemConfig').catch(function (err) {
     if (err.name === 'not_found') {
       // emit event - no System Config found -  creating a new a new system.
       systemEmitter.emit('newEvent', "no System Config found -  creating a new a new system.")
       //console.log(systemConfigTemplate);
       return masterDB.put(systemConfigTemplate)
     } else { // hm, some other error
       throw err;
     }
   }).then(function (doc) {
     var nodeAraay = doc.nodes
     nodeAraay.push(newDataOBJ)
     doc.nodes = nodeAraay
     masterDB.put(doc)
     // emit event - system variafied database and cortex may start
     systemEmitter.emit('newEvent', `added new Node: ${newDataOBJ.id}`)
     return doc
   }).catch(function (err) {
     // handle any errors
     throw err;
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
  } // end of the constructor


  generateSystem(){

    // Create sorted Device banks
    var thermometerList = [] // PARSED thermometer LIST
    var relayList = [] // parsed Relay List

    for (var i = 0; i < this.devicesLength; i++) {
      switch (this.devices[i].deviceTYPE) {
        case 'thermometer':
            thermometerList.push({id:this.devices[i].deviceID, controller:this.devices[i].controller, pin: this.devices[i].devicePIN, board: this.devices[i].deviceNODE, freq: this.devices[i].freq})
            //console.log("thermometer worked");
          break;
        case 'relay':
            relayList.push({id:this.devices[i].deviceID, pin: this.devices[i].devicePIN, board: this.devices[i].deviceNODE, relayType: this.devices[i].relayType })
            //console.log("thermometer worked");
          break;
        default:
         console.log("this failed");
      }
    }



    // console.log("hi");

    if (this.nodesLength === null) {
        console.log("system is blank please set up nodes");
    } else if (true) {
      console.log("system is connecting to nodes....");
      new five.Boards(this.nodes).on("ready", function() {

        // add repel comands to get systemConfig - reset db - ect.

        console.log("BOARD CONNECTED:");
        // Boards are initialized!

        // test sequence for relays
        // array of relay objects - with array of time state objects.


        // test for each instance of board test againt deveice generators
        this.each(function(board) {

          // console.log(thermometerList);

        //  test generate list for thermometer class devices and create system
           for (var i = 0; i < thermometerList.length; i++) {
                if (thermometerList[i].board === board.id) {
                  var varname = thermometerList[i].id
                   // console.log(thermometerList[i]);
                   var value = new five.Thermometer({controller: thermometerList[i].controller, pin: thermometerList[i].pin, board:board, freq: thermometerList[i].freq});
                   this[varname] = value;
                   this[varname].on("data", function() {
                   // console.log(varname+ ": "+this.celsius + "°C");

                   // let transmitData = {deviceID: varname, value: this.celsius }
                   var transmitData = {deviceID: varname, value: this.fahrenheit }

                   systemEmitter.emit('new', transmitData);
                     // console.log("0x" + this.address.toString(16));
                   });

                   console.log(`created the ${thermometerList[i].id} device for the ${board.id} node`);
                } else {
                  console.log(`device was not create for the ${board.id} node`  );
                }
           } // end of thermometer


         //  test generate list for relay class devices and create system
            for (var i = 0; i < relayList.length; i++) {
                 if (relayList[i].board === board.id) {
                    var  varname = relayList[i].id
                    var  relayType = relayList[i].relayType
                    // console.log(relayList[i]);
                    var value = new five.Relay({pin: relayList[i].pin, board: board , type: relayType });
                    this[varname] = value;
                    var targte+i = this[varname]
                    var targetName = `relay-state-${varname}`
                    // console.log(targetName);

                    systemEmitter.on( targetName, function(eventType) {
                        // console.log("system trigger relay");
                        // console.log(eventType);
                        // console.log(this[varname]);
                        // console.log(target);

                        switch ( eventType ) {
                         case "overRide":
                                  console.log("overriding " + varname);
                                  // console.log(target);
                                  target[i].toggle()
                            break;

                          case "timer":

                            break;
                          case "burst":

                            break;
                          default:

                        }


                        // switch (data.state) {
                        //   case "ON":
                        //
                        //   // check if relay is already on on
                        //   // if already on do nothing
                        //   // if it is not on turn on .
                        //
                        //
                        //
                        //     break;
                        //   case "OFF":
                        //
                        //   // check if relay is already OFF
                        //   // if already off do nothing
                        //   // if it is not on turn on.
                        //
                        //     break;
                        //   default:
                        //
                        // }



                        // switch (relayType) {
                        //   case "NO":
                        //         switch (data) {
                        //           case "ON":
                        //
                        //             break;
                        //           case "OFF":
                        //
                        //             break;
                        //           default:
                        //
                        //         } // end of Normally OPEN Relay ACTION
                        //     break;
                        //   case "NC":
                        //         switch (data) {
                        //           case "ON":
                        //
                        //             break;
                        //           case "OFF":
                        //
                        //             break;
                        //           default:
                        //
                        //         } // end of Normally CLOSED Relay ACTION
                        //     break;
                        //   default:
                        //
                        // }

                    })

                    console.log(`created the ${relayList[i].id} device for the ${board.id} node @ pin ${relayList[i].pin} (relay)`);
                 } else {
                   console.log(`device was not create for the ${board.id} node`  );
                 }
            } // end of relay



        }); //end of each.board

      });
    }


  }

} // end of System Class


/////////////////////////////////////////////////////////////////////////////////

module.exports = { System, getSystemConfig, resetSystemConfig, createNode };
