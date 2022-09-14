import Todo from '../models/Todo'
import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} from 'graphql'

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields:() => ({
        id: { type: GraphQLID },
        todo: { type: GraphQLString }
    })
})

// query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent, args){
                // return [
                //     {
                //         id: 1,
                //         todo: 'popopopo'
                //     }
                // ]
                return Todo.find()
            }
        }
    }
})

// mutation

export default new GraphQLSchema({
    query: RootQuery,
})