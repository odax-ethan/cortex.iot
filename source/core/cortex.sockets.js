// Learn more or give us feedback
const serverIO = require('socket.io')

const {systemEmitter} = require('./cortex.emitter');

const { getDeviceHistoryData, getDeviceBankHistory} = require('./cortex.pouchdb');

const {hardwareBank, systemSettings, currentConnectedHardwareList} = require('../../config/systemConfig.js');

// expressSocketTakes the Express app socket. systemSettings for presets
function socketListener(expressSocket, systemConfig) {
      const socket = expressSocket
      const io = serverIO(socket)
      module.exports = { io }; // EXPORTING IO HERE!
      // You now have access to it any where.
       // io.sockets.emit("**", *)



     //STREAM EVENT DATA TO THE UI
     systemEmitter.on('eventStream-newEvent', (newEventOBJ)=>{
          console.log('eventStream');
          io.sockets.emit("eventStream-newEvent", newEventOBJ)
       })

      //import anything you want to add
      // then add it bellow
     io.on('connection', function(socket){
          console.log('a user connected');

          // receive request for data for said device
          socket.on('device-history-request', (request)=> {

            // request is object: { targetUIDUID:" " }
            // console.log(request);

            //SWITCH FOR REQUETS
            switch (request.targetUID) {
              case "ALL":

                getDeviceBankHistory().then( (data) => {
                  // preshape data
                  // connect data from database with details about it

                  console.log('getting entire database')
                   socket.emit('device-history-response',  data.rows)
                })

                break;
              default:
              //get device history data from targetUID with # of record requested starting from last data entry.
              //this an async function() and will act on when it gets the data.
               getDeviceTargetHistory(request.targetUID).then( (data) => {
                 console.log();
                 rows = data.rows //get all rows of data in history data base
                 rows.forEach((row, i) => {
                    if (row.id === request.targetUID) {
                       socket.emit('device-history-response', row)
                    }
                 });

                 // socket.emit('device-history-response', {deviceID: request.targetUID, dataBundle: data})
                 console.log('my way');
               })
            }

          })

          // add new device
          socket.on('add-new-device', (newDeviceBundle)=> {
            console.log('new device added');
            console.log(newDeviceBundle);
          })

          // add new board
          socket.on('add-new-board', (newBoardBundle) => {
            console.log('new board added');
            console.log(newBoardBundle);
          })

          //update board
          socket.on('update-board', (updatedBundleBoard) => {
            console.log('update board');
            console.log(updatedBundleBoard);
          })

          //update device
          socket.on('updated-device', (updatedBundleDevice) => {
            console.log('update device');
            console.log(updatedBundleDevice);
          })


          //destroy device history db
          // can not be undone
          socket.on('destroy-DeviceHistoryDB', () => {
            console.log('destroyed DeviceHistoryDB');
          })

          //destroy event history db
          // can not be undone
          socket.on('destroy-eventHistoryDB', () => {
            console.log('destroyed eventHistoryDB');
          })


          // on socket disconnect
          socket.on('disconnect', function(){
            console.log('user disconnected');
            // disconnect service
            socket.disconnect(true)
          });
      });

}// end of socketListener







module.exports = { socketListener };
