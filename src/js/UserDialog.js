import React, {Component} from 'react'
import '../css/UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import {log} from './App'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgetPasswordForm'

export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp',
      formData: {
        username: '',
        password: '',
        email: '',
      },
    }
  }


  signUp(e) {
    e.preventDefault()
    let {email, username, password} = this.state.formData
    let success = (user) => {
      this.props.onSignUp.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 201:
          alert('密码为空')
          break
        case 202:
          alert('用户名已被占用')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email, username, password, success, error)
  }

  signIn(e) {
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user) => {
      this.props.onSignIn.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          alert('用户名与密码不匹配')
          break
        case 211:
          alert('找不到用户')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }


  changeFormData(key, e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }

  render() {
    return (
        <div className="UserDialog-Wrapper">
          <div className="UserDialog">
            {this.state.selectedTab === 'signInOrSingUp' ? <SignInOrSignUp
                onChange={this.changeFormData.bind(this)}
                formData={this.state.formData}
                onSignIn={this.signIn.bind(this)}
                onSignUp={this.signUp.bind(this)}
                onForgotPassword={this.showForgotPassword.bind(this)}
            /> : <ForgotPasswordForm
                formData={this.state.formData}
                onSubmit={this.resetPassword.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onSignIn={this.returnToSignIn.bind(this)}
            />}
          </div>
        </div>
    )
  }

  returnToSignIn() {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }

  showForgotPassword() {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }

  resetPassword(e) {
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)

  }
}