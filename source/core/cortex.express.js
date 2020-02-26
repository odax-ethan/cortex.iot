

const {socketListener} = require('./cortex.sockets');
const {systemEmitter} = require('./cortex.emitter');
const {systemSettings} = require('../../config/systemConfig.js');
const path = require('path');
const express = require('express')

// the entire cortex express app is bundle as a single function which is actived
// the verification process in cortex.js

startCortexApp = () =>  {

  const app = express()
  const port = 8080

  //mains route
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../templates/test.html')))

  // 500 - Any server error
  app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
  });

  const cortexApp = app.listen(port, () => console.log(`Cortex.iot Example app listening on port ${port}!`))
  socketListener(cortexApp)
};

module.exports = {startCortexApp} ;
