import {get, post} from '../api'

export const deleteTodo = id => ({
    id,
    type: "DELETE_TODO"
})

const filterCompleteOrNot = (filter) => ({
    filter,
    type:"FILTER_COMPLETE_OR_NOT"
})

export const TODOS_TYPE = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETE: "SHOW_COMPLETE",
    SHOW_ACTIVE: "SHOW_ACTIVE"
}

export const requestTodos = () => ({
    type: "REQUEST_TODOS"
})

const receiveTodos = items => ({
    items,
    type: "RECEIVE_TODOS"
})

export function getAllTodos() {
    return function (dispatch) {

        // 首次 dispatch：更新应用的 state 来通知
        // API 请求发起了。
    
        // dispatch(requestTodos())
    
        // thunk middleware 调用的函数可以有返回值，
        // 它会被当作 dispatch 方法的返回值传递。
    
        // 这个案例中，我们返回一个等待处理的 promise。
        // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
    
        return get(`/list`)
        //   .then(
            // response => response.json(),
            // 不要使用 catch，因为会捕获
            // 在 dispatch 和渲染中出现的任何错误，
            // 导致 'Unexpected batch number' 错误。
            // https://github.com/facebook/react/issues/6895
            //  error => console.log('An error occurred.', error)
        //   )
          .then(json => {
            // 可以多次 dispatch！
            // 这里，使用 API 请求结果来更新应用的 state。
            return dispatch(receiveTodos(json.list.rows))
          })
      }
}

const todoAdded = (todo) => ({
    todo,
    type: "ADD_TODO"
})

export function AddTodoAction(content) {
    return function(dispatch) {
        return post('/create', {content}).then(json => {
            return dispatch(todoAdded(json.todo))
        }, reason => {
            console.error(reason)
        })
    }
}

const updateTodo = todo => ({
    todo,
    type: "UPDATE_TODO"
})

export function updateTodoAction(params) {
    console.log(params)
    return function(dispatch) {
        return post('/update', params).then(json => {
            return dispatch(updateTodo(json.todo))
        }, reason => {
            console.error(reason)
        })
    }
}
