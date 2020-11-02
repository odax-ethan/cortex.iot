var PouchDB = require('pouchdb');
var db = new PouchDB('settings');
const { config } = require('../../config/config.cortex.js');

db.get('config').catch(function (err) {
    if (err.name === 'not_found') {
      return {
        config
      };
    } else { // hm, some other error
      throw err;
    }
  }).then(function (configDoc) {
    // sweet, here is our configDoc
    console.log(configDoc);
  }).catch(function (err) {
    // handle any errors
  });