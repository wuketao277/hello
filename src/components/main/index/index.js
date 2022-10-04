import basic from '@/api/basic'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      isCollapse: true,
      realname: '',
      username: ''
    }
  },
  methods: {
    // 通过工作类型控制显示
    jobTypeControlShow (url) {
      let jobType = commonJS.getJobType()
      if (url === '/' && (jobType === 'FULLTIME' || jobType === 'INTERN')) {
        return true
      }
      if (url === '/client/clientlist' && (jobType === 'FULLTIME' || jobType === 'INTERN')) {
        return true
      }
      if (url === '/case/caselist' && (jobType === 'FULLTIME' || jobType === 'INTERN' || jobType === 'PARTTIME')) {
        return true
      }
      if (url === '/candidate/candidatelist' && (jobType === 'FULLTIME' || jobType === 'INTERN' || jobType === 'PARTTIME')) {
        return true
      }
      if (url === '/case/successfulPermList' && jobType === 'FULLTIME') {
        return true
      }
      if (url === '/file/filelist' && (jobType === 'FULLTIME' || jobType === 'INTERN')) {
        return true
      }
      if (url === '/salary/salarySpecialItemList' && (jobType === 'FULLTIME' || jobType === 'INTERN')) {
        return true
      }
      if (url === '/my' && (jobType === 'FULLTIME' || jobType === 'INTERN' || jobType === 'PARTTIME' || jobType === 'CONSULTANT')) {
        return true
      }
      if (url === '/mynews/mynewslist' && (jobType === 'FULLTIME' || jobType === 'INTERN' || jobType === 'PARTTIME')) {
        return true
      }
      if (url === '/mytask/mytasklist' && (jobType === 'FULLTIME' || jobType === 'INTERN' || jobType === 'PARTTIME')) {
        return true
      }
      if (url === '/holiday/holidaylist' && (jobType === 'FULLTIME' || jobType === 'INTERN' || jobType === 'PARTTIME' || jobType === 'CONSULTANT')) {
        return true
      }
      return false
    },
    // 菜单显示控制
    showControl (url) {
      if (url === '/user/userlist' || url === '/salary/salarySpecialItem' ||
        url === '/report' || url === '/salary/invoiceList' || url === '/training') {
        return commonJS.isAdmin()
      }
      // 没有特殊要求的菜单不需要角色
      return true
    },
    // 检查菜单角色配置
    checkRole (menuName) {
      let loginInfo = window.localStorage['loginInfo']
      let roleList = JSON.parse(loginInfo)['roleList']
      if (menuName === 'filelist') {
        if (roleList.indexOf('admin') > -1) {
          return true
        } else {
          return false
        }
      }
      return true
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    selectMenuItem (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.$confirm('是否要退出系统?', '提示', {
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        basic.logout(null).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '退出成功！',
              type: 'success',
              showClose: true
            })
            // 清空本地存储
            window.localStorage['loginInfo'] = null
            this.$router.push('/login')
          } else {
            this.$message.error('退出失败！')
          }
        })
      })
    }
  },
  created () {
    const loginInfo = JSON.parse(window.localStorage['loginInfo'])
    this.realname = loginInfo['realname']
    this.username = loginInfo['username']
  }
}
