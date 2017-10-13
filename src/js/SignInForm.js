// import React, {Component} from 'react'
//
// export default class SignInForm extends Component {
//   render() {
//     return (
//         <form className="signIn" onSubmit={this.props.onSubmit}> {/* 登录*/}
//           <div className="row">
//             <label>用户名</label>
//             <input type="text" value={this.props.formData.username}
//                    onChange={this.changeFormData.bind(null, 'username')}/>
//           </div>
//           <div className="row">
//             <label>密码</label>
//             <input type="password" value={this.props.formData.password}
//                    onChange={this.changeFormData.bind(null, 'password')}/>
//           </div>
//           <div className="row actions">
//             <button type="submit">登录</button>
//             <a href="#" onClick={this.props.onForgotPassword}>忘记密码了？</a>
//           </div>
//         </form>
//     )
//   }
// }
import React from 'react'
import Status from './Status'

export default function (props) {
  return (
      <form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
        <div className="row username">
          <label>用户名</label>
          <input type="text" value={props.formData.username}
                   onChange={props.onChange.bind(null, 'username')}/>
          <Status />
        </div>
        <div className="row password">
          <label>密码</label>
          <input type="password" value={props.formData.password}
                 onChange={props.onChange.bind(null, 'password')}/>
          <Status />
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
          <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
        </div>
      </form>
  )
}