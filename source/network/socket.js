const socket_io = require('socket.io') // socket.io
const { systemEmitter } = require('../util/emitter/systemEmitter') 
// const { DB } = require('../../cortex.core')

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


        // socket actions for DB get and set actions

        // GETS

        socket.on('req GET_ALL_HISTORY', (data) => {

        return  DATABASE.GET_ALL_HISTORY()
            .then(history=>{
                console.log(history);
                return socket.emit('res GET_ALL_HISTORY', history)
            })
            .catch((err)=>{throw err})
            
        })

        // socket.on('req GET_TARGET_HISTORY', (data) => {
        //     console.log(data);

        //     return socket.emit('res GET_TARGET_HISTORY', data)
        // })

        socket.on('req GET_SETTINGS', (data) => {
            
        return DATABASE.GET_SETTINGS()
        .then(settings=>{
            return socket.emit('res GET_SETTINGS', settings)
        })
        .catch((err)=>{throw err})


            
        })

        // socket.on('req GET_DEVICEBANK', (data) => {
        //     console.log(data);
        //     return socket.emit('res GET_DEVICEBANK', data)
        // })

        // // SETS

        // socket.on('req SET_SETTINGS', (data) => {
        //     console.log(data);
        //     return socket.emit('res SET_SETTINGS', data)
        // })

        // socket.on('req SET_DEVICEBANK', (data) => {
        //     console.log(data);
        //     return socket.emit('res SET_DEVICEBANK', data)
        // })



        // on socket disconnect
        socket.on('disconnect', function(){
            console.log('user disconnected');
            // disconnect service
            socket.disconnect(true)
        });

    }) // end of WEBSOCKET.sockets

}

module.exports = { webSocketStructure }