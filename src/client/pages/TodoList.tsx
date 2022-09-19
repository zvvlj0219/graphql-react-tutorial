import { useEffect, useState, useCallback } from 'react'
import Button from '../components/Button'
import { useTodo, ActionType } from '../Store/Store'
import { useLoading } from '../utils/useLoading'
import TodoForm from '../components/TodoForm'
import type { Todo } from '../generated/graphql'
import styles from '../styles/app.modules.css'
import { GET_TODOS } from '../graphql/queries/todoQueries'
// import { ADD_TODO } from '../graphql/mutation/todoMutations'
import { useGetTodosQuery, useEditTodoMutation,EditTodoMutationVariables } from '../generated/graphql'
// import { 
//     useMutation,
//     useQuery,
//     MutationFunctionOptions,
//     DefaultContext,
//     ApolloCache
// } from '@apollo/client';

const TodoList = () => {
    // const {
    //     state: { loading },
    //     startLoad,
    //     finishLoad
    // } = useLoading()

    const [isValid, setIsValid] = useState<boolean>(true)
    const [newTodo, setNewTodo] = useState<string>('')

    // const { loading: queryLoading, error: queryError, data: todoList_fromGraphql } = useQuery(GET_TODOS)
    const { loading: queryLoading, error: queryError, data: todoList_fromGraphql } = useGetTodosQuery()

    console.log(todoList_fromGraphql)

    // const { state, dispatch } = useTodo()
    // const initTodo = useCallback((todoList: Todo[]) => {
    //     dispatch({
    //         type: ActionType.INIT_TODO,
    //         initialState: todoList
    //     })
    // }, [])

    const onChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewTodo((event.target as HTMLInputElement).value)
        },
        [setNewTodo]
    )

    // const [addTodo] = useMutation(ADD_TODO, {
    //     variables: { todo: newTodo },
    //     update(cache, { data: {addTodo }}){
    //         const { todos } = cache.readQuery({ query: GET_TODOS }) as {
    //             todos: Todo[]
    //         }

        
    //         cache.writeQuery({
    //             query: GET_TODOS,
    //             data: {
    //                 todos: [...todos, addTodo ]
    //             }
    //         })
    //     }
    // })
    const [addTodo] = useEditTodoMutation({
        variables: { todo: newTodo, id: '' },
        update(cache, { data }){
            if(!data) throw new Error()

            const { todos } = cache.readQuery({ query: GET_TODOS }) as {
                todos: Todo[]
            }

            cache.writeQuery({
                query: GET_TODOS,
                data: {
                    todos: [...todos, data.editTodo ]
                }
            })
        }
    })

    const addTodoHandler = () => {
        if (newTodo.length < 4) {
            setIsValid(false)
        } else {
            addTodo()
            setIsValid(true)
            setNewTodo('')
        }
    }

    /*
    * @rest api
    *
    * const addTodoHandler = useCallback(
    *     async (_newTodo: string) => {
    *         if (_newTodo.length < 4) {
    *             setIsValid(false)
    *         } else {
    *             const url = process.env.SERVER_BASEURL_DEVELOPMENT
    *             if (!url) throw new Error('notfound fetch url')

    *             console.log(_newTodo)

    *             const res = await fetch(`${url}/todo`, {
    *                 method: 'POST',
    *                 headers: {
    *                     'Content-Type': 'application/json'
    *                 },
    *                 mode: 'cors',
    *                 body: JSON.stringify({
    *                     todo: _newTodo
    *                 })
    *             })
    *             const { result } = await res.json()

    *             dispatch({
    *                 type: ActionType.ADD_TODO,
    *                 payload: {
    *                     id: result.id,
    *                     todo: result.todo
    *                 }
    *             })
    *             setIsValid(true)
    *             setNewTodo('')
    *         }
    *     },
    *     [dispatch]
    * )
    */

    // useEffect(() => {
    //     startLoad()
    //     if(!queryLoading && !queryError && todoList_fromGraphql) {
    //         console.log(todoList_fromGraphql)
    //         initTodo(todoList_fromGraphql.todos as Todo[])
    //         finishLoad()
    //     }
    // }, [queryError, queryLoading ,todoList_fromGraphql])


    return (
        <>
            <div className={styles.textfield_container}>
                <input
                    type='text'
                    placeholder='...'
                    className={styles.textfeild}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeHandler(e)
                    }}
                    value={newTodo}
                />
                <Button
                    className={styles.add_button}
                    onClick={() => addTodoHandler()}
                >
                    add
                </Button>
                <div
                    className={`${isValid && styles.valid} ${
                        styles.validation_msg
                    }`}
                >
                    Enter at least 5 characters
                </div>
            </div>

            <div className={styles.todo_list_container}>
            {queryLoading && <h3>...loading</h3>}
            {!queryLoading && todoList_fromGraphql?.todos &&
                todoList_fromGraphql.todos.map((data) => (
                    <div className={styles.todo_container} key={data?.id}>
                        <TodoForm id={data?.id!} todo={data?.todo!} />
                    </div>
            ))}
            {!queryLoading && todoList_fromGraphql?.todos!.length === 0 && (
                <>
                    <h3 style={{ textAlign: 'center' }}>
                        You have no Todos
                        <br />
                        Lets add new Todo!
                    </h3>
                </>
            )}
            </div>
        </>
    )
}

export default TodoList