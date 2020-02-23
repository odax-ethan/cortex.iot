
// the entire cortex express app is bundle as a single function which is actived
// the verification process in cortex.js

exports.startCortexApp = function () {
  const express = require('express')
  const app = express()
  const port = 3000

  app.get('/', (req, res) => res.send('Hello World!'))

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
};
