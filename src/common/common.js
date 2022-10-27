export default {
  // 是否拥有admin角色
  isAdmin () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('ADMIN', 0)
  },
  // 是否拥有AM角色
  isAM () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('AM', 0)
  },
  // 是否拥有RECRUITER角色
  isRECRUITER () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('RECRUITER', 0)
  },
  // 是否拥有BD角色
  isBD () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.roles.includes('BD', 0)
  },
  // 是否是全职员工
  isFullTimeJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType === 'FULLTIME'
  },
  // 是否是外包员工
  isConsultantJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType === 'CONSULTANT'
  },
  // 是否是体验员工
  isExperienceJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType === 'EXPERIENCE'
  },
  // 获取当前用户工作类型
  getJobType () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.jobType
  },
  // 获取当前用户名
  getUserName () {
    let loginInfo = JSON.parse(window.localStorage['loginInfo'])
    return loginInfo.username
  },
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
  },
  // 工资卡银行
  banks: [
    {code: 'ICBC', name: '工商银行'},
    {code: 'ABC', name: '农业银行'},
    {code: 'CMB', name: '招商银行'},
    {code: 'CCB', name: '建设银行'},
    {code: 'BCM', name: '交通银行'},
    {code: 'PAB', name: '平安银行'},
    {code: 'CEB', name: '光大银行'},
    {code: 'BOC', name: '中国银行'},
    {code: 'SPDB', name: '浦发银行'},
    {code: 'CITIC', name: '中信银行'},
    {code: 'BOS', name: '上海银行'},
    {code: 'CMBC', name: '民生银行'},
    {code: 'CIB', name: '兴业银行'},
    {code: 'HB', name: '华夏银行'}
  ],
  // 性别
  genders: [{code: 'MALE', describe: '男'}, {code: 'FEMALE', describe: '女'}],
  // 是否列表
  yesOrNoList: [{code: 'YES', name: '是'}, {code: 'NO', name: '否'}]
}
