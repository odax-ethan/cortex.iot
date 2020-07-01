require('marko/node-require'); // allows node.js to read marko files
const {socketListener} = require('./cortex.sockets'); // socket.io functionality
const {systemEmitter} = require('./cortex.emitter'); // systemEmitter functionality
const {systemSettings, hardwareBank} = require('../../config/systemConfig.js'); // all systemSettings
const path = require('path'); // node.js path modules
const express = require('express') // http Module with some goodies

const markoPress = require('marko/express'); //enable res.marko
const lassoWare = require('lasso/middleware'); // set express middleware lasso    app.disable('etag').disable('x-powered-by');
const helmet = require('helmet'); // basic security
// const session = require('express-session') // session tracker
// const bodyParser = require('body-parser')


// route templates
const indexTemplate = require('../templates/dashboard/index.marko');
const _404Template = require('../templates/404/index.marko');
const settingsTemplate = require('../templates/settings/index.marko');
const device_analytics = require('../templates/device_analytics/index.marko');


// the entire cortex express app is bundle as a single function which is actived
// the verification process in cortex.js

startCortexApp = () =>  {

  const app = express() // define express app
  const port = 8089 // define system port
  const hostIP = '0.0.0.0'; // express needs a blank ip to dynamically define itself

  //define middleware
  app.use(markoPress()); // use marko for a template engine
  app.use(lassoWare.serveStatic()); // serve static files generated from lasso
  app.disable('etag').disable('x-powered-by'); // minor security patch
  app.use(helmet());  // basic security systems
  app.use(express.static(__dirname + '../../../public')); // serve static files

  //set lasso production environment
  const isProduction = (process.env.NODE_ENV === 'production');

  // Configure lasso to control how JS/CSS/etc. is delivered to the browser
  require('lasso').configure({
      plugins: [
          'lasso-marko' // Allow Marko templates to be compiled and transported to the browser
      ],
      outputDir: __dirname + '../../../static', // Place all generated JS/CSS/etc. files into the "static" dir
      bundlingEnabled: isProduction, // Only enable bundling in production
      minify: isProduction, // Only minify JS and CSS code in production
      fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
  });

  //mains route
  // app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../templates/test.html')))

  // define routes for express/http
  app.get('/', function(req, res, next) {
    // send prerendered marko template
    res.marko(indexTemplate, {
      hardwareBank: hardwareBank,
      coordinates: systemSettings.coordinates
    });
  })

  // define routes for express/http
  app.get('/settings', function(req, res, next) {
    // send prerendered marko template
    res.marko(settingsTemplate, {
      hardwareBank: hardwareBank,
      systemSettings: systemSettings
    });
  })


  // define routes for express/http
  app.get('/analytics/sensor/:deviceUID', function(req, res, next) {
    // send prerendered marko template
    res.marko(device_analytics, {
      targetInfo: req.params
    });
  })


  // 500 - Any server error
  app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
  });

  app.use(function(req, res, next) {
    res.marko(_404Template, {
           target: req.url,
       });

    return res.status(404)
    //send a predesign not found html page
  });


  // define cortex.iot app
  const cortexApp = app.listen(port, hostIP, () => {
    socketListener(cortexApp) //once you start listening to IP:host start socket.io server
    console.log(`Cortex.iot Example app listening on port ${port}!`)
  })

};

module.exports = {startCortexApp} ;
