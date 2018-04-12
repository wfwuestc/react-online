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
  getByUser(user, successFn, errorFn) {
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query('Todo')
    query.equalTo('deleted', false);
    query.find().then((response) => {
      let array = response.map((t) => {
        return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  },
  create({status, title, deleted}, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo') 
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false 公共不可读
    acl.setWriteAccess(AV.User.current(), true)//当前用户可读
    acl.setReadAccess(AV.User.current(), true)

    todo.setACL(acl)//应用acl
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    })

  },
  update({id, title, status, deleted}, successFn, errorFn) {
    // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
    let todo = AV.Object.createWithoutData('Todo', id)
    title !== undefined && todo.set('title', title)
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    // 为什么我要像上面那样写代码？
    // 考虑如下场景
    // update({id:1, title:'hi'})
    // 调用 update 时，很有可能没有传 status 和 deleted
    // 也就是说，用户只想「局部更新」
    // 所以我们只 set 该 set 的
    // 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
    // 考虑如下场景
    // update({id:1, title: '', status: null}}
    // 用户想将 title 和 status 置空，我们要满足
    todo.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))
  },
  destroy(todoId, successFn, errorFn) {
    TodoModel.update({id: todoId, deleted: true}, successFn, errorFn)
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

  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    log('login.......', AV.User.current())
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
    log('get user......',user)
    return getUserFromAVUser(user)
  } else {
    return null
  }
}

export function signOut() {
  AV.User.logOut()
  return undefined
}
