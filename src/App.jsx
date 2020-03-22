import React from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
require('./static/style/app.css')

export default class App extends React.Component {
    render() {
        return (
            <>
                <AddTodo />
                <TodoList />
            </>
        )
    }
}
