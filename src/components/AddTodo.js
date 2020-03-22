import React from 'react'
import {connect} from 'react-redux'
import {AddTodoAction} from '../redux/actions'

const AddTodo = ({dispatch}) => {
    let input
    return (
        <div>
            <p>Add todo item:</p>
            <input type="text" name="todo" id="todo" placeholder="请输入待办事项" aria-label="请输入待办事项" ref={text => input = text}/>
            <button onClick={() => {
                if(input.value.trim() == "") return
                dispatch(AddTodoAction(input.value))
            }}>添加</button>
        </div>
    )
}

export default connect()(AddTodo)
