import React, {Component} from 'react'
import '../css/TodoItem.css'

export default class TodoItem extends Component {
  render() {
    return (
        <li>
          <div className='TodoItem' onClick={this.toggle.bind(this)}>
            <input type="checkbox" checked={this.props.todo.status === 'completed'}
                   className='magic-checkbox'
                   onChange={this.toggle.bind(this)}
            />
            <label className="title">{this.props.todo.title}</label>
          </div>
          <div className='delete' onClick={this.delete.bind(this)}></div>
        </li>
    )
  }

  toggle(e) {
    this.props.onToggle(e, this.props.todo)
  }

  delete(e) {
    this.props.onDelete(e, this.props.todo)
  }
}
