import dotenv from 'dotenv'
import app from './app'

import db from './utils/db'

// import Controller from './types/controller.interface'
// import TodoController from './resources/todo/todo.controller'
// import { apiRoute } from './config/index'

dotenv.config()

db.connect()

// const controllers: Controller[] = [
//     new TodoController(),
// ]

const port = Number(process.env.PORT || 5000)

app.listen(port, () => {
    console.log(`App listening on the port ${port}`)
    console.log(`NODE_ENV is ${String(process.env.NODE_ENV)}`)
})