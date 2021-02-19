const socket_io = require('socket.io') // socket.io
const { systemEmitter } = require('../util/emitter/systemEmitter') 
// const { DATABASE } = require('../../cortex.core')

webSocketStructure = (server, DATABASE) => {
   

    const WEBSOCKET = socket_io(server)
    module.exports = { WEBSOCKET }; // EXPORTING IO HERE!
    // You now have access to it any where.
    //  WEBSOCKET.emit("**", *)

    //stream to any connected client event that just happened
    systemEmitter.on('stream', (data)=>{
        // console.log('eventStream');
        return WEBSOCKET.emit("stream", data)
    });
    
   // watch for client connections
   WEBSOCKET.sockets.on('connection', socket => {
        console.log('New Client Connected')

        socket.on('https-test', (data) => {
            console.log(data);
        })


        // socket actions for DATABASE get and set actions

        // GETS

        socket.on('req GET_ALL_HISTORY', () => {

            return  DATABASE.GET_ALL_HISTORY()
                .then(history=>{
                    // console.log(history);
                    return socket.emit('res GET_ALL_HISTORY', history)
                })
                .catch((err)=>{throw err})
            
        })

        socket.on('req GET_TARGET_HISTORY', (target) => {
            return  DATABASE.GET_TARGET_HISTORY(target)
            .then(target_history=>{
                // console.log(target_history);
                return socket.emit('res GET_TARGET_HISTORY', target_history)
            })
            .catch((err)=>{throw err})
    
        })

        socket.on('req GET_SETTINGS', () => {
            return DATABASE.GET_SETTINGS()
                .then(settings=>{
                    return socket.emit('res GET_SETTINGS', settings)
                })
                .catch((err)=>{throw err})
        })

        socket.on('req GET_DEVICEBANK', () => {
            return DATABASE.GET_DEVICEBANK()
                .then(deviceBank=>{
                    return socket.emit('res GET_DEVICEBANK', deviceBank)
                })
                .catch((err)=>{throw err})
        })

        socket.on('req GET_EVENTS', ()=> {

            return  DATABASE.GET_EVENTS()
            .then(events=>{
                return socket.emit('res GET_EVENTS', events)
            })
            .catch((err)=>{throw err})
        
        })

        // // SETS

        socket.on('req SET_SETTINGS', (data) => {
        
           return DATABASE.SET_SETTINGS( data )
            .then(()=>{
                console.log(`Settings have been Saved`);
                return socket.emit('res SET_SETTINGS', `Settings have been Saved`)
            })
            .catch((err)=>{throw err})

        })

        socket.on('req SET_DEVICEBANK', (data) => {
        
            return DATABASE.SET_DEVICEBANK( data )
             .then(()=>{
                 console.log(`Settings have been Saved`);
                 return socket.emit('res SET_DEVICEBANK', `deviceBank have been Saved`)
             })
             .catch((err)=>{throw err})
 
         })

         socket.on('req ADD_EVENT', data => {
            
            return DATABASE.ADD_EVENT( data )
            .then(()=>{
                console.log(`An event has been Saved`);
                return socket.emit('res ADD_EVENT', `EVENT has been Saved`)
            })
            .catch((err)=>{throw err})

         })


        // on socket disconnect
        socket.on('disconnect', function(){
            console.log('user disconnected');
            // disconnect service
            socket.disconnect(true)
        });

    }) // end of WEBSOCKET.sockets

}

module.exports = { webSocketStructure }