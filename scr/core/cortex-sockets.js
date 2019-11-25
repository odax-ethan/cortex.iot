var serverIO = require('socket.io')
const { systemEmitter } = require('./cortex-events.js'); //cortex events / listeners components
const { resetSystemConfig, createNode, recordEvent, getEventRecords, masterDB } = require('./cortex-system.js'); //cortex events / listeners components




///////////////////////////////////////////////////////////////////////////

function socketListener(expressSocket, systemConfig) {
  systemEmitter.emit('newEvent', "connecting socket system...")
  const socket = expressSocket
  var io = serverIO(socket)
  module.exports = { io };
////////////////////////////////////////////////////////////////////////////
// listeners

  // make this a read master history event list - set t number of events
  systemEmitter.on('events-master-stream', (data) => {
    console.log(data);
    io.sockets.emit("events-master-stream", data)
    // systemEmitter.emit('sensor-socket-update', data)
  })

  //listen for updates from event stream
  systemEmitter.on('thermometerData-update-socket', (data) => {
    // console.log(data);
    io.sockets.emit('thermometerData-update', data)
  })

  // ADD: listen for setting changes and broadcast them

///////////////////////////////////////////////////////////////////////////////

  io.on('connection', function(socket){
      console.log('a user connected');
      // send current systemConfig used to lauch this system
      // socket.emit("systemConfig", systemConfig )

      // reset system config to template - application
      socket.on('delete-system-config', () => {
         console.log("request to delete systemConfig");
        resetSystemConfig()
      })
      // save node to masterDB
      // ADD: option as update
      socket.on("save-new-node", (data) => {
        createNode(data)
      })

      // ADD: save-new-device + update option
      // ADD: save - general settings + update option

      // over ride relay state - select target
      socket.on('relay-overRide', (target) => {
          // console.log("overRiding "+ target);
          var emitName = `relay-state-${target}`
          // console.log(emitName);
          systemEmitter.emit(emitName, "overRide")
      })
      // save a new event record
      socket.on("save-event-record", (data) => {
        // socket.broadcast.emit('update-event-records', data)
        // console.log(data);
        recordEvent(data)
        // var eventBundle = data
        // systemEmitter.emit('newEvent', "Saved New Event Record")
        // io.emit("update-event-record", eventBundle )
      });
      // return event record
      socket.on("event-record-request", () => {
         let eventRecords = getEventRecords()
         socket.emit("event-record-list", eventRecords)
      })
      // return soc
      socket.on("event-record-request", () => {
         let eventRecords = getEventRecords()
         socket.emit("event-record-list", eventRecords)
      })
      // return history for target device (add options)
      socket.on("target-device-history", (target) => {
        // console.log(target);
        // var bundle = "data"
        masterDB.get(target).catch(function (err) {
              if (err.name === 'not_found') {
                console.log("no record found");
              } else { // hm, some other error
                throw err;
              }
            }).then(function (doc) {
              console.log(doc);
              return  socket.emit("target-device-history-data", doc )
            }).catch(function (err) {
              // handle any errors
            });;
      })
      // on socket disconnect
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
  });
  systemEmitter.emit('newEvent', "socket connected")
}// end of socketListener


module.exports = { socketListener};
