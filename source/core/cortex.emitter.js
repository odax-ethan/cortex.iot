const EventEmitter = require('events');
const {io} = require('./cortex.sockets');
const {addToEventStreamDB, addToDeviceHistoryDB} = require('./cortex.pouchdb');


const systemEmitter = new EventEmitter(); //create event for status

//create listener for newEvent - any event
systemEmitter.on('newEvent', ( deviceID, data, eventTriggerDate, status, detail) => {

    //bundle event into object
    newEventOrigin = { deviceID: deviceID }
    newEventOBJ = {
       data: data, eventTriggerDate: eventTriggerDate, status: status, detail: detail
    }

    console.log(newEventOBJ);

    //emit event to listener in cortex.sockets event stream
    systemEmitter.emit('eventStream-newEvent', {deviceID: newEventOrigin, data: newEventOBJ})

    switch (newEventOrigin.deviceID) {
      case 'io':
            // event triggered by the system
            //check if the system is supose to be saving all events in which case record event
            // check the number of events that should be saved
        break;
        case 'eventStream':
              // event triggered by the stream
              //check if the system is supose to be saving all events in which case record event
              // check the number of events that should be saved
          break;
      default:
          // else its for a device and should be save to the correct path
          addToDeviceHistoryDB(newEventOrigin.deviceID, newEventOBJ)
    }


})


module.exports = {systemEmitter};