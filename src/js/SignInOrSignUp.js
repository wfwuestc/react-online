import React, {Component} from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import {log} from "./App"

export default class SignInOrSignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'signIn'
    }
  }

  switch (e) {
    this.setState({
      selected: e.target.value
    })
  }
  changeState (e){
    let a = e.target.parentNode.children
    for(var i = 0; i<a.length; i++){
      a[i].setAttribute('class', '')
    }
    e.target.setAttribute('class','checked')
  }
  render () {
    return (
        <div className="signInOrSignUp">
          <nav>
            <label onClick={this.changeState.bind(this)}>
              <input type="radio" value="signUp"
                     checked={this.state.selected === 'signUp'}
                     onChange={this.switch.bind(this)}
              /> 注册</label>
            <label onClick={this.changeState.bind(this)} className={'checked'}>
              <input type="radio" value="signIn"
                     checked={this.state.selected === 'signIn'}
                     onChange={this.switch.bind(this)}
              /> 登录</label>
          </nav>
          <div className="panes">
            {this.state.selected === 'signUp' ?
                <SignUpForm formData={this.props.formData}
                            onSubmit={this.props.onSignUp}
                            onChange={this.props.onChange}
                />
                : null}
            {this.state.selected === 'signIn' ?
                <SignInForm formData={this.props.formData}
                            onChange={this.props.onChange}
                            onSubmit={this.props.onSignIn}
                            onForgotPassword={this.props.onForgotPassword}
                />
                : null}
          </div>
        </div>
    )
  }
}