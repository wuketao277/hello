export default {
  // 是否拥有某个角色
  hasRole (role) {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    let index = loginInfo['roleList'].length
    while (index > 0) {
      index = index - 1
      if (loginInfo['roleList'][index] === role) {
        return true
      }
    }
    return false
  },
  // 获取当前登录用户
  getUser () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    let user = {'id': loginInfo.id, 'userName': loginInfo.username, 'realName': loginInfo.realname}
    return user
  }
}
