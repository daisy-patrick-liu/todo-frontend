import React from 'react'
import {connect} from 'react-redux'
import {AddTodoAction} from '../redux/actions'
import {Input} from 'antd'

const {Search} = Input

const AddTodo = ({dispatch}) => {
    let input
    return (
        <div>
            <p>Add todo item:</p>
            <Search
                placeholder="Please enter todo item"
                enterButton="Add item"
                size="large"
                id="theInput"
                onSearch={value => {
                    if(value.trim() == "") return
                    const theInput = document.getElementById("theInput")
                    theInput.value = ""
                    dispatch(AddTodoAction(value))
                }}
            />
            {/* <Input type="text" name="todo" id="todo" placeholder="Please enter todo item" aria-label="Please enter todo item" ref={text => input = text}/>
            <button onClick={() => {
                if(input.value.trim() == "") return
                input.value = ""
                dispatch(AddTodoAction(input.value))
            }}>Add item</button> */}
        </div>
    )
}

export default connect()(AddTodo)
