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

      // responce to request for system sturcture
      socket.on('system-config-req', ()=> {
            socket.emit('system-config-res', System_config)
      })

    // responce to request for board sturcture
    socket.on('hardware-config-req', ()=> {

      return Hardware_config().then((data)=>{
        let new_bundle = []
        data.forEach(element => {
          new_bundle.push(element)
        });
        // console.log(new_bundle);
        return socket.emit('hardware-config-res', JSON.stringify(new_bundle));
      }).catch(err =>{
        console.log(err);
      });   


        
    })



    //    // // responce to request for board sturcture
    socket.on('systemEmitter-emit', (toEmit)=> {
      systemEmitter.emit(toEmit);
      console.log(toEmit);
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
