// Learn more or give us feedback
const serverIO = require('socket.io')
const {systemEmitter} = require('./cortex.emitter');


// expressSocketTakes the Express app socket. systemSettings for presets
function socketListener(expressSocket, systemConfig) {
  const socket = expressSocket
  const io = serverIO(socket)
  module.exports = { io }; // EXPORTING IO HERE!
  // You now have access to it any where.
   // io.sockets.emit("**", *)

   systemEmitter.on('eventStream-newEvent', (newEventOBJ)=>{
      io.sockets.emit("eventStream-newEvent-socketStream", newEventOBJ)
   })

  //import anything you want to add
  // then add it bellow
 io.on('connection', function(socket){
      console.log('a user connected');

      //add custom actions here

      // on socket disconnect
      socket.on('disconnect', function(){
        console.log('user disconnected');
        // disconnect service
        socket.disconnect(true)
      });
  });

}// end of socketListener







module.exports = { socketListener };
