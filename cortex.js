// load rest of libraries
'use strict';
require('marko/node-require');// allows system to recognize .marko files
const express = require('express');
const markoPress = require('marko/express'); //enable res.marko
const lassoWare = require('lasso/middleware');
const ip = require('ip'); // include ip
const five = require("johnny-five");
var serverIO = require('socket.io')
const open = require('open');

const { socketListener } = require(__dirname +'/scr/core/cortex-sockets.js'); //cortex sockets components
const { systemEmitter } = require(__dirname +'/scr/core/cortex-events.js'); //cortex events / listeners components
// const { looper } = require(__dirname +'/scr/core/cortex-logic.js'); //cortex events / listeners components
const { System, getSystemConfig, deleteSystemConfig } = require(__dirname +'/scr/core/cortex-system.js'); //cortex support & database components

const hubTemplate = require('./scr/templates/hub/index.marko');
const deviceHistoryTemplate = require('./scr/templates/device-history/index.marko');
const settingsTemplate = require('./scr/templates/settings/index.marko');
const analysisTemplate = require('./scr/templates/analysis/index.marko');
const documentationTemplate = require('./scr/templates/documentation/index.marko');
const guideTemplate = require('./scr/templates/guide/index.marko');

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
let cortexConfig // create variables to hold cortexConfig as a global
let myCortex // create variable for holding new System

// finished loading system and defining global
systemEmitter.emit('newEvent', "underlying system loaded")


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// var fs = require('fs') // test for memory leaks
// var csvWriter = require('csv-write-stream') // test for memory leaks
// var memoryUsage = require('memory-usage') // test for memory leaks
//
// memoryUsage(2000) // test for memory leaks
//   .pipe(csvWriter()) // test for memory leaks
//   .pipe(fs.createWriteStream('memory.csv')) // test for memory leaks
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

new Promise((resolve, reject) => {
    systemEmitter.emit('newEvent', "Initializing cortex system")
    resolve(getSystemConfig);
})
.then((data) => {
    if (!data) {
       throw new Error('no data');
    } else {
      systemEmitter.emit('newEvent', "system configuration loaded")
      // console.log(data);
      cortexConfig = data
      myCortex = new System(data)
    }
})
.catch(() => {
    systemEmitter.emit('newEvent', "Error while loading system configuration")
})
.then(() => {
    systemEmitter.emit('newEvent', "starting secondary system")

    //console.log(cortexConfig);
    const app = express();
    const server = require('http').Server(app); // create http server instance through express

    app.disable('etag').disable('x-powered-by');
    app.use(markoPress());
    app.use(lassoWare.serveStatic());

    //send home pages to general search
    app.get('/', function (req, res) {
      res.marko(hubTemplate, {
          systemConfig: cortexConfig,
          systemDevices: cortexConfig.devices
      });
      // console.log('search:', req.params.search)
    });

    //test for page via switch
    app.get('/:search', function (req, res) {
      // console.log('search:', req.params.search)
      switch (req.params.search) {
        case "settings":
            res.marko(settingsTemplate, {
              systemConfig: cortexConfig,
              systemNodes: cortexConfig.nodes,
              systemDevices: cortexConfig.devices
            });
          break;
        case "guide":
            res.marko(guideTemplate, {
              systemConfig: cortexConfig
            });
          break;
          case "analysis":
              res.marko(analysisTemplate, {
                systemConfig: cortexConfig
              });
            break;
        case "documentation":
            res.marko(documentationTemplate, {
              systemConfig: cortexConfig
            });
          break;
        default:
          res.status(500).send('You seem to how found a dead end... you should go back!')
      }
    });



    app.get('/history/:deviceID', function (req, res) {

      let targetDevice = req.params.deviceID

      function getInfo() {
        for (var i = 0; i < cortexConfig.devices.length; i++) {
          if (cortexConfig.devices[i].deviceID === targetDevice ) {
            return cortexConfig.devices[i]
          }
        }
      }


        res.marko(deviceHistoryTemplate, {
            // systemConfig: cortexConfig,
            // systemDevices: cortexConfig.devices,
            currentDeviceData: getInfo()
            // currentDeviceHistory: fullHistory
        });





      // console.log('search:', req.params.search)
    })

    const systemApp  = app.listen(port, hostIP, function () {
      var url  = 'http://'+ systemIP +':' + port
      console.log('Server started! Try it out:\nhttp://'+ systemIP +':' + port + '/');

      // open at url
      open(url);

        if (process.send) {
          process.send('online');
        }
    });

    socketListener(systemApp, cortexConfig ); // fires the entire socket.io listern -> go to scr/core/cortex-sockets

    setTimeout(function () {

      myCortex.generateSystem()

    }, 1000);

});