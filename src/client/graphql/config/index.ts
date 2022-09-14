import {
	ApolloClient,
	InMemoryCache,
} from '@apollo/client'

export const client = new ApolloClient({
	uri: `${process.env.SERVER_LOCALHOST}/graphql` ?? 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
})