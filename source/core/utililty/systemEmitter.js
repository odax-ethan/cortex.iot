const EventEmitter = require('events');
const systemEmitter = new EventEmitter(); //create event for status


//****************************************************************************\\
// Set up system emmiter and define database actions
//****************************************************************************\\

  systemEmitter.on('newEvent' , ( deviceID , data , timeStamp ) => {
    // TODO: add history save
    var template = {
      deviceID : deviceID ,
      data: data ,
      timeStamp: timeStamp,
    }
    console.log(template);
  });


module.exports = {systemEmitter};
