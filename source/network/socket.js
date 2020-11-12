// Learn more or give us feedback
const serverIO = require('socket.io')
const {systemEmitter} = require('./event.emitter'); // socket.io functionality


function socketListener(expressSocket) {
    const socket = expressSocket
    const io = serverIO(socket)
    module.exports = { io }; // EXPORTING IO HERE!
    // You now have access to it any where.
     // io.sockets.emit("**", *)


   //STREAM EVENT DATA TO THE UI
   systemEmitter.on('stream', (eventBundle)=>{
        // console.log('eventStream');
        io.sockets.emit("stream", eventBundle)
    })

    };




    module.exports = { socketListener };
