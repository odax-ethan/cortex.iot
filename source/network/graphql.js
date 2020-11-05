var { buildSchema } = require('graphql');
var { System_config , Hardware_config } = require('../database/settings.pouchdb.js');
 
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
      // console.log(data);
      return JSON.stringify(data)
    }).catch(err =>{
      console.log(err);
    });   
  },
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
  complete_hardware_history: () => {
    return 'my history package'
  }
};
   

module.exports = {schema, root} ;