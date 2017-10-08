import React, {Component} from 'react'
import '../css/App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import '../css/reset.css'
import * as localStore from './localStore'

var APP_ID = 'f7gUoKO1Y7L5NPCRXyxieomG-gzGzoHsz';
var APP_KEY = 'fGCb236NSFzxe54QQict80H5';
var AV = require('leancloud-storage');

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})


var log = console.log.bind(console)
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || [],
    }
  }

  render() {
    log('布局中')
    let todos = this.state.todoList
        .filter((item) => !item.deleted)
        .map((item, index) => {
          return ( // 为什么这里要加个括号？这是动手题3 🐸
              <li key={index}>
                <TodoItem todo={item} onToggle={this.toggle.bind(this)}
                          onDelete={this.delete.bind(this)}/>
              </li>
          )
        })
    return (
        <div className="App">
          <h1>我的待办</h1>
          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo}
                       onSubmit={this.addTodo.bind(this)}
                       onChange={this.changeTitle.bind(this)}/>
          </div>
          <ol className="todoList">
            {todos}
          </ol>
        </div>
    )
  }

  componentWillUpdate() {
    log('要更新了')
  }
  componentDidUpdate() {
    log('更新完毕')
    localStore.save('todoList', this.state.todoList) // 每次更改后保存
  }

  addTodo(e) {
    console.log('要添加代办了')
    this.state.todoList.push({
      id: idMaker(),
      title: e.target.value,
      status: null,
      deleted: false,
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList,
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
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
  }

  delete(e, todo) {
    log('要删除了')
    todo.deleted = true
    this.setState(this.state)
  }

}

export default App

let id = 0

function idMaker() {
  id += 1
  return id
}

export {log}