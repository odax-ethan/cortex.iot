// create masterdata Base
const EventEmitter = require('events');
const systemEmitter = new EventEmitter(); //create event for status

/////////////////////////////////////


//sensor base event
systemEmitter.on('newEvent', (data) => {
  console.log(data);
  // systemEmitter.emit('sensor-socket-update', data)
})
//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////

module.exports = { systemEmitter };
