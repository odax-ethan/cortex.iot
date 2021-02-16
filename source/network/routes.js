// DOES NOT WORK 
// DOES NOT WORK 
// DOES NOT WORK 


const  express = require('express') 
var app = module.exports = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/source/views/index.html'));
});