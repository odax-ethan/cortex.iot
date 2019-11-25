// create masterdata Base
const EventEmitter = require('events');
const systemEmitter = new EventEmitter(); //create event for status
// const { saveSensorDataFor } = require('./cortex-system.js');
/////////////////////////////////////


//sensor base event
systemEmitter.on('newEvent', (data) => {
  // console.log(data);
  var now = new Date()
  var bundleDate = now.getHours() + ":" + now.getMinutes()  + ":" + now.getSeconds() 
  var bundle = {data: data , timeStamp : bundleDate }
  // console.log(bundle);
  systemEmitter.emit('events-master-stream', bundle)
})


//sensor base event
systemEmitter.on('newthermometerData', (data) => {
  // console.log(data);
  systemEmitter.emit('thermometerData-update-socket', data)
  // sensorEmitter.emit('sensor-db-update', data)
  // saveSensorDataFor(data)
})


//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

module.exports = { systemEmitter };
