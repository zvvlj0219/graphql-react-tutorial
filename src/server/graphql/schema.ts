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
                return Todo.find()
            }
        }
    }
})

// mutation
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        // add todo
        addTodo: {
            type: TodoType,
            args: {
                todo: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args){
                const newTodo = new Todo({
                    todo: args.todo
                })

                return newTodo.save()
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Todo.findByIdAndDelete({
                    _id: args.id
                })
            }
        },
        editTodo: {
            type: TodoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
                todo: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                return Todo.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            todo: args.todo
                        }
                    },
                    {
                        returnDocument: 'after'
                    }
                )
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation
})