// this contains the database.
// this contains the logic which triggers events in Johnny-Five
var five = require("johnny-five");
'use strict';

const { relayerTimerTest, timerLogicTester } = require('./cortex-logic.js'); //cortex events / listeners components
const { systemEmitter } = require('./cortex-events.js'); //cortex events / listeners components
const { looper } = require('./cortex-logic.js'); //cortex events / listeners components
const PouchDB = require('pouchdb');
const {systemConfigTemplate} = require('../config/systemConfig.js'); //cortex support components
const CronJob =  require('cron').CronJob;


//create database
const masterDB = new PouchDB('masterDB');
//////////////////////////////////////////////////////////////////////////////////

//get system Settings
let getSystemConfig = masterDB.get('systemConfig').catch(function (err) {
   if (err.name === 'not_found') {
     // emit event - no System Config found -  creating a new a new system.
     systemEmitter.emit('newEvent', "no System Config found -  creating a new a new system.")
     console.log(systemConfigTemplate);
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

function recordEvent(newEventRecord) {
  masterDB.get('eventRecords').catch(function (err) {
     if (err.name === 'not_found') {
       // emit event - no System Config found -  creating a new a new system.
       systemEmitter.emit('newEvent', "no event records founds - creating a record template")
       //console.log(systemConfigTemplate);
       var template = {events:[]}
       return masterDB.put(template)
     } else { // hm, some other error
       throw err;
     }
   }).then(function (doc) {

console.log(doc);
     // var eventsArray = doc.events
     // eventsArray.push(newEventRecord)
     // doc.events = eventsArray
     // masterDB.put(doc)
     // // emit event - system variafied database and cortex may start
     // systemEmitter.emit('newEvent', `recorded new event: ${newEventRecord.eventTitle}`)
     return doc
   }).catch(function (err) {
     // handle any errors
     throw err;
   });
}


function getEventRecords() {
 masterDB.get('eventRecords').catch(function (err) {
     if (err.name === 'not_found') {
       // emit event - no System Config found -  creating a new a new system.
       systemEmitter.emit('newEvent', "no event records")
       //console.log(systemConfigTemplate);
       return
     } else { // hm, some other error
       throw err;
     }
   }).then(function (doc) {
     // emit event - system variafied database and cortex may start
     var recordsBundle = []
     for (var i = 0; i < 10; i++) {
       recordsBundle.push(doc.events[i])
     }
     systemEmitter.emit('newEvent', "system variafied database and cortex may start")
     return recordsBundle
   }).catch(function (err) {
     // handle any errors
     throw err;
   });
}



// function saveSensorDataFor(data) {
//           let deviceID = data.deviceID
//           let sensorData = data.data
//           let timeStamp = data.timeStamp
//           let dataBundle = {data:sensorData,timeStamp: timeStamp}
//
//         console.log(data);
//
//          masterDB.get(deviceID).catch(function (err) {
//                if (err.name === 'not_found') {
//                  console.log("no record found, making a full record");
//                  var newData = {
//                    _id: deviceID,
//                    deviceID : deviceID,
//                    data : [{data:sensorData, timestamp:timestamp}]
//                  };
//                  console.log(newData);
//                  return masterDB.put(newData)
//                } else { // hm, some other error
//                  throw err;
//                }
//              }).then(function (doc) {
//                 // let bundle = doc
//                 // // let arrayBundle = bundle.data
//                 // let dataBundle = {data:sensorData, timestamp:timestamp}
//                 // // arrayBundle.push(dataBundle)
//                 // bundle.data.push(dataBundle)
//                 // // masterDB.put(bundle)
//                 // console.log(bundle);
//                 // console.log(doc);
//
//
//
//                let data = doc.data
//                data.push(doc.data)
//                doc.data = data
//                return masterDB.put(doc)
//
//              }).catch(function (err) {
//                // handle any errors
//              });
//
// }




// sensor base event
systemEmitter.on('newthermometerData', (data) => {
  //parse recieved data
  // console.log(data);

  //define deviceTarget
  var deviceID = data.deviceID
  var sensorData = data.data
  var timeStamp = data.timeStamp
  //create databundle object for storage
  var dataBundle = {data:sensorData,timeStamp: timeStamp}
  // console.log(dataBundle);

  // saveDeviceData = ( deviceID , dataBundle ) => {
  //
  //     // doc template for saving if their is no other doc for the sensor
  //     //save data to database
  //
  //   }
  //
  // saveDeviceData(deviceID , dataBundle)

  masterDB.get(deviceID).catch(function (err) {
      if (err.name === 'not_found') {
        console.log("no record found, making a full record");
        // console.log(template);

        var template = {
           _id: deviceID,
          deviceID : deviceID,
          data : [dataBundle]
        };

        console.log(template);
        return masterDB.put(template)
      } else { // hm, some other error
        throw err;
      }
    }).then(function (doc) {
        // console.log("saved");
         var data = doc.data
         data.push(dataBundle)
         doc.data = data
         // console.log(doc);
         return masterDB.put(doc)
   }).catch(function (err) {
      // handle any errors

    });



  systemEmitter.emit('thermometerData-update-socket', data)
  // sensorEmitter.emit('sensor-db-update', data)
  systemEmitter.emit('newEvent', `saved data for ${deviceID}` )

})



// console.log('Before job instantiation');
const dbCleanUp = new CronJob('* 2 * * * *', function() {
  masterDB.compact().then(function (result) {
      // handle result
        console.log("db compacted");
    }).catch(function (err) {
      console.log(err);
  });
  masterDB.viewCleanup().then(function (result) {
    console.log("db cleaned");
  }).catch(function (err) {
    console.log(err);
  });

});

dbCleanUp.start();

// 3600000


// function getSensorDataFor(deviceID) {
//   masterDB.get(deviceID).catch(function (err) {
//           if (err.name === 'not_found') {
//             console.log("no record found");
//           } else { // hm, some other error
//             throw err;
//           }
//         }).then(function (doc) {
//           // console.log(doc);
//           return doc
//         }).catch(function (err) {
//           // handle any errors
//         });;
// }

//////////////////////////////////////////////////////////////////////////////////


class System {
  constructor(systemConfig) {
    this.systemConfig = systemConfig
    this.devices = this.systemConfig.devices
    this.devicesLength = this.devices.length
    this.nodes = this.systemConfig.nodes
    this.nodeBundle = this.nodes
    this.nodesLength = this.nodes.length
    this.nodeCOUNT = this.nodes.length; // named nodeConfig length
    this.timerTESTrate = this.systemConfig.timerTESTrate
  } // end of the constructor


  generateSystem(){

    // Create sorted Device banks
     let  thermometerList = [] // PARSED thermometer LIST
     let  relayList = [] // parsed Relay List
     let  testRate = this.timerTESTrate

    for (var i = 0; i < this.devicesLength; i++) {
      switch (this.devices[i].deviceTYPE) {
        case 'thermometer':
            thermometerList.push({id:this.devices[i].deviceID, controller:this.devices[i].controller, pin: this.devices[i].devicePIN, board: this.devices[i].deviceNODE, freq: this.devices[i].freq})
            //console.log("thermometer worked");
          break;
        case 'relay':
            relayList.push({id:this.devices[i].deviceID, pin: this.devices[i].devicePIN, board: this.devices[i].deviceNODE, relayType: this.devices[i].relayType, timers: this.devices[i].timers})
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
                   let varname = thermometerList[i].id
                   // console.log(thermometerList[i]);
                   // console.log(testRate);
                   var value = new five.Thermometer({controller: thermometerList[i].controller, pin: thermometerList[i].pin, board:board, freq: testRate});
                   this[varname] = value;

                   this[varname].on("data", function() {
                   // console.log(varname+ ": "+this.celsius + "°C");

                   // let transmitData = {deviceID: varname, value: this.celsius }
                   // var dataBundle = {deviceID: varname, data: this.fahrenheit, timeStamp: new Date()}
                   // saveSensorDataFor(dataBundle)
                   // systemEmitter.emit('newEvent', `sensor ${varname} read`)
                   // data is saved in event scope
                   systemEmitter.emit('newthermometerData', {deviceID: varname, data: this.fahrenheit, timeStamp: new Date()} );
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
                    let  varname = relayList[i].id
                    let  relayType = relayList[i].relayType
                    let  timerList = relayList[i].timers
                    // console.log(timerList);
                    // console.log(relayList[i]);
                    let value = new five.Relay({pin: relayList[i].pin, board: board , type: relayType });
                    this[varname] = value;
                    let target = this[varname];
                    let targetName = `relay-state-${varname}`;

////////////////////////////////////////////////////////////////////////////////

                    // if (timerList) {
                    //   for (var z = 0; z < timerList.length; z++) {
                    //     console.log(timerList[z]);
                    //   }
                    // } else {
                    //   console.log("no cron assigned to relay");
                    // }
                    //
                    //

                    let masterCronEventLength = 5000
                    let masterCronEventTime = ' */10 * * * * * '
                    // CRON TOOLING

                    // console.log(targetName);
                    let cronName = `cron-${varname}`;
                    console.log(cronName);
                    this[cronName] = new CronJob(masterCronEventTime, function() {
                      // AT START RUN TOGGLE // RUN ON
                      target.on()
                      systemEmitter.emit('newEvent', `${targetName} relay turned on`)
                      setTimeout(function () {
                        target.off()
                        systemEmitter.emit('newEvent', `${targetName} relay turned off`)
                      }, masterCronEventLength);
                    });

                    this[cronName].start();

                    systemEmitter.on( targetName, function(eventType) {
                        // console.log("system trigger relay");
                        // console.log(eventType);
                        // console.log(this[varname]);
                        // console.log(target);

//////////////////////////////////////////////////////////////////////////////
                        switch ( eventType ) {
                         case "overRide":
                                  // console.log("overriding " + varname);
                                  // console.log(target);
                                  target.toggle()
                                  systemEmitter.emit('newEvent', `${targetName} relay over riden`)
                            break;
                          // case "timer":
                          //
                          //   break;
                          // case "burst":
                          //
                          //   break;
                          default:

                        }


                    })

                    console.log(`created the ${relayList[i].id} device for the ${board.id} node @ pin ${relayList[i].pin} (relay)`);
                 } else {
                   console.log(`device was not create for the ${board.id} node`  );
                 }
            } // end of relay


            board.on("exit", () => {

            });
        }); //end of each.board
      });
    }


  }

} // end of System Class


/////////////////////////////////////////////////////////////////////////////////

module.exports = { System, getSystemConfig, resetSystemConfig, createNode, recordEvent, getEventRecords, masterDB};
