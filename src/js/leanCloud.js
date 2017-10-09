import AV from 'leancloud-storage'
import {log} from './App'


var APP_ID = 'f7gUoKO1Y7L5NPCRXyxieomG-gzGzoHsz'
var APP_KEY = 'fGCb236NSFzxe54QQict80H5'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
})

export default AV

export function signUp(username, password, successFn, errorFn) {
  // 新建 AVUser 对象实例
  var user = new AV.User()
  // 设置用户名
  user.setUsername(username)
  // 设置密码
  user.setPassword(password)
  // 设置邮箱
  user.signUp().then(function (loginedUser) {
    log(loginedUser)
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })

  return undefined

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