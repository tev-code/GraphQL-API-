//DEPENDANCIES

//npm init
//npm i express express-graphql graphql lodash

//add to package.json = "start": "node app.js"

//App.js

const express = require('express');
const expressGraphQl = require('express-graphql');
const port = 4800;
const app = express();
const schema = require('./schema/schema');

app.use('/graphql', expressGraphQl({
schema,
graphiql: true
}))

app.listen(port, () => {
console.log(`listening to port${port}`)
})


Schema.js in schema folder

//Structure of query

const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString,GraphQLInt} = graphql

const users = [
{"id": "23", "firstName":"Bill", "age": 20},
{"id": "28", "firstName":"John", "age": 37},
{"id": "56", "firstName":"Mark", "age": 60},
{"id": "83", "firstName":"Mary", "age": 50},
]

const UserType = new GraphQLObjectType({
name: "User",
fields:{
id:{type: GraphQLString},
firstName: {type: GraphQLString},
age:{type: GraphQLInt}
}
})

const RootQuery = new GraphQLObjectType({
name: 'RootQueryType',
fields:{
user:{
type: UserType,
args: {id:{type:GraphQLString}},
resolve(parentValue, args){
return _.find(users,{id:args.id})
}
}
}
})

module.exports = new GraphQLSchema({
query:RootQuery
})






