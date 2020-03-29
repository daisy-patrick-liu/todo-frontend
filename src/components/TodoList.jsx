import React from 'react'
import {TODOS_TYPE,updateTodoAction, getAllTodos} from '../redux/actions'
import { connect } from 'react-redux'
import {Table, Button, Popconfirm} from 'antd'

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: 'todo item',
                dataIndex: 'content',
                render: (text, record, index) => {
                    if(record.status == 2) {
                        return <span className="completedText">{record.content}</span>
                    } else {
                        return <span>{record.content}</span>
                    }
                }
            },
            {
                title: 'status',
                render: (text, record, index) => {
                    if(record.status == 1) {
                        return 'incomplete'
                    } else if(record.status == 2) {
                        return <span className="completedText">completed</span>
                    } else if(record.status == 3) {
                        return 'deleted'
                    }
                },
                filters: [
                    {
                        text: 'incomplete',
                        value: 1
                    },
                    {
                        text: 'complete',
                        value: 2
                    }
                ],
                onFilter: (value, record) => record.status == value
            },
            {
                title: 'operation',
                render: (text, record, index) => {
                    const title = 'Are you sure to delete this item?'
                    if(record.status == 1) {
                        // ‘完成’ & ‘删除’
                        return (
                            <>
                                <Button onClick={() => this.props.updateTodo({"id":record.id, status:2})}>complete</Button>
                                <Popconfirm placement="topLeft" onConfirm={() => this.props.updateTodo({"id":record.id, status:3})} title={title} okText="Yes" cancelText="No">
                                    <Button style={{marginLeft: '12px'}}>delete</Button>
                                </Popconfirm>
                            </>
                        )
                    } else if(record.status == 2) {
                        // ‘删除’
                        return <Popconfirm placement="topLeft" onConfirm={() => this.props.updateTodo({"id":record.id, status:3})} title={title} okText="Yes" cancelText="No">
                            <Button>delete</Button>
                        </Popconfirm>
                    } else {
                        return null
                    }
                }
            }
        ]
    }

    componentDidMount() {
        this.props.getTodos()
    }

    render() {
        let itemsToShow = this.props.todos.filter(item => item.status !== 3)

        return (
            <div id="listPart">
                <Table columns={this.columns} dataSource={itemsToShow} rowKey="id" width="80%" 
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        todos: state.todos
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        updateTodo: params => dispatch(updateTodoAction(params)),
        getTodos: () => dispatch(getAllTodos())
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)