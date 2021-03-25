const fs = require( 'fs' );// node.js file system module
const path = require('path')// node.js path module
const https = require('https'); // node.js https module
const socket_io = require('socket.io') // socket.io 
const express = require('express');// express.js the imidiatetly create an express app.
var compression = require('compression') // addin compression
const { WEBSOCKET, webSocketStructure } = require('./socket')
const { systemEmitter } = require('../util/emitter/systemEmitter')
var favicon = require('serve-favicon') //may not need

// const os = require('os');
var ip = require('ip'); // get the public ip address

//create a function to call that starts up all network services
let serverStructure = (DATABASE) => {

        //create express app
        var expressApp = express()

        //get .env vairables
        const HOST = null // Preset Host
        const PORT = process.env.PORT // Preset Port

        //create a switch to swap between HTTPS and HTTP SERVER structure

        //create an HTTPS servers using self assign key and cert
        var SERVER = https.createServer({
            key: fs.readFileSync('./config/ssl/key.pem'),
            cert: fs.readFileSync('./config/ssl/cert.pem'),
            // ca: fs.readFileSync('./test_ca.crt'),
            // requestCert: false,
            rejectUnauthorized: false //if you have verified cert set to true
        },expressApp);

        expressApp.use(express.json()) // for parsing application/json
        expressApp.use(express.urlencoded({
        extended: true
        })) // for parsing application/x-www-form-urlencoded
        expressApp.use(compression())   // compress all responses


        expressApp.disable('etag').disable('x-powered-by'); // minor security patch

        //public client view assets
        expressApp.use('/public', express.static(path.join(__dirname, '../views/public')))
        expressApp.use(favicon(path.join(__dirname, '../views/public/images/favicon.ico')));

        // expressApp.use(favicon(path.join(__dirname + '../views/public/images/favicon.ico')));

        expressApp.get('/', (req, res) => {
            res.sendFile(path.join(__dirname + '../../../source/views/core.html'));
        });

        // 500 - Any server error
        expressApp.use(function(err, req, res, next) {
            return res.status(500).send({ error: err });
        });
    
        expressApp.use(function(err,req, res, next) {
            return res.status(404).send({ error: err })
            //send a predesign not found html page
        });


        expressApp.get('/get/deviceBank', (req, res) => {
            var cortex_shape = require('../../config/cortex_shape.json');
            res.setHeader('Content-Type', 'application/json');
            res.json(cortex_shape);
          
        });

        expressApp.get('/get/settings', (req, res) => {

            res.setHeader('Content-Type', 'application/json');
            DATABASE.GET_SETTINGS()
            .then(settings=>{res.json(settings);})
            .catch((err)=>{throw err})
          
        });


        expressApp.get('/get/history', (req, res) => {

            res.setHeader('Content-Type', 'application/json');
            // how to get all device data
            DATABASE.GET_ALL_HISTORY()
            .then(history=>{res.json(history);})
            .catch((err)=>{throw err})
          
        });

        expressApp.get('/get/history', (req, res) => {

            res.setHeader('Content-Type', 'application/json');
            // how to get all device data
            DATABASE.GET_ALL_HISTORY()
            .then(history=>{res.json(history);})
            .catch((err)=>{throw err})
          
        });

        expressApp.post('/update/settings/general', (req, res) => {
            console.log('Got body:', req.body);

            DATABASE.SET_SETTINGS( req.body )
            .then(()=>{
                console.log(`Settings have been Saved`);
                res.sendStatus(200);
            })
            .catch((err)=>{throw err})

        });


        expressApp.post('/update/settings/device_bank', (req, res) => {
            console.log('Got body:', req.body);

            //how you log data to a deviceID
            DB.SET_DEVICEBANK( req.body )
            .then(()=>{
                console.log(`deviceBank has been Saved`);
                res.sendStatus(200);
            })
            .catch((err)=>{throw err})

        });


        //save new deviceBank



        //create an socket.io SERVER that listens to the HTTPS or http SERVER at env.PORT
        webSocketStructure(SERVER, DATABASE)
        
        const cortexApp = SERVER.listen(PORT, HOST, () => {
            console.log('running at https://' + ip.address()  + ':' + PORT)
        })



};



module.exports = { serverStructure }





