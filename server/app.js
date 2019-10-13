const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://16103022:n01682616787a@cluster0-ikvfp.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>
{
    console.log('connected to database');
});

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(5000.,()=>{
    console.log("Now listening for request on port 5000");
})