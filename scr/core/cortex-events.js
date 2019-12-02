// create masterdata Base
'use strict';
const EventEmitter = require('events');
const systemEmitter = new EventEmitter(); //create event for status
// const { masterDB } = require('./cortex-system.js'); also failed
/////////////////////////////////////



// const { saveSensorDataFor } = require('./cortex-system.js');
// // saveSensorDataFor causes fatal error when in another files
// function saveSensorDataFor1(data){
//   let deviceID = data.deviceID
//   let sensorData = data.data
//   let timeStamp = data.timeStamp
//   let dataBundle = {data:sensorData,timeStamp: timeStamp}
//
//
//    masterDB.get(deviceID).catch(function (err) {
//        if (err.name === 'not_found') {
//          console.log("no record found");
//          let newData = {
//            _id: deviceID,
//            deviceID : deviceID,
//            data : [{data:sensorData, timestamp:timestamp}]
//          };
//          return masterDB.put(newData)
//        } else { // hm, some other error
//          throw err;
//        }
//      }).then(function (doc) {
//         // let bundle = doc
//         // // let arrayBundle = bundle.data
//         // let dataBundle = {data:sensorData, timestamp:timestamp}
//         // // arrayBundle.push(dataBundle)
//         // bundle.data.push(dataBundle)
//         // // masterDB.put(bundle)
//         // console.log(bundle);
//         // console.log(doc);
//
//        let newData = doc
//        let newDataSet = doc.data
//
//        // console.log(dataBundle);
//        newDataSet.push(dataBundle)
//        newData.data = newDataSet
//        masterDB.put(newData)
//        console.log(newData);
//
//      }).catch(function (err) {
//        // handle any errors
//      });
//
// }
//

//sensor base event
systemEmitter.on('newEvent', (data) => {
  // console.log(data);
  var now = new Date()
  var bundleDate = now.getHours() + ":" + now.getMinutes()  + ":" + now.getSeconds()
  var bundle = {data: data , timeStamp : bundleDate }
  // console.log(bundle);
  systemEmitter.emit('events-master-stream', bundle)
})


//moved to cortex-system
// //sensor base event
// systemEmitter.on('newthermometerData', (data) => {
//   // console.log(data);
//   systemEmitter.emit('thermometerData-update-socket', data)
//   // sensorEmitter.emit('sensor-db-update', data)
//   // saveSensorDataFor(data)
//   saveSensorDataFor1(data)
// })


//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

module.exports = { systemEmitter };
