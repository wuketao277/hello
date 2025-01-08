import userApi from '@/api/user'
import commonJs from '@/common/common'

export default {
  data () {
    return {
      // 修改密码的表单
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      // 基本信息表达
      baseInfoForm: {
        gender: ''
      },
      // 工资卡银行
      banks: commonJs.banks,
      // 性别
      genders: commonJs.genders,
      // 扩展信息表单
      extInfoForm: {
      }
    }
  },
  methods: {
    // 保存扩展信息
    saveBaseInfo () {
      userApi.saveExtInfo(this.extInfoForm).then(
        res => {
          if (res.status === 200) {
            this.$message({
              message: '保存成功！',
              type: 'success',
              showClose: true,
              duration: 800
            })
          } else {
            this.$message({
              message: '保存失败！',
              type: 'warning',
              showClose: true
            })
          }
        })
    },
    // 取消扩展信息的更新
    cancelChangeBaseInfo () {
      this.queryExtInfoForm()
    },
    // 查询扩展信息
    queryExtInfoForm () {
      userApi.findSelf().then(res => {
        if (res.status === 200) {
          // 将从服务端获取的数据赋值给前端显示
          this.extInfoForm = res.data
        }
      })
    },
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
                showClose: true,
                duration: 800
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
  created () {
    this.queryExtInfoForm()
  }
}
