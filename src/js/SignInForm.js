import React from 'react'
import Status from './Status'

export default function (props) {
  return (
      <form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
        <div className="row username">
          <label></label>
          <input type="text"
                 value={props.formData.username}
                 placeholder={"请输入帐号 至少3字符"}
                 onChange={props.onChange.bind(null, 'username')}/>
          <Status/>
        </div>
        <div className="row password">
          <label></label>
          <input type="password" value={props.formData.password}
                 onChange={props.onChange.bind(null, 'password')}
                 placeholder={"请输入密码 至少6字符"}/>

          <Status/>
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
          <a href="#" onClick={props.onForgotPassword}>忘记密码了？</a>
        </div>
      </form>
  )
}