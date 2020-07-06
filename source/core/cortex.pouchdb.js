var PouchDB = require('pouchdb');
const {systemEmitter} = require('./cortex.emitter'); // systemEmitter functionality
const {systemSettings, hardwareBank, currentConnectedSensorList} = require('../../config/systemConfig.js'); // systemConfigs
const {localTime} = require('../utility/utility.js'); // local time for event triggers




/////////////////////////////////////////////////////////////////////////////////
  // create database for eventstream
  var eventHistoryDB = new PouchDB('eventHistory',{auto_compaction: true});
  // last time frame requested
  addToEventHisoryDB = (data) => {

    eventHistoryDB.get('eventHistory').catch(function (err) {
      if (err.name === 'not_found') {
        return eventHistoryDB.put({
          _id: 'eventHistory',
          data: []
        });
      } else { // hm, some other error
        throw systemEmitter.emit('newEvent', 'io' , 'ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `${err}`);
      }
    }).then(function (eventHistoryDoc) {
      // sweet, here is our eventHistoryDoc

      //define eventHistory.data
      dataTarget = eventHistoryDoc.data;
      //push data to target
      dataTarget.push(data);

      // console.log(eventHistoryDoc);

      //database put doc back
      eventHistoryDB.put(eventHistoryDoc);
      // finish
      return console.log('added to event db');
    }).catch(function (err) {
      // handle any errors
      // throw systemEmitter.emit('newEvent', 'io' , 'ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `${err}`);
      console.log(err);
    });
      // finish

    return console.log('done saving to event db');;
  }

  //get all currentConnectedSensorList data for define time step count
  getEventsHistoryDB = async () => {
      // asycronoslosy get all docks from events db
      var output = eventHistoryDB.allDocs({include_docs:true}, (err,response) => {
        // console.log();
        //assign the rows arrays
        let rows = response.rows
        var preOutPut = []
        rows.forEach((item, i) => {
            var targetID = item.id
            var preDataBundle = item.doc.data
            var dataBundle = []
            preDataBundle.forEach((item, i) => {
              dataBundle.push(item.data)
            });
            // console.log(dataBundle);
            return preOutPut.push(dataBundle);
        });
        return preOutPut;
      })
      return output;
    }


  // delete each data based
  destroyeventHistoryDB = () => {
      eventHistoryDB.destroy().then(function () {
        // database destroyed
        console.log('eventHistoryDB deleted');
      }).catch(function (err) {
        // error occurred
        console.log(err);
      })
  }

  // TODO: GET addToEventStreamDB data
  // todo: download dump event history

/////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////////////

    // create database for eventstream
    var devicetHistoryDB = new PouchDB('deviceHistory', {auto_compaction: true});
    // last time frame requested
    addToDeviceHistoryDB = (target , dataBundle) => {

        devicetHistoryDB.get(target).catch(function (err) {
        if (err.name === 'not_found') {

          //get for said device add add them to db

          // return devicetHistoryDB.put({
          //   _id: target,
          //   color: device.color,
          //   data: []
          // });


              hardwareBank.forEach((board, i) => {

                    var targetBoard = board.devices
                    targetBoard.forEach((device, i) => {
                      // console.log(device.deviceID);
                      // console.log(target);

                      //check that current device is the same as target device
                      if (device.deviceID === target) {
                        return devicetHistoryDB.put({
                          _id: target,
                          color: device.color,
                          data: []
                        });
                      }

                    });
                });

        } else { // hm, some other error
          throw err;
        }
      }).then(function (devicetHistoryDoc) {
        // sweet, here is our eventHistoryDoc
          // console.log(devicetHistoryDoc.data)
        //define eventHistory.data

        // get data bundle.data
        dataTarget = devicetHistoryDoc.data;
        //push data to target.data array
        dataTarget.push(dataBundle);

        //database put doc back
        devicetHistoryDB.put(devicetHistoryDoc);
        // finish
        return console.log('worked');
      }).catch(function (err) {
        // handle any errors
        console.log(err);
      });

        // finish
      return console.log('done');

    }

    // getDeviceHistoryData = async (target, recordCount) => {
    //
    //     var output = devicetHistoryDB.get(target).catch(function (err) {
    //         if (err.name === 'not_found') {
    //           return systemEmitter.emit('newEvent', 'io' , 'MINOR ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `System tried to save data to a device which has not be configured`)
    //         } else { // hm, some other error
    //           throw systemEmitter.emit('newEvent', 'io' , 'ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `${err}`);
    //         }
    //     }).then(function (devicetHistoryDoc) {
    //
    //           console.log(devicetHistoryDoc)
    //           // get the last X number of records requested
    //           function optionTest(recordCount){
    //             switch (recordCount) {
    //                case 'all':
    //                      //get complete history for target device
    //                  break;
    //                default:
    //
    //                //assign data to variable
    //                deviceData = devicetHistoryDoc.data
    //                //slice/copy range into output variable
    //
    //                 // declare and copy requested # of records
    //                 var newData = deviceData.slice(1).slice(-recordCount)
    //                 var outPutData = []
    //
    //
    //
    //               newData.forEach((item, i) => {
    //
    //                  //  shape of data
    //                  // {data: data, eventTriggerDate: eventTriggerDate, status: status, detail: detail}
    //                  console.log(item);
    //
    //               });
    //
    //
    //
    //                 // console.log(newData);
    //                  return newData
    //
    //
    //              }
    //           }
    //           var preOutPut = optionTest(recordCount);
    //           // console.log(preOutPut);
    //
    //           return preOutPut ;
    //     }).catch(function (err) {
    //         // handle any errors
    //         console.log(err);
    //       });
    //
    //     // console.log(output);
    //
    //     // ouput the select data range
    //     return output
    //
    // }
    //
    // //get selected device histoyr
    // getTargetDeviceHistory = async (targetDeviceID) => {
    //
    //     var output = devicetHistoryDB.allDocs({include_docs:true}, (err,response) => {
    //       // console.log();
    //       //assign the rows arrays
    //       // let rows = response.rows
    //       // var preOutPut = []
    //       //
    //       // rows.forEach((item, i) => {
    //       //     if (item === targetDeviceID) {
    //       //       var targetID = item.id
    //       //       var preDataBundle = item.doc.data
    //       //       var dataBundle = []
    //       //       preDataBundle.forEach((item, i) => {
    //       //         dataBundle.push(item.data)
    //       //       });
    //       //       // console.log(dataBundle);
    //       //       return preOutPut.push(dataBundle);
    //       //     }
    //       // });
    //       console.log(response);
    //
    //       return preOutPut;
    //     })
    //     return output;
    //
    // }

    //get all currentConnectedSensorList data for define time step count
    getDeviceBankHistory = async () => {

      var output = devicetHistoryDB.allDocs({include_docs:true}, (err,response) => {
        // console.log();
        //assign the rows arrays
        let rows = response.rows
        var preOutPut = []
        rows.forEach((item, i) => {
            var targetID = item.id
            var preDataBundle = item.doc.data
            var dataBundle = []
            preDataBundle.forEach((item, i) => {
              dataBundle.push(item.data)
            });
            // console.log(dataBundle);
            return preOutPut.push(dataBundle);
        });
        return preOutPut;
      })
      return output;
    }

    //
    getDeviceTargetHistory = async () => {

      var output = devicetHistoryDB.allDocs({include_docs:true}, (err,response) => {
        // console.log();
        //assign the rows arrays
        let rows = response.rows
        var preOutPut = []
        rows.forEach((item, i) => {
            var targetID = item.id
            var preDataBundle = item.doc.data
            var dataBundle = []
            preDataBundle.forEach((item, i) => {
              dataBundle.push(item.data)
            });
            // console.log(dataBundle);
            return preOutPut.push(dataBundle);
        });
        return preOutPut;
      })
      return output;
    }


    // delete each data based
    destroyDeviceHistoryDB = () => {
        devicetHistoryDB.destroy().then(function () {
          // database destroyed
          console.log('deviceHistoryDB deleted');
        }).catch(function (err) {
          // error occurred
          console.log(err);
        })
    }

/////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////////////
// create database for eventstream
var systemSettingsDB = new PouchDB('systemSettings', {auto_compaction: true});

    // save entire systemConfig bundle or update system
    // if its the first boot and there is no system config saved
    // system will take entire systemConfig + systemSettings and save them to quick boot
    // once on the system will run base on the systemConfig+ systemSettings templated in the files
    // a user can update the settings from the ui or manually via the same files as before
    // hardware and network changes only take affect onces the system is rebooted
    // generally its best practice to reboot once you have made changes to see them

    saveSetting = (data) => {

        // this is only called in two ways:

        // the first is when the system is fresh install
        // the dataBundle that comes is the boardBank.
        // all details of the entire system

        // the second way is as an array of objects that has the settings path
        // and the string to update the setting call on.


        systemSettingsDB.get('settings').catch(function (err) {
          if (err.name === 'not_found') {
            return systemSettingsDB.put({
              _id: 'settings',
              settings: data
            });
          } else { // hm, some other error
            throw systemEmitter.emit('newEvent', 'io' , 'ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `${err}`);
          }
      }).then(function (settingsDoc) {
        // sweet, here is our settingsDoc

        //define eventHistory.data
        //dataTarget = settingsDoc.settings;

        //console.log(settingsDoc.settings);

        //database put doc back
        // systemSettingsDB.put(settingsDoc);
        // finish
        return console.log('worked');
      }).catch(function (err) {
        // handle any errors
        throw systemEmitter.emit('newEvent', 'io' , 'ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `${err}`);
      });
        // finish
      return console.log('done');

    }

    getSystemSettingsData = async () => {

          var output = systemSettingsDB.get(target).catch(function (err) {
              if (err.name === 'not_found') {
                return systemEmitter.emit('newEvent', 'io' , 'MINOR ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `System tried to save data to a device which has not be configured`)
              } else { // hm, some other error
                throw systemEmitter.emit('newEvent', 'io' , 'ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `${err}`);
              }
          }).then(function (settingsDoc) {
          // sweet, here is our settingsDoc

          //pass back

          // finish
          return settingsDoc.settings
        }).catch(function (err) {
          // handle any errors
          throw systemEmitter.emit('newEvent', 'io' , 'ERROR', localTime(systemSettings.utcOffSet), 'ERROR', `${err}`);
        });


        // finish
        return ouput;



    }

    //force compaction
    compactDBs = () => {

     devicetHistoryDB.compact().then(function (info) {
          // compaction complete
          console.log('devicetHistoryDB compacted');
      }).catch(function (err) {
        // handle errors
          console.log(err);
      });

      eventHistoryDB.compact().then(function (info) {
           // compaction complete
           console.log('eventHistoryDB compacted');
       }).catch(function (err) {
         // handle errors
           console.log(err);
       });



    }
/////////////////////////////////////////////////////////////////////////////////

// addToEventStreamDB('data')
module.exports = {addToEventHisoryDB, addToEventHisoryDB,addToDeviceHistoryDB, getDeviceBankHistory};
