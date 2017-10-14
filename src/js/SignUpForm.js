// import React, {Component} from 'react';
// export default class SignUpForm extends Component {
//   render() {
//     return (
//         <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
//           <div className="row">
//             <label>邮箱</label>
//             <input type="text" value={this.props.formData.email}
//                    onChange={this.props.onChange.bind(null, 'email')}/>
//           </div>
//           <div className="row">
//             <label>用户名</label>
//             <input type="text" value={this.props.formData.username}
//                    onChange={this.props.onChange.bind(null, 'username')}/>
//           </div>
//           <div className="row">
//             <label>密码</label>
//             <input type="password" value={this.props.formData.password}
//                    onChange={this.props.onChange.bind(null, 'password')}/>
//           </div>
//           <div className="row actions">
//             <button type="submit">注册</button>
//           </div>
//         </form>
//         )
//   }
// }
import React from 'react'
import Status from './Status'
export default function (props) {
  return (
      <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
        <div className="row email">
          <label></label>
          <input type="text" value={props.formData.email}
                 onChange={props.onChange.bind(null, 'email')}
                 placeholder={"请输入邮箱"}
          />
          <Status />
        </div>
        <div className="row username">
          <label></label>
          <input type="text" value={props.formData.username}
                 onChange={props.onChange.bind(null, 'username')}
                 placeholder={"请输入帐号 至少3字符"}
          />

          <Status />
        </div>
        <div className="row password">
          <label></label>
          <input type="password" value={props.formData.password}
                 onChange={props.onChange.bind(null, 'password')}
                 placeholder={"请输入密码 至少6字符"}
          />
          <Status />
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
  )
}