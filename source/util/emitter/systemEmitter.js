const EventEmitter = require('events'); // node.js event module
const systemEmitter = new EventEmitter(); //create event for all status
const {logger} = require('./logger.js')
const{DB} = require('../../../cortex.core')

//gate way handler
// all events come from the
systemEmitter.on('event', (sourceID, type, state, data) =>{
    
    switch (state) {
        case 'OK':
              logger.log( `[LOG][${state}][${sourceID}]`, data ) //send data to logger
            break;
        case 'ERROR':
              logger.error( `[ERROR][${state}][${sourceID}]`, data ) //send data to logger
            break;
        case 'WARNING':
              logger.warn( `[WARNING][${state}][${sourceID}]`, data ) //send data to logger
            break;
        default:
            break;
    }


    switch (type) {
        case 'core': //handle events  that come from sourceID
            
            // events that happen in core are visible in a secondary stream

            break;
        case 'hardware': //handle events  that come from hardware events
            
            // emit event into stream
            systemEmitter.emit('stream', { deviceID: sourceID, data:data } ) 

            // all hardware events are recorded to there history db location
            //how you log data to a deviceID
            DB.ADD_DEVICE_HISTORY(sourceID, data )
            .then(data=>{
                //   console.log(`Data was successfully logged for ${data.id}`)
                ;})
            .catch((err)=>{throw err})


             break;
        case 'trigger': //handle events  that come from software triggers events

            // when something is triggered save event to event log

        break;
        default:
            break;
    }


}) ; 

// error event hander
// systemEmitter.on('error', data)

// client stream rendering handler all
// systemEmitter.on('stream', data)

module.exports = {systemEmitter }