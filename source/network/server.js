const path = require('path'); // node.js path modules
var fs = require('fs');
var https = require('https');
const express = require('express') // http Module with some goodies
const { systemEmitter } = require('./event.emitter.js'); // socket.io functionality
var ip = require('ip'); // get the public ip address
// const helmet = require('helmet'); // basic security
const {socketListener} = require('./socket'); // socket.io functionality

process.env.NODE_ENV = 'production'

setupServer = () => {

    const app = express() // define express app
    const port = 8089 // define system port
    const hostIP = null; // express needs a blank ip to dynamically define itself
    app.disable('etag').disable('x-powered-by'); // minor security patch
    // app.use(helmet());  // basic security systems

    //graphql system
    var { graphqlHTTP } = require('express-graphql'); 
    var { schema, root } = require(path.join(__dirname, 'graphql.js'));

    //public client view assets
    app.use('/static', express.static(path.join(__dirname, '../view/public')))

    //mains route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../view/landing.html'))
    });

    app.get('/settings', (req, res) => {
        res.sendFile(path.join(__dirname, '../view/settings.html'))
    });


    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

    // 500 - Any server error
    app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
    });

    app.use(function(err,req, res, next) {
        return res.status(404).send({ error: err })
        //send a predesign not found html page
    });

    var credentials = {
        key: fs.readFileSync(path.join(__dirname, '../../config/ssl/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, '../../config/ssl/cert.pem'), 'utf8')
    };
    
    var httpsServer = https.createServer(credentials, app);




    // define cortex.iot app
    const cortexApp = httpsServer.listen(port, hostIP, () => {
        console.log('running at https://' + ip.address()  + ':' + port)
    })

    //listen to connections to the HTTPS server
    socketListener(cortexApp) 
    

};

// setupServer()

module.exports = {setupServer} ;