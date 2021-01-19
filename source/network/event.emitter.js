const EventEmitter = require('events');
const { Device_history_add } = require('../database/history.pouchdb.js');

// add logging system where you can say you want reporting on a specific device/hardware ID or all systems


const systemEmitter = new EventEmitter(); //create event for all status

// data = {deviceID, typeID, dataID}
systemEmitter.on('event', (data) => {



    console.log(data);

    //create a place to run your custom event fuctionality here. 
    // set the case base on youre typeID 
    // then plug in your custom event or module... ect.
    switch (data.typeID) {
        case 'hardwareEvent': //event to save data to local db and submit event to io stream
                // console.log('an event occurred!');
                // console.log(data.deviceID, data.typeID, data.dataBundle, data.timeStamp);

                //save event to correct device
                // save structure  {data: data.dataBundle, timeStamp: data.timeStamp} maybe not?
                Device_history_add( data.deviceID, data )

                 return systemEmitter.emit('stream', data)           
            break;
        // case 'myCustomCase':
        //         // console.log('an event occurred!');
        //         console.log(data.deviceID, data.typeID, data.dataBundle, data.timeStamp);    
        //     break;
        default:
            console.log('this event type has not been set up!');
            break;
    }


});




module.exports = {systemEmitter};