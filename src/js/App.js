import React, {Component} from 'react'
import '../css/App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import '../css/reset.css'
// import * as localStore from './localStore'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'
import Clock from './Clock'
import Weather from './Weather'

var log = console.log.bind(console)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || '',
      newTodo: '',
      todoList: [],
    }
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }

  }

  render() {
    log('布局中')
    let todos = this.state.todoList
        .filter((item) => !item.deleted)
        .map((item, index) => {
          return ( // 为什么这里要加个括号？ 返回多行
              <TodoItem todo={item} onToggle={this.toggle.bind(this)}
                        onDelete={this.delete.bind(this)} key={index}/>
          )
        })
    return (
        <div className="App">
          <Clock/>
          <Weather/>
          <h1>{this.state.user.username || '我'}的待办
            {this.state.user.id ? <div className='logout' onClick={this.signOut.bind(this)}></div> : null}
          </h1>
          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo}
                       onSubmit={this.addTodo.bind(this)}
                       onChange={this.changeTitle.bind(this)}/>
          </div>
          <ol className="todoList">
            {todos}
          </ol>

          {this.state.user.id ?
              null :
              <UserDialog
                  onSignUp={this.onSignUpOrSignIn.bind(this)}
                  onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
        </div>
    )
  }

  componentWillUpdate() {
    log('要更新了')
  }

  componentWillMount() {
    log('要加载了')
    log(this.state)
  }

  componentDidUpdate() {
    log('更新完毕')
    // localStore.save('todoList', this.state.todoList) // 每次更改后保存
    // save('todoList', this.state.todoList)
    let todoList = this.state.todoList.filter((item) => !item.deleted)
    log(todoList)
    for (var i = 0; i < todoList.length; i++) {
      let liNode = document.querySelector('.todoList').children[i]
      log(liNode)
      if (todoList[i].status === 'completed') {

        liNode.firstChild.setAttribute('class', 'completed TodoItem')
      } else {
        liNode.firstChild.setAttribute('class', 'TodoItem')
      }
    }
  }

  addTodo(event) {
    console.log('要添加代办了')
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false,
    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList,
      })
    }, (error) => {
      console.log(error)
    })
  }

  changeTitle(e) {
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList,

    })
  }

  toggle(e, todo) {
    log('要切换状态了')
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    // if (todo.status === 'completed') {
    //   e.target.parentNode.setAttribute('class', 'completed TodoItem')
    // } else {
    //   e.target.parentNode.setAttribute('class', 'TodoItem')
    // }
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  delete(e, todo) {
    log('要删除了')
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }

  onSignUpOrSignIn(user) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
    let user1 = getCurrentUser()
    if (user1) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }

  signOut() {
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
}

export default App


export {log}