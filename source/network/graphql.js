var { buildSchema } = require('graphql');
 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
      quoteOfTheDay: String
      random: Float!
      rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

// The root provides a resolver function for each API endpoint
var root = 
  {quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollDice: ({numDice, numSides}) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};
   

module.exports = {schema, root} ;