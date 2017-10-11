import AV from 'leancloud-storage'
import {log} from './App'


var APP_ID = 'f7gUoKO1Y7L5NPCRXyxieomG-gzGzoHsz'
var APP_KEY = 'fGCb236NSFzxe54QQict80H5'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
})
// var dataObject = AV.Object.extend('data')
// var data = new dataObject()
export default AV

export const TodoModel = {
  create({status, title, deleted}, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo') // 记得把多余的分号删掉，我讨厌分号
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    })

  },
  update() {

  },
  destroy() {

  },
}

// export function save(key, value) {
//   data.set(key, value)
//   data.save().then(function (todo) {
//     log('objectId is ' + todo.id)
//   }, function (error) {
//     console.error(error)
//   })
// }

export function signUp(email, username, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User()
  // 设置用户名
  user.setUsername(username)
  // 设置密码
  user.setPassword(password)
  user.setEmail(email)
  user.signUp().then(function (loginedUser) {
    log(loginedUser)
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined

}

export function signIn(username, password, successFn, errorFn) {

  AV.User.signIn(username, password).then(function (loginedUser) {
    log(loginedUser)
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined

}

export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
  }, function (error) {
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}

export function getCurrentUser() {
  let user = AV.User.current()
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

export function signOut() {
  AV.User.logOut()
  return undefined
}