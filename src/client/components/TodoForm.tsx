import React, { useState, useCallback, useRef } from 'react'
import Button from './Button'
import { useTodo, ActionType } from '../Store/Store'
import type { Todo } from '../types/todo'
import styles from '../styles/app.modules.css'
import { useMutation } from '@apollo/client'
import { GET_TODOS } from '../graphql/queries/todoQueries'
import { DELETE_TODO, EDIT_TODO } from '../graphql/mutation/todoMutations'

const TodoForm = ({ id, todo = '' }: Todo) => {
    const inputElement = useRef<HTMLInputElement>(null)
    // const { dispatch } = useTodo()

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isDelete, setIsDelte] = useState<boolean>(true)
    const [textField, setTextFeild] = useState<string>(todo)

    const onFocusHandler = useCallback(
        (cond: 'focus' | 'blur') => {
            if (cond === 'focus') {
                setIsEdit(true)
                setIsDelte(false)
            }

            if (cond === 'blur' && inputElement.current !== null) {
                setIsEdit(false)
                setIsDelte(true)
                // call editTodoHandler
                inputElement.current.blur()
            }
        },
        [setIsEdit, setIsDelte]
    )

    const onChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTextFeild((event.target as HTMLInputElement).value)
        },
        [setTextFeild]
    )

    const onKeyPressHandler = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            onFocusHandler('blur')
        }
    }

    const [editTodo] = useMutation(EDIT_TODO, {
        variables: { id, todo: textField },
        refetchQueries: [{
            query: GET_TODOS
        }]
    })

    const editTodoHandler = async (new_todo: string) => {
        if (new_todo === todo) return onFocusHandler('blur')

        editTodo()
    }

    /*
    * @ rest api
    *
    * const editTodoHandler = useCallback(
    *     async (new_todo: string) => {
    *         if (new_todo === todo) return onFocusHandler('blur')

    *         const url = process.env.SERVER_BASEURL_DEVELOPMENT
    *         const res = await fetch(`${url}/todo`, {
    *             method: 'PUT',
    *             headers: {
    *                 'Content-Type': 'application/json'
    *             },
    *             body: JSON.stringify({
    *                 id,
    *                 todo: new_todo
    *             })
    *         })
    *         const { result } = await res.json()

    *         onFocusHandler('blur')

    *         dispatch({
    *             type: ActionType.EDIT_TODO,
    *             payload: {
    *                 id,
    *                 todo: result.todo
    *             }
    *         })
    *     },
    *     [id, dispatch, onFocusHandler, todo]
    * )
    *
    */

    const [deleteTodo] = useMutation(DELETE_TODO, {
        variables: { id },
        refetchQueries: [{
            query: GET_TODOS
        }]
    })

    const deleteTodoHandler = () => {
        deleteTodo()
    }

    /*
    * @rest api
    * 
    * const deleteTodoHandler = useCallback(async () => {
    *     const url = process.env.SERVER_BASEURL_DEVELOPMENT
    *     await fetch(`${url}/todo`, {
    *         method: 'DELETE',
    *         headers: {
    *             'Content-Type': 'application/json'
    *         },
    *         body: JSON.stringify({
    *             id
    *         })
    *     })

    *     dispatch({
    *         type: ActionType.DELETE_TODO,
    *         payload: {
    *             id
    *         }
    *     })
    * }, [id, dispatch])
    * */

    return (
        <>
            <input
                type='text'
                ref={inputElement}
                value={textField}
                className={styles.todo_input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e)
                }}
                onFocus={() => onFocusHandler('focus')}
                onBlur={() => {
                    editTodoHandler(textField)
                }}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    onKeyPressHandler(e)
                }}
            />
            <div className={styles.todo_button_wrapper}>
                <Button
                    className={`
                        ${isEdit && styles.edit_button_active}
                        ${styles.edit_button}
                    `}
                    // click to call editTodoHandler
                    onClick={() => onFocusHandler('blur')}
                >
                    edit
                </Button>
                <Button
                    className={`
                    ${isDelete && styles.delete_button_active}
                    ${styles.delete_button}
                    `}
                    onClick={() => deleteTodoHandler()}
                >
                    delete
                </Button>
            </div>
        </>
    )
}

export default TodoForm