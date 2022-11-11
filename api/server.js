var express = require('express');
var cors = require('cors')
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var customers = require('./customerData.json');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Customer {
    id: Int
    name: String
    amount: Int
    transactionDt: String
  }
  type Query {
    allCustomers: [Customer]
  }
`);

// The root provides a resolver function for each API endpoint
var rootValue = {
  allCustomers: () => {
    console.log('getting customers: ', customers.length)
    return customers
  },
};

var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');