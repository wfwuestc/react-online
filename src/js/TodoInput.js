import React, {Component} from 'react'
import '../css/TodoInput.css'

export default class TodoInput extends Component {
  render() {
    return <input type="text" value={this.props.content}
                  className="TodoInput"
                  onKeyPress={this.submit.bind(this)} onChange={this.changeTitle.bind(this)}/>
  }

  submit(e) {
    if (e.key === 'Enter') {
      console.log('按回车了')
      this.props.onSubmit(e)
    }
  }

  changeTitle(e) {
    this.props.onChange(e)
  }
}