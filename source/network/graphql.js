var { buildSchema } = require('graphql');
var { System_config , Hardware_config } = require('../database/settings.pouchdb.js');
var { bulk_device_history } = require('../database/history.pouchdb.js');
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
      System_config: String
      Hardware_config: String
      rollDice(numDice: Int!, numSides: Int): [Int]
      complete_hardware_history: String
    }
`);

// The root provides a resolver function for each API endpoint
var root = {
  System_config: () => {      
    return System_config().then((data)=>{
      // console.log(data);
      return JSON.stringify(data)
    }).catch(err =>{
      console.log(err);
    });   
  },
  Hardware_config: () => {
    return Hardware_config().then((data)=>{
      let new_bundle = []
      data.forEach(element => {
        new_bundle.push(element)
      });
      // console.log(new_bundle);
      return JSON.stringify(new_bundle)
    }).catch(err =>{
      console.log(err);
    });   
  },
  // rollDice: ({numDice, numSides}) => {
  //   var output = [];
  //   for (var i = 0; i < numDice; i++) {
  //     output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  //   }
  //   return output;
  // },
  complete_hardware_history: () => {
    // get complete history of all devices
    return bulk_device_history().then(data =>{
      // console.log(data)
      return JSON.stringify(data)
    }).catch(function (err) {
      // handle any errors
      throw err;
    });
  }
};
   

module.exports = {schema, root} ;