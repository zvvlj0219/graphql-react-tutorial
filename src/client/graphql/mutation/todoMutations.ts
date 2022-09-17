import { gql } from '@apollo/client';

const ADD_TODO = gql`
    mutation addTodo($todo: String!){
        addTodo(todo: $todo){
            id
            todo
        }
    }
`

const DELETE_TODO = gql`
    mutation deleteTodo($id: ID!){
        deleteTodo(id: $id){
            id
        }
    }
`

const EDIT_TODO = gql`
    mutation editTodo($id: ID!, $todo: String!){
        editTodo(id: $id, todo:$todo){
            id,
            todo
        }
    }
`

export { ADD_TODO, DELETE_TODO, EDIT_TODO }