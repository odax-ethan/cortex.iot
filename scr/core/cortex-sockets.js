var serverIO = require('socket.io')
const { statusEmitter } = require('./cortex-events.js'); //cortex events / listeners components
const EventEmitter = require('events');
const socketEmitter = new EventEmitter(); //create event for status

/////////////////////////////////////

function socketListener(expressSocket, systemConfig) {
  statusEmitter.emit('newEvent', "connecting socket system...")

  const socket = expressSocket
  var io = serverIO(socket)

  io.on('connection', function(socket){
      console.log('a user connected');

      //send current systemConfig used to lauch this system
      socket.emit("systemConfig", systemConfig )

      // // make this a read master history event list - set to number of events
      // socketEmitter.on('events-master-list', (data) => {
      //   console.log(data);
      //   socket.emit("events-master-list", data)
      //   // statusEmitter.emit('sensor-socket-update', data)
      // })


      // on socket disconnect
      socket.on('disconnect', function(){
        console.log('user disconnected');

        // //remove listeners on disconnect
        // socketEmitter.removeListener('events-master-list', (data) => {
        //   console.log(data);
        //   socket.emit("events-master-list", data)
        //   // statusEmitter.emit('sensor-socket-update', data)
        // })); // end of master list listner

      });



  });
  statusEmitter.emit('newEvent', "socket connected")
}// end of socketListener


module.exports = { socketListener };
