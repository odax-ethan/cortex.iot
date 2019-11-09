// create masterdata Base
const EventEmitter = require('events');
const systemEmitter = new EventEmitter(); //create event for status

/////////////////////////////////////


//sensor base event
systemEmitter.on('newEvent', (data) => {
  console.log(data);
  // systemEmitter.emit('sensor-socket-update', data)
})


//sensor base event
systemEmitter.on('newthermometerData', (data) => {
  console.log(data);
  systemEmitter.emit('thermometerData-update-socket', data)
  // sensorEmitter.emit('sensor-db-update', data)
})


//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

module.exports = { systemEmitter };
