import { gql } from '@apollo/client'

const GET_TODOS = gql`
    query getTodos {
        todos {
            id
            todo
        }
    }
`

export { GET_TODOS }