import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import reducers from './redux/reducers'
import 'antd/dist/antd.min.css';

const loggerMiddleware = createLogger()

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware, // 允许我们dispatch函数
        loggerMiddleware // 用来打印action日志
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)
