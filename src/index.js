import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import reducers from './redux/reducers'
import 'antd/dist/antd.min.css'
import {asyncComponent} from './util/asyncComponent'
require('./static/style/app.css')

const loggerMiddleware = createLogger()

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware, // 允许我们dispatch函数
        loggerMiddleware // 用来打印action日志
    )
)

// const AsyncApp = asyncComponent(() => import('./App'))
const AddTodo = asyncComponent(() => import(/* webpackChunkName: "AddTodo" */ './components/AddTodo'))
const TodoList = asyncComponent(() => import(/* webpackChunkName: "TodoList" */ './components/TodoList'))

ReactDOM.render(
    <Provider store={store}>
        <AddTodo />
        <TodoList />
    </Provider>, 
    document.getElementById('root')
)
