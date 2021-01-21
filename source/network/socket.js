// Learn more or give us feedback
const serverIO = require('socket.io')
const { systemEmitter } = require('./event.emitter.js'); // socket.io functionality
const {Hardware_config, System_config} = require('../database/settings.pouchdb');

socketListener = (expressSocket) => {
    const socket = expressSocket
    const io = serverIO(socket)
    module.exports = { io }; // EXPORTING IO HERE!
    // You now have access to it any where.
    //  io.sockets.emit("**", *)

    //stream to any connected client event that just happened
    systemEmitter.on('stream', (eventBundle)=>{
        // console.log('eventStream');
        return io.emit("stream", eventBundle)
    });
    
   // watch for client connections
    io.on('connection', socket => {
      console.log('New Client Connected')

    //   // responce to request for board sturcture
    //   socket.on('system-config', ()=> {
    //         socket.emit(System_config)
    //   })

    // // responce to request for board sturcture
    // socket.on('hardware-config', ()=> {
    //     socket.emit(Hardware_config)
    // })

       // // responce to request for board sturcture
    socket.on('systemEmitter-emit', (toEmit)=> {
      systemEmitter.emit(toEmit);
    })
       

      // on socket disconnect
      socket.on('disconnect', function(){
        console.log('user disconnected');
        // disconnect service
        socket.disconnect(true)
      });
    });

    
}; //end of socketListener




module.exports = { socketListener };
