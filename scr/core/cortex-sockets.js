var serverIO = require('socket.io')
const { systemEmitter } = require('./cortex-events.js'); //cortex events / listeners components
const { resetSystemConfig, createNode, recordEvent, getEventRecords } = require('./cortex-system.js'); //cortex events / listeners components




///////////////////////////////////////////////////////////////////////////

function socketListener(expressSocket, systemConfig) {
  systemEmitter.emit('newEvent', "connecting socket system...")
  const socket = expressSocket
  var io = serverIO(socket)
  module.exports = { io };
////////////////////////////////////////////////////////////////////////////


  // // make this a read master history event list - set t number of events
  systemEmitter.on('events-master-stream', (data) => {
    console.log(data);
    io.sockets.emit("events-master-stream", data)
    // systemEmitter.emit('sensor-socket-update', data)
  })


  systemEmitter.on('thermometerData-update-socket', (data) => {
    // console.log(data);
    io.sockets.emit('thermometerData-update', data)
  })

///////////////////////////////////////////////////////////////////////////////



  io.on('connection', function(socket){
      console.log('a user connected');

      //send current systemConfig used to lauch this system
      socket.emit("systemConfig", systemConfig )



      // make this a read master history event list - set to number of events
      socket.on('delete-system-config', () => {
         console.log("request to delete systemConfig");
        resetSystemConfig()
      })

      socket.on("save-new-node", (data) => {
        createNode(data)
      })

      socket.on('relay-overRide', (target) => {
          // console.log("overRiding "+ target);
          var emitName = `relay-state-${target}`
          // console.log(emitName);
          systemEmitter.emit(emitName, "overRide")
      })


      socket.on("save-event-record", (data) => {
        // socket.broadcast.emit('update-event-records', data)
        // console.log(data);
        recordEvent(data)
        // var eventBundle = data
        // systemEmitter.emit('newEvent', "Saved New Event Record")
        // io.emit("update-event-record", eventBundle )
      });

      socket.on("event-record-request", () => {
         let eventRecords = getEventRecords()
         socket.emit("event-record-list", eventRecords)
      })




      // on socket disconnect
      socket.on('disconnect', function(){
        console.log('user disconnected');

      });



  });
  systemEmitter.emit('newEvent', "socket connected")
}// end of socketListener


module.exports = { socketListener};
