// create masterdata Base
const EventEmitter = require('events');
const statusEmitter = new EventEmitter(); //create event for status

/////////////////////////////////////


//sensor base event
statusEmitter.on('newEvent', (data) => {
  console.log(data);
  // statusEmitter.emit('sensor-socket-update', data)
})
//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

module.exports = { statusEmitter };
