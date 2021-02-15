const socket_io = require('socket.io') // socket.io
const { systemEmitter } = require('./systemEmitter') 


webSocketStructure = (server) => {
   
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

        // on socket disconnect
        socket.on('disconnect', function(){
            console.log('user disconnected');
            // disconnect service
            socket.disconnect(true)
        });

    }) // end of WEBSOCKET.sockets

}

module.exports = { webSocketStructure }