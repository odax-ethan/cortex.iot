var PouchDB = require('pouchdb');

require('marko/node-require');

const {System} = require(__dirname +'/scr/core/cortex-system.js'); //cortex support components
const express = require('express');
const markoPress = require('marko/express'); //enable res.marko
const lassoWare = require('lasso/middleware');
const ip = require('ip'); // include ip
const five = require("johnny-five");
var io = require('socket.io')


const EventEmitter = require('events');


const hubtemplate = require('./scr/templates/hub/index.marko');
const settingstemplate = require('./scr/templates/settings/index.marko');
const accounttemplate = require('./scr/templates/account/index.marko');
const documentationtemplate = require('./scr/templates/documentation/index.marko');
const feedbacktemplate = require('./scr/templates/feedback/index.marko');

const {systemConfig} = require(__dirname +'/scr/config/systemConfig.js'); //cortex support components

const isProduction = (process.env.NODE_ENV === 'production');

// Configure lasso to control how JS/CSS/etc. is delivered to the browser
require('lasso').configure({
    plugins: [
        'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
    ],
    outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
    bundlingEnabled: isProduction, // Only enable bundling in production
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
});

const systemIP  = ip.address(); // get systems local ip
const hostIP = '0.0.0.0'; // express needs a blank ip to dynamically define itself
const port = 8080; // define system port

/////////////////////// systems are loaded => now action ///////////////////////

const mySystem = new System(systemConfig) // create system class for current system
const app = express();
const server = require('http').Server(app); // create http server instance through express

app.use(markoPress());
app.use(lassoWare.serveStatic());

app.get('/', function (req, res) {
    res.marko(hubtemplate, {
        name: 'Frank',
        count: 30,
        colors: ['red', 'green', 'blue']
    });
});

app.get('/settings', function (req, res) {
    res.marko(settingstemplate, {
        name: 'Frank',
        count: 30,
        colors: ['red', 'green', 'blue']
    });
});

app.get('/account', function (req, res) {
    res.marko(accounttemplate, {
        name: 'Frank',
        count: 30,
        colors: ['red', 'green', 'blue']
    });
});

app.get('/documentation', function (req, res) {
    res.marko(documentationtemplate, {
        name: 'Frank',
        count: 30,
        colors: ['red', 'green', 'blue']
    });
});

app.get('/feedback', function (req, res) {
    res.marko(feedbacktemplate, {
        name: 'Frank',
        count: 30,
        colors: ['red', 'green', 'blue']
    });
});

const systemApp  = app.listen(port, hostIP, function () {
  console.log('Server started! Try it out:\nhttp://'+ systemIP +':' + port + '/');
    if (process.send) {
      process.send('online');
    }
});

const ioSystem = io(systemApp)


//////////////////////// johnny-five ////////////////////////////////////////////

const systemPorts = mySystem.portConfig()
if ( systemPorts.length > 0) {
  console.log("connecting to devices...");
  new five.Boards(systemPorts).on("ready", function() {
        // test for each instance of board test againt deveice generators
        this.each(function(board) {


        }); //end of each.board
  });

} else {
  console.log("no devices to connect to...");
}



////////////// socket.io ACTIONS ///////////////////////////////////////////////

ioSystem.on('connection', function(socket){
  console.log('a user connected');


  statusEmitter.on('systemStatus', (x) => {
      socket.emit('systemStatus',  x );
  })


  socket.on('disconnect', function(){
     console.log('user disconnected');
     
     statusEmitter.removeListener('systemStatus', (x) => {
         socket.emit('systemStatus',  x );
     })

      // rr.removeListener("refresh-"+boardname, refreshHandler);
  });

});

///////////// events ///////////////////////////////////////////////////////////

class systemEmitter extends EventEmitter {}
const sensorEmitter = new systemEmitter(); //create event for the sensors
const statusEmitter = new systemEmitter(); //create event for status

//sensor base event
statusEmitter.on('new', (data) => {
  // console.log(data);
  statusEmitter.emit('sensor-socket-update', data)
})
