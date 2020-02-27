const EventEmitter = require('events');
const {io} = require('./cortex.sockets');

const systemEmitter = new EventEmitter(); //create event for status

//create listener for newEvent - any event
systemEmitter.on('newEvent', ( deviceID, data, eventTriggerDate, status, detail) => {

    //bundle event into object
    newEventOBJ = {
      deviceID: deviceID, data: data, eventTriggerDate: eventTriggerDate, status: status, detail: detail
    }

    console.log(newEventOBJ);

    //emit event to listener in cortex.sockets event stream
    systemEmitter.emit('eventStream-newEvent', newEventOBJ)

})


module.exports = {systemEmitter};
