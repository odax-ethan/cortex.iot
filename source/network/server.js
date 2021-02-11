const fs = require( 'fs' );// node.js file system module
const path = require('path')// node.js path module
const https = require('https'); // node.js https module
const socket_io = require('socket.io') // socket.io 
const express = require('express');// express.js the imidiatetly create an express app.


//create a function to call that starts up all network services
let serverStructure = () => {

        //create express app
        var app = express()

        //get .env vairables
        const HOST = process.env.HOST // Preset Host
        const PORT = process.env.PORT // Preset Port

        //create an HTTPS servers using self assign key and cert
        var server = https.createServer({
            key: fs.readFileSync('./config/ssl/key.pem'),
            cert: fs.readFileSync('./config/ssl/cert.pem'),
            // ca: fs.readFileSync('./test_ca.crt'),
            requestCert: false,
            rejectUnauthorized: false //if you have verified cert set to true
        },app);

        console.log(`Running on https://${HOST}:${PORT}`);

        //start the server at env.PORT
        server.listen(PORT);

        //create an IO server that listens to the HTTPS server at env.PORT
        var io = socket_io(server);

        //Listen for a connections then 
        io.sockets.on('connection',function (socket) {
            console.log('New Client Connected')

           
           socket.on('https-test', (data) => {
                
                console.log(data);
           })
           
           
            // on socket disconnect
            socket.on('disconnect', function(){
                console.log('user disconnected');
                // disconnect service
                socket.disconnect(true)
            });
        });

        // at the root of the express server
        app.get("/", function(request, response){
            response.sendFile(path.join(__dirname + '/../views/index.html'));
            console.log('request at root');
        })

};



module.exports = { serverStructure }





