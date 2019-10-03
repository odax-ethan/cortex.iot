var PouchDB = require('pouchdb');

require('marko/node-require');

const {System} = require(__dirname +'/scr/core/cortex-system.js'); //cortex support components
const express = require('express');
const markoPress = require('marko/express'); //enable res.marko
const lassoWare = require('lasso/middleware');
const ip = require('ip'); // include ip

const hubtemplate = require('./scr/templates/hub/index.marko');
const settingstemplate = require('./scr/templates/settings/index.marko');
const accounttemplate = require('./scr/templates/account/index.marko');

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

const mySystem = new System // create system class for current system
const app = express();
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

app.listen(port, hostIP, function () {
  console.log('Server started! Try it out:\nhttp://'+ systemIP +':' + port + '/');
    if (process.send) {
      process.send('online');
    }
});
