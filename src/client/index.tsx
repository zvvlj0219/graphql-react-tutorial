import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LoadingContextProvider } from './utils/useLoading'
import { TodoContextProvider } from './Store/Store'
import ErrorBoundary from './components/ErrorBoundary'
import App from './app'
import { ApolloProvider } from '@apollo/client'
import { client } from './graphql/config'
import './styles/global.css'


const container = document.getElementById('app')
if (!container) throw new Error('Failed to find the root element,id: app')

const root = createRoot(container)

root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <LoadingContextProvider>
                <TodoContextProvider>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </TodoContextProvider>
            </LoadingContextProvider>
        </BrowserRouter>
    </ApolloProvider>
)