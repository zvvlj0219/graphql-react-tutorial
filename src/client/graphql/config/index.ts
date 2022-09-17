import {
	ApolloClient,
	InMemoryCache,
} from '@apollo/client'

// const cache = new InMemoryCache({
// 	typePolicies: {
// 		Query: {
// 			fields: {
// 				todos: {
// 					merge(existing, incoming){
// 						return incoming
// 					}
// 				}
// 			}
// 		}
// 	}
// })

export const client = new ApolloClient({
	uri: `${process.env.SERVER_LOCALHOST}/graphql` ?? 'http://localhost:5000/graphql',
	cache: new InMemoryCache()
})