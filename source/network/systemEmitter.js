const EventEmitter = require('events'); // node.js event module
const systemEmitter = new EventEmitter(); //create event for all status

//gate way handler
// all events come from the
// systemEmitter.on('system-log', data) 

// error event hander
// systemEmitter.on('error', data)  

// client stream rendering handler
// systemEmitter.on('stream', data)

module.exports = {systemEmitter }