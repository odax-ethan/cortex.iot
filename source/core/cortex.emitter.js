const EventEmitter = require('events');
const systemEmitter = new EventEmitter(); //create event for status


systemEmitter.on('newEvent', ( deviceID, data, eventTriggerDate , detail) => {

    newEventOBJ = {
      deviceID: deviceID, Data: data, eventTriggerDate: eventTriggerDate  , Detail: detail
    }

    console.log(newEventOBJ);

})


module.exports = {systemEmitter};
