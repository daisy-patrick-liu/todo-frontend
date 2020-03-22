import React from 'react'
import {TODOS_TYPE,updateTodoAction, getAllTodos} from '../redux/actions'
import { connect } from 'react-redux'
import {Table} from 'antd'
import {CheckCircleTwoTone} from '@ant-design/icons'

const getFilteredTodos = (todos, filter) => {
    switch (filter) {
        case TODOS_TYPE.SHOW_ALL:
            return todos
        case TODOS_TYPE.SHOW_COMPLETE:
            return todos.filter(item => item.status == 2)
        case TODOS_TYPE.SHOW_ACTIVE:
            return todos.filter(item => item.status == 1)
        default:
            throw new Error('invalid filter')
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: TODOS_TYPE.SHOW_ALL
        }
        this.onSelect = this.onSelect.bind(this)
        this.columns = [
            {
                title: 'todo item',
                dataIndex: 'content'
            },
            {
                title: 'status',
                render: (text, record, index) => {
                    if(record.status == 1) {
                        return '未完成'
                    } else if(record.status == 2) {
                        return (
                            <>
                                <CheckCircleTwoTone />
                                &nbsp;&nbsp;已完成
                            </>
                        )
                    } else if(record.status == 3) {
                        return '已删除'
                    }
                },
                filters: [
                    {
                        text: '未完成',
                        value: 1
                    },
                    {
                        text: '已完成',
                        value: 2
                    },
                    {
                        text: '已删除',
                        value: 3
                    }
                ],
                onFilter: (value, record) => record.status == value
            },
            {
                title: 'operation',
                render: (text, record, index) => {
                    if(record.status == 1) {
                        // ‘完成’ & ‘删除’
                        return (
                            <>
                                <button onClick={() => this.props.updateTodo({"id":record.id, status:2})}>完成</button>
                                <button onClick={() => this.props.updateTodo({"id":record.id, status:3})}>删除</button>
                            </>
                        )
                    } else if(record.status == 2) {
                        // ‘删除’
                        return <button onClick={() => this.props.updateTodo({"id":record.id, status:3})}>删除</button>
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

    onSelect(e) {
        this.setState({
            filter: e.target.value
        })
    }

    render() {
        let itemsToShow = getFilteredTodos(this.props.todos, this.state.filter)

        return (
            <div id="listPart">
                {/* <label>
                   <input
                       type="radio"
                       value={TODOS_TYPE.SHOW_ALL}
                       checked={this.state.filter===TODOS_TYPE.SHOW_ALL}
                       onChange={this.onSelect}/>
                    all
               </label>
                <label>
                    <input
                        type="radio"
                        value={TODOS_TYPE.SHOW_ACTIVE}
                        checked={this.state.filter===TODOS_TYPE.SHOW_ACTIVE}
                        onChange={this.onSelect}/>
                    active
                </label>
                <label>
                    <input
                        type="radio"
                        value={TODOS_TYPE.SHOW_COMPLETE}
                        checked={this.state.filter===TODOS_TYPE.SHOW_COMPLETE}
                        onChange={this.onSelect}/>
                    completed
                </label> */}
                {/* <ul>
                    {
                        itemsToShow.map((item) => <li
                            key={item.id}
                            onClick={() => this.props.updateTodo({"id":item.id, status:2})}
                            style={item.status==2 ? {color: 'green'} : null}
                        >
                            <span className="name">{item.content}</span>
                            <span className="state">{item.status==2 ? '已完成' : '未完成'}</span>
                        </li>)
                    }
                </ul> */}
                <Table columns={this.columns} dataSource={itemsToShow} rowKey="id" width="80%" 
                    // rowClassName={(record, index) => record.status == 2 ? "completedRow" : "normalRow"} 
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