import TodoList from '../pages/TodoList'

import { Routes, Route } from 'react-router-dom'

const RouterContent = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoList />} />
        </Routes>
    )
}

export default RouterContent