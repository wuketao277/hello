import userApi from '@/api/user'

export default {
  data () {
    return {
      // 修改密码的表单
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      }
    }
  },
  methods: {
    // 修改密码动作取消
    changePasswordCancel () {
      this.changePasswordForm.oldPassword = ''
      this.changePasswordForm.newPassword = ''
      this.changePasswordForm.newPassword2 = ''
    },
    // 修改密码提交
    changePasswordSubmit () {
      if (this.changePasswordForm.oldPassword === '') {
        this.$message({
          message: '请输入原始密码！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.changePasswordForm.newPassword === '') {
        this.$message({
          message: '请输入新密码！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.changePasswordForm.newPassword !== this.changePasswordForm.newPassword2) {
        this.$message({
          message: '“新密码”与“确认新密码”不一致！',
          type: 'warning',
          showClose: true
        })
        return
      }
      // 更新密码
      let params = {
        'oldPassword': this.changePasswordForm.oldPassword,
        'newPassword': this.changePasswordForm.newPassword
      }
      userApi.updatePassword(params).then(
        res => {
          if (res.status === 200) {
            if (res.data) {
              this.$message({
                message: '密码更新成功！',
                type: 'success',
                showClose: true
              })
            } else {
              this.$message({
                message: '密码更新失败！',
                type: 'error',
                showClose: true
              })
            }
          } else {
            this.$message({
              message: '密码更新失败！',
              type: 'error',
              showClose: true
            })
          }
        })
    }
  },
  created () {}
}
