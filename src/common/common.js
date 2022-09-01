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
  },
  getSearchContent (searchContent) {
    if (typeof (window.localStorage[searchContent]) === 'undefined') {
      return ''
    } else {
      return window.localStorage[searchContent]
    }
  },
  getPageNumber (pageNumber) {
    if (typeof (window.localStorage[pageNumber]) === 'undefined') {
      return 1
    } else {
      return window.localStorage[pageNumber]
    }
  },
  getPageSize (pageSize) {
    if (typeof (window.localStorage[pageSize]) === 'undefined') {
      return 10
    } else {
      return window.localStorage[pageSize]
    }
  },
  // 获取YYYY-MM-dd格式的年月日
  getYYYY_MM_dd (d) {
    let year = d.getFullYear()
    let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    return year + '-' + month + '-' + day
  }
}
