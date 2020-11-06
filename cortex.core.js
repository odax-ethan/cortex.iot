
// start systems.
// show boot sequences / splash screen
const { introSplash } = require('./source/boot/boot.js');

//system event handler
const { systemEmitter } = require('./source/network/event.emitter.js');

// get configurations + get quick deploy if fresh install
const { System_config, Hardware_config } = require('./source/database/settings.pouchdb.js');

 
// create master thread


// create database connections
// define db - connect to services


// creat hardware connections
// spawn new j5 instance with hardware config
// be able to reset or restore on failures
const { setupHardware } = require('./source/hardware/hardware.module.js');
setupHardware()


// create http connections
const { setupServer } = require('./source/network/server.js');
setupServer()