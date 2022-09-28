import holidayApi from '@/api/holiday'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        userId: null,
        userName: null,
        userRealName: null,
        holidayDate: null,
        holidayLong: null,
        remark: null,
        approveStatus: 'APPLY',
        approveUserId: null,
        approveUserName: null,
        approveUserRealName: null
      },
      approveStatusList: [{code: 'APPLY', name: 'APPLY'}, {code: 'APPROVED', name: 'APPROVED'}, {code: 'DENY', name: 'DENY'}]
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'approve') {
        return commonJS.hasRole('admin')
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.holiday
      } else {
        this.form.id = null
        this.form.userId = null
        this.form.userName = null
        this.form.userRealName = null
        this.form.holidayDate = null
        this.form.holidayLong = null
        this.form.remark = null
        this.form.approveStatus = 'APPLY'
        this.form.approveUserId = null
        this.form.approveUserName = null
        this.form.approveUserRealName = null
      }
    },
    // 保存
    save () {
      // 非管理员在审批后的请假不能再次修改
      if (!commonJS.hasRole('admin') && (this.form.approveStatus === 'APPROVED' || this.form.approveStatus === 'DENY')) {
        this.$message({
          message: '假期已经被审批，不能修改！',
          type: 'warning',
          showClose: true
        })
        return
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          holidayApi.save(this.form).then(
            res => {
              if (res.status === 200) {
                // 将从服务端获取的id赋值给前端显示
                this.form.id = res.data.id
                this.form.userId = res.data.userId
                this.form.userName = res.data.userName
                this.form.userRealName = res.data.userRealName
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  showClose: true
                })
              }
            })
        } else {
          // 如果检查不通过就给出提示
          this.$message({
            message: '有错误，请检查！',
            type: 'warning',
            showClose: true
          })
        }
      })
    }
  },
  computed: {
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      this.form = this.$route.query.holiday
    }
  }
}
