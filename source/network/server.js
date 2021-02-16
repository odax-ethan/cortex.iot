const fs = require( 'fs' );// node.js file system module
const path = require('path')// node.js path module
const https = require('https'); // node.js https module
const socket_io = require('socket.io') // socket.io 
const express = require('express');// express.js the imidiatetly create an express app.
const { WEBSOCKET, webSocketStructure } = require('./socket')
const { systemEmitter } = require('./systemEmitter')


const os = require('os');



//create a function to call that starts up all network services
let serverStructure = (DATABASE) => {

        //create express app
        var expressApp = express()

        //get .env vairables
        const HOST = process.env.HOST // Preset Host
        const PORT = process.env.PORT // Preset Port

        //create a switch to swap between HTTPS and HTTP SERVER structure

        //create an HTTPS servers using self assign key and cert
        var SERVER = https.createServer({
            key: fs.readFileSync('./config/ssl/key.pem'),
            cert: fs.readFileSync('./config/ssl/cert.pem'),
            // ca: fs.readFileSync('./test_ca.crt'),
            requestCert: false,
            rejectUnauthorized: false //if you have verified cert set to true
        },expressApp);

        var networkInterfaces = os.networkInterfaces();
        var address = networkInterfaces['Ethernet'][1].address

        //start the SERVER at env.PORT
        SERVER.listen(PORT);
        console.log(`Running on https://${address}:${PORT}`);

        //create an socket.io SERVER that listens to the HTTPS or http SERVER at env.PORT
        webSocketStructure(SERVER, DATABASE)



        //export express app
        // module.exports = { expressApp }
        // const cortexRoutes = require('./routes')
        // expressApp.use(cortexRoutes)

        expressApp.disable('etag').disable('x-powered-by'); // minor security patch

        //public client view assets
        expressApp.use('/static', express.static(path.join(__dirname, '../views/public')))


        expressApp.get('/', (req, res) => {
            res.sendFile(path.join(__dirname + '../../../source/views/index.html'));
        });

        // 500 - Any server error
        expressApp.use(function(err, req, res, next) {
            return res.status(500).send({ error: err });
        });
    
        expressApp.use(function(err,req, res, next) {
            return res.status(404).send({ error: err })
            //send a predesign not found html page
        });
        

};



module.exports = { serverStructure }





