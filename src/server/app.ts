import express from 'express'
import type { Application } from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './graphql/schema'
import { buildSchema } from 'graphql'
import Controller from './types/controller.interface'
import TodoController from './resources/todo/todo.controller'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import errorHandler from './middleware/errorHandler'
import { corsOptions } from './config/index'

const app: Application = express()

// middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(helmet())
app.use(compression())
app.use(errorHandler)

const controllers: Controller[] = [
    new TodoController(),
]

controllers.forEach((controller: Controller) => {
    app.use('/api', controller.router)
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

export default app





// class App {
//     public app: Application
//     public port: number
//     public apiRoute: string

//     constructor(controllers: Controller[], port: number, apiRoute: string) {
//         this.app = express()
//         this.port = port
//         this.apiRoute = apiRoute

//         this.app.use(cors(corsOptions))
//         this.app.use(express.json())
//         this.app.use(express.urlencoded({ extended: true }))
//         this.app.use(helmet())
//         this.app.use(compression())
//         this.app.use(errorHandler)
 
//         this.initializeControllers(controllers)
        
//         // this.initializeGraphql()

//         this.app.use('/graphql', graphqlHTTP({
//             schema,
//             graphiql: true
//         }))

//     }

//     private initializeControllers(controllers: Controller[]): void {
//         controllers.forEach((controller: Controller) => {
//             this.app.use(this.apiRoute, controller.router)
//         })
//     }

//     private initializeGraphql(): void {
//         this.app.use('/graphql', graphqlHTTP({
//             schema,
//             graphiql: true
//         }))
//     }

//     public listen(): void {
//         this.app.listen(this.port, () => {
//             console.log(`App listening on the port ${this.port}`)
//             console.log(`NODE_ENV is ${String(process.env.NODE_ENV)}`)
//         })
//     }
// }

// export default App