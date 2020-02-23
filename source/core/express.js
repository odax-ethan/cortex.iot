// system presets
'use strict'
require('marko/node-require');

// uncomment to run head recording
// const { add in source } = require(' **');



// fetch config
const {nodeArray , coordinates} = require('./config/systemConfig.js');

//node modules
const express = require('express');
const markoPress = require('marko/express'); //enable res.marko
const lassoWare = require('lasso/middleware'); // set express middleware lasso    app.disable('etag').disable('x-powered-by');
const helmet = require('helmet'); // basic security
const path = require('path') // node core module path
const session = require('express-session') // session tracker
// const bodyParser = require('body-parser')

const EventEmitter = require('events');
const systemEmitter = new EventEmitter(); //create event for status

//move to the systemSettings
var utcOffSet = -5;

function localTime(offset) {

    // create Date object for current location
    var   d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return nd.toLocaleString();

}

// route templates
// const indexAltTemplate = require('./source/templates/dashboard-alt/index.marko');
const indexTemplate = require('./source/templates/hub/index.marko');
const _404Template = require('./source/templates/404/index.marko');

//schema templates
// const { systemConfigSchema } = require('./source/schema/systemConfig.js')


// setup database
// var PouchDB = require('pouchdb');
// var db = new PouchDB('masterDB',{ auto_compaction: false });


// devifine port
// const systemIP  = ip.address(); // get systems local ip
const hostIP = '0.0.0.0'; // express needs a blank ip to dynamically define itself
const port = 8080; // define system port
// let cortexConfig // create variables to hold cortexConfig as a global
// let myCortex // create variable for holding new System


// finished loading system and defining global
systemEmitter.emit('newEvent', "io" ,"underlying system loaded" , localTime(utcOffSet))

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

// define express app
const app = express();

//define middleware
app.use(markoPress()); // use marko for a template engine
app.use(lassoWare.serveStatic()); // serve static files generated from lasso
app.disable('etag').disable('x-powered-by'); // minor security patch
app.use(helmet());  // basic security systems
app.use(express.static(__dirname + '/public')); // serve static files
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))) // serve favicon
// app.use(bodyParser.json()) // body parser middleware
// app.use() // session middle ware

// define sesion cookie
// app.use(session({
//   secret: 'mySecretCookieSalt',
//   key: 'myCookieSessionId',
//   cookie: {
//     httpOnly: true,
//     secure: true,
//     // domain: 'example.com',
//     // path: '/foo/bar',
//     // Cookie will expire in 1 hour from when it's generated
//     expires: new Date( Date.now() + 60 * 60 * 1000 )
//   }
// }));

// define routes for express/http
app.get('/', function(req, res, next) {
  console.log(req.session)
  res.marko(indexTemplate, {
        nodeArray: nodeArray,
        coordinates: coordinates
     });
})


  // 404
  app.use(function(req, res, next) {
    res.marko(_404Template, {
           target: req.url,
       });

    return res.status(404)
    //send a predesign not found html page
  });

  // 500 - Any server error
  app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
  });



module.exports = {app};
