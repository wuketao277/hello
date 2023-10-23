import basic from '@/api/basic'
import commonJS from '@/common/common'
import SecurityApi from '@/api/security'

export default {
  name: 'login',
  data () {
    return {
      menus: [],
      activeIndex: 'mainpage',
      activeIndex2: 'mainpage',
      needLogin: true,
      loginUser: {
        loginName: '',
        password: ''
      },
      userInfo: undefined, // 用户信息
      backgroundImage: require('../../assets/background-1.jpeg'),
      version: commonJS.version
    }
  },
  methods: {
    // 菜单变更处理函数，遍历data中的menus数据，判断当前选中菜单的index数据然后调整的指定路径
    handleSelect: function (key, keyPath) {
      for (let idx in this.$data['menus']) {
        if (this.$data['menus'][idx]['index'] === key) {
          if ('path' in this.$data['menus'][idx]) {
            this.$router.push(this.$data['menus'][idx]['path'])
          }
        }
      }
    },
    // 菜单项显示控制函数：根据传入的key，判断是否在数组中，如果在就显示，如果不在就不显示
    menuItemDisplay: function (key) {
      for (let idx in this.$data['menus']) {
        if (this.$data['menus'][idx]['index'] === key) {
          return true
        }
      }
      return false
    },
    jump: function (path) {
      this.$router.push(path)
    },
    // 登录函数，获取用户菜单保存到localStorage中
    async login () {
      if (this.loginUser.loginName.length === 0) {
        this.$message({
          message: '请输入用户名！',
          type: 'warning'
        })
        return
      }
      if (this.loginUser.password.length === 0) {
        this.$message({
          message: '请输入密码！',
          type: 'warning'
        })
      }
      // 前端版本检查
      commonJS.versionCheck()
      // 调用后台登录接口
      basic.login(this.loginUser).then(res => {
        let resData = res.data
        if (resData['status']) {
          // 用户名密码验证成功
          // 保存信息
          window.localStorage['loginInfo'] = JSON.stringify(resData['data'])
          // 菜单保存后，刷新页面
          // window.location.reload()
          // 检查签到版本
          SecurityApi.checkVersion(commonJS.version).then(res => {
            if (res.status === 200) {
              if (!res.data) {
                this.$message.error({
                  message: '版本不正确，请清空本地缓存！'
                })
              } else {
                // 版本正确，登陆首页
                // this.jump('/')
                this.jump('/background.html')
              }
            } else {
              // 如果服务器登录状态为false，就跳转到登录业务
              this.$message.error({
                message: '系统异常，请联系管理员！'
              })
            }
          })
        } else {
          this.$message({
            message: '登录失败！',
            type: 'warning'
          })
        }
      })
    },
    // 取消登录
    logincancel () {
      this.$data.loginUser.loginName = ''
      this.$data.loginUser.password = ''
    },
    // 退出登录
    logout () {
      window.localStorage.removeItem('loginInfo')
      window.location.reload()
    }
  }
}
