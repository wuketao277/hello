import basic from '@/api/basic'

export default {
  data () {
    return {
      isCollapse: true,
      realname: ''
    }
  },
  methods: {
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
    }
  },
  created () {
    const loginInfo = JSON.parse(window.localStorage['loginInfo'])
    this.realname = loginInfo['realname']
  }
}
