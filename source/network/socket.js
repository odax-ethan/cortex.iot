// Learn more or give us feedback
const serverIO = require('socket.io')
const { systemEmitter } = require('./event.emitter.js'); // socket.io functionality


function socketListener(expressSocket) {
    const socket = expressSocket
    const io = serverIO(socket)
    module.exports = { io }; // EXPORTING IO HERE!
    // You now have access to it any where.
    //  io.sockets.emit("**", *)

    systemEmitter.on('stream', (eventBundle)=>{
        // console.log('eventStream');
        io.emit("stream", eventBundle)
    });
  
    io.on('connection', socket => {
      console.log('New Client Connected')

      

      

      // on socket disconnect
      socket.on('disconnect', function(){
        console.log('user disconnected');
        // disconnect service
        socket.disconnect(true)
      });
    });

  
  
  };




    module.exports = { socketListener };
