
// load services
// make sure subservices are present before calling to start system
// start app
// async start app and go step by step making services turn on.


// start systems.
// show boot sequences / splash screen
const { introSplash } = require('./source/boot/boot.js');

//system event handler
const { systemEmitter } = require('./source/network/event.emitter.js');

// get configurations + get quick deploy if fresh install
// on fresh install and non-fresh starts - make dv availible
const { System_config, Hardware_config } = require('./source/database/settings.pouchdb.js');
 
// create master thread

// database services exist as functions that other sub services call on
// hardware and the server will call on the db

// creat hardware connections
// spawn new j5 instance with hardware config
const { setupHardware } = require('./source/hardware/hardware.module.js');
setupHardware()

// create http connections with express + websocket / graphQl 
const { setupServer } = require('./source/network/server.js');
setupServer()