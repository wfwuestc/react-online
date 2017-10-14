import React, {Component} from 'react'
import '../css/TodoInput.css'

// export default class TodoInput extends Component {
//   render() {
//     return <input type="text" value={this.props.content}
//                   className="TodoInput"
//                   onKeyPress={this.submit.bind(this)} onChange={this.changeTitle.bind(this)}/>
//   }
//
//   submit(e) {
//     if (e.key === 'Enter') {
//       console.log('按回车了')
//       this.props.onSubmit(e)
//     }
//   }
//
//   changeTitle(e) {
//     this.props.onChange(e)
//   }
// }

function submit (props, e) {
    if (e.key === 'Enter') {
      if (e.target.value.trim() !== '') {
              props.onSubmit(e)
            }
  }
}
function changeTitle (props, e) {
  props.onChange(e)
}

export default function (props) {
  return <input type="text" value={props.content}
                className="TodoInput"
                onChange={changeTitle.bind(null, props)}
                onKeyPress={submit.bind(null, props)}
                placeholder={"请输入待办事项 然后回车"}
  />
}
