const fs = require( 'fs' );// node.js file system module
const path = require('path')// node.js path module
const https = require('https'); // node.js https module
// const socket_io = require('socket.io') // socket.io 
const express = require('express');// express.js the imidiatetly create an express app.
const { WEBSOCKET, webSocketStructure } = require('./socket')
const { systemEmitter } = require('./systemEmitter')

//create a function to call that starts up all network services
let serverStructure = () => {

        //create express app
        var app = express()

        //get .env vairables
        const HOST = process.env.HOST // Preset Host
        const PORT = process.env.PORT // Preset Port

        //create a switch to swap between HTTPS and HTTP server structure

        //create an HTTPS servers using self assign key and cert
        var SERVER = https.createServer({
            key: fs.readFileSync('./config/ssl/key.pem'),
            cert: fs.readFileSync('./config/ssl/cert.pem'),
            // ca: fs.readFileSync('./test_ca.crt'),
            requestCert: false,
            rejectUnauthorized: false //if you have verified cert set to true
        },app);

        console.log(`Running on https://${HOST}:${PORT}`);

        //start the server at env.PORT
        SERVER.listen(PORT);

        //create an socket.io server that listens to the HTTPS or http server at env.PORT
        webSocketStructure(SERVER)

        // at the root of the express server
        app.get("/", function(request, response){
            response.sendFile(path.join(__dirname + '/../views/index.html'));
            console.log('request at root');
        })

};



module.exports = { serverStructure }





