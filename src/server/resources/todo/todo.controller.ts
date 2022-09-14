import { Router, Request, Response, NextFunction } from 'express'
import Controller from '../../types/controller.interface'
import DB, { Doc } from '../../utils/db'
import Todo from '../../models/Todo'
import CustomError from '../../middleware/customError'

/*
 * customers controller
 *  @path 'baseUrl/sample/customers
 *
 */

class TodoController implements Controller {
    public path = '/todo'
    public router = Router()
    public db = DB

    constructor() {
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void {
        this.router.get(this.path, async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            try {
                this.db.connect()
                const Todos = await Todo.find().lean() as Doc[]
                const result = await Todos
                    ? Todos.map((doc) => {
                        return this.db.convertDocToObj(doc)
                    })
                    : []
                this.db.disconnect()

                res.setHeader(
                    'Access-Control-Allow-Origin', 'http://localhost:3000'
                )
    
                return res.status(200).json({ result })
            } catch (error) {
                next(new CustomError(400, 'failed to fetch customers'))
            }
        })

        this.router.post(this.path, async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {

            try {
                const { todo } = req.body

                this.db.connect()

                const newTodo = await Todo.create({
                    todo
                })

                this.db.disconnect()

            
                if(!newTodo) throw Error()
                
                return res.status(200).json({ result: newTodo })
            } catch (error) {
                next(new CustomError(500, 'failed to post todo'))
            }
        })

        this.router.put(this.path, async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            const {
                body: { todo, _id },
            } = req

            try {
                this.db.connect()

                const updatedTodo = await Todo.findByIdAndUpdate(
                    _id,
                    {
                        $set: {
                            todo
                        }
                    },
                    {
                        returnDocument: 'after'
                    }
                )

                this.db.disconnect()
    
                return res.status(200).json({ result: updatedTodo })
            } catch (error) {
                next(new CustomError(500, 'failed to post todo'))
            }
        })

        this.router.delete(this.path, async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            const {
                body: { _id },
            } = req

            try {
                this.db.connect()

                await Todo.findByIdAndDelete({
                    _id
                })

                this.db.disconnect()
    
                return res.status(200).json({})
            } catch (error) {
                next(new CustomError(500, 'failed to post todo'))
            }
        })
    }
}

export default TodoController