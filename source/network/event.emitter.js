const EventEmitter = require('events');

const systemEmitter = new EventEmitter(); //create event for all status

// data = {deviceID, typeID, dataID}
systemEmitter.on('event', (data) => {


    //create a place to run your custom event fuctionality here. 
    // set the case base on youre typeID 
    // then plug in your custom event or module... ect.
    switch (data.typeID) {
        case 'hardwareEvent': //event to save data to local db and submit event to io stream
                console.log('an event occurred!');
                // console.log(data.deviceID, data.typeID, data.dataBundle, data.timeStamp);
                systemEmitter.emit('stream', data)
                 
            break;
        case 'myCustomCase':
                console.log('an event occurred!');
                console.log(data.deviceID, data.typeID, data.dataBundle, data.timeStamp);    
            break;
        default:
            console.log('this event type has not been set up!');
            break;
    }


});




module.exports = {systemEmitter};