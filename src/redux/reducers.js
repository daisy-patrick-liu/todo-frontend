import {combineReducers} from 'redux'
import {get, post} from '../api'

const initialState = {
    todoItems: [],
    visibilityFilter: "SHOW_ALL"
}

const todos = (state=initialState.todoItems, action) => {
    switch (action.type) {
        case "REQUEST_TODOS":
            return state
        case "RECEIVE_TODOS":
            return action.items
        case "ADD_TODO":
            return [
                ...state,
                action.todo
            ]
        case "UPDATE_TODO":
            // status类型从string到integer
            if(action.todo.status) {
                action.todo = {...action.todo, status: action.todo.status*1}
            }
            let newState =  state.map(v => {
                if (v.id == action.todo.id) {
                    return action.todo
                }
                return v
            })
            return newState
        case "DELETE_TODO":
            return state.map(v => {
                if(v.id == action.id) {
                    return {...v, status:3}
                }
                return v
            })
        default:
            return state
    }
}

const filterCompleteOrNot = (state=initialState.visibilityFilter, action) => {
    switch (action.type) {
        case "FILTER_COMPLETE_OR_NOT":
            return action.filter
        default:
            return state
    }
}

export default combineReducers({
    todos,
    filterCompleteOrNot
})
