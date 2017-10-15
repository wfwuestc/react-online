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
    this.check(username, password, email, success, error)
  }

  check(username, password, email, success, error) {
    var userCheck = /\w{3,}/.test(username)
    var pwCheck = /\w{6,}/.test(password)
    var emailCheck = /\w+@\w+/.test(email)
    let count = 0
    if (!userCheck) {
      count += 1
    }
    if (!pwCheck) {
      count += 2
    }
    if (!emailCheck && (email !== 'no')) {
      count += 4
    }
    log(count)
    this.showCheck(count)
    if (count === 0 && email === 'no'){
        signIn(username, password, success, error)

    } else {
      if (count === 0) {
        signUp(email, username, password, success, error)
      }
    }

  }

  showCheck(key) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    switch (key) {
      case 1:
        log('username must have 3 char')
        document.querySelector('.username>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.username = ""
        this.setState(stateCopy)
        break
      case 2:
        log('password must have 6 char')
        document.querySelector('.password>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.password = ""
        this.setState(stateCopy)
        break
      case 3:
        log('username must have 3 char')
        log('password must have 6 char')
        document.querySelector('.password>.status').setAttribute('class', 'status wrong')
        document.querySelector('.username>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.password = ""
        stateCopy.formData.username = ""
        this.setState(stateCopy)
        break
      case 4:
        log('email must have @')
        document.querySelector('.email>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.email = ""
        this.setState(stateCopy)
        break
      case 5:
        log('email must have @')
        log('username must have 3 char')
        document.querySelector('.username>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.username = ""
        document.querySelector('.email>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.email = ""
        this.setState(stateCopy)
        break
      case 7:
        log('username must have 3 char')
        log('email must have @')
        log('password must have 3 char')
        document.querySelector('.password>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.password = ""
        document.querySelector('.username>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.username = ""
        document.querySelector('.email>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.email = ""
        this.setState(stateCopy)
        break
      case 6:
        log('email must have @')
        log('password must have 3 char')
        document.querySelector('.password>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.password = ""
        document.querySelector('.email>.status').setAttribute('class', 'status wrong')
        stateCopy.formData.email = ""
        this.setState(stateCopy)
        break

      default:
        log('error')
    }
  }

  signIn(e) {
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user) => {
      log('login user', user)
      this.props.onSignIn.call(null, user)
      document.querySelector('.UserDialog-Wrapper').setAttribute('class', 'UserDialog-Wrapper hidePanel')
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          log('用户名与密码不匹配')
          break
        case 211:
          log('找不到用户')
          break
        default:
          alert(error)
          break
      }
    }
    this.check(username, password, 'no', success, error)
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
            <h1>Welcome</h1>
            {this.state.selectedTab === 'signInOrSignUp' ? <SignInOrSignUp
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
    sendPasswordResetEmail(this.state.formData.email, this.returnToSignIn())

  }
}