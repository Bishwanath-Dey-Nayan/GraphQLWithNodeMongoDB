const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const { GraphQLObjectType, GraphQLString, GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema } = graphql;
const _ = require('lodash');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: Authortype,
            resolve: (parent, args) => {
                // return _.find(authors,{id:parent.authorId})
            }
        }
    })
})

const Authortype = new GraphQLObjectType({
    name: 'Author',
    fields: () =>
        ({
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt }
        })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                //    return _.find(books,{id:args.id})
            }
        },
        author: {
            type: Authortype,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                // return _.find(authors,{id:args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(Authortype),
            resolve: () => authors
        }
    })
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:Authortype,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve:(parent,args) =>
            {
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save();
            }
        },
        addBook:{
            type:BookType,
                args:{
                    name:{type:GraphQLString},
                    genre:{type:GraphQLString},
                    authorId:{type:GraphQLID}
                },
                resolve:(parent,args)=>{
                    let book = new Book({
                        name:args.name,
                        genre:args.genre,
                        authorId:args.authorId
                    });
                    return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:mutation
})