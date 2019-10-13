const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema} =  graphql;
const _ = require('lodash');

var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
name:'Book',
fields:() =>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{
        type:Authortype,
        resolve:(parent,args)=>
        {
            return _.find(authors,{id:parent.authorId})
        }
    }
})
})

const Authortype = new GraphQLObjectType({
    name:'Author',
    fields:() =>
    ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:() =>({
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>{
               return _.find(books,{id:args.id})
            }
        },
        author:{
            type:Authortype,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>
            {
                return _.find(authors,{id:args.id})
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve:()=> books
        },
        authors:{
            type:new GraphQLList(Authortype),
            resolve:()=>authors
        }
    })
})

module.exports = new GraphQLSchema({
    query:RootQuery
})