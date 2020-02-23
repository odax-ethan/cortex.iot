
const { app } = require('./source/core/express.js')


// lauch express server
app.listen(port, hostIP, function () {

    // var url  = 'http://'+ systemIP +':' + port
    // console.log('Server started! Try it out:\nhttp://'+ systemIP +':' + port + '/');

    console.log('Server started! Try it out:\nhttp://localhost:' + port + '/');

    // open at url
    // open(url);

    // not sure what this does but its in other apps.
    // if (process.send) {
    //   process.send('online');
    // }
});
