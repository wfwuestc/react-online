import React, {Component} from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import {log} from "./App"
import {signIn} from "./leanCloud"

export default class SignInOrSignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'signIn'
    }
  }

  changeState (value, e){
    let a = e.target.parentNode.children
    for(var i = 1; i<a.length; i++){
      a[i].setAttribute('class', '')
    }
    e.target.setAttribute('class','checked')
    this.setState({
      selected: value
    })
    if(value === 'signIn') {
      document.querySelector('nav>.inkBar').setAttribute('style', 'transform: translate3d(3.5em,0em,0em)')
    }else if (value === 'signUp') {
      document.querySelector('nav>.inkBar').setAttribute('style', 'transform: translate3d(-3.5em,0em,0em)')
    }
  }
  render () {
    return (
        <div className="signInOrSignUp">
          <nav>
            <div className='inkBar' ></div>
            <div
                 checked={this.state.selected === 'signUp'}
                 onClick={this.changeState.bind(this, "signUp")}>
              注册</div>
             <div className='checked'
                 checked={this.state.selected === 'signIn'}
                 onClick={this.changeState.bind(this, "signIn")}>
             登录</div>
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