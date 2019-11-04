var serverIO = require('socket.io')
const { systemEmitter } = require('./cortex-events.js'); //cortex events / listeners components
const { deleteSystemConfig } = require('./cortex-system.js'); //cortex events / listeners components


/////////////////////////////////////

function socketListener(expressSocket, systemConfig) {
  systemEmitter.emit('newEvent', "connecting socket system...")

  const socket = expressSocket
  var io = serverIO(socket)

  io.on('connection', function(socket){
      console.log('a user connected');

      //send current systemConfig used to lauch this system
      socket.emit("systemConfig", systemConfig )

      // // make this a read master history event list - set t number of events
      // systemEmitter.on('events-master-list', (data) => {
      //   console.log(data);
      //   socket.emit("events-master-list", data)
      //   // systemEmitter.emit('sensor-socket-update', data)
      // })

      // make this a read master history event list - set to number of events
      socket.on('delete-system-config', () => {
        console.log("request to delete systemConfig");
        deleteSystemConfig()
      })

      socket.on('relay-overRide', (target) => {
          // console.log("overRiding "+ target);

          systemEmitter.emit('relay-state-'+ target , "overRide")
      })

      // on socket disconnect
      socket.on('disconnect', function(){
        console.log('user disconnected');

        // //remove listeners on disconnect
        // systemEmitter.removeListener('events-master-list', (data) => {
        //   console.log(data);
        //   socket.emit("events-master-list", data)
        //   // systemEmitter.emit('sensor-socket-update', data)
        // })); // end of master list listner

      });



  });
  systemEmitter.emit('newEvent', "socket connected")
}// end of socketListener


module.exports = { socketListener };
