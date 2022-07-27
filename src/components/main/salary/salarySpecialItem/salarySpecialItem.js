import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import salarySpecialItemApi from '@/api/salarySpecialItem'

export default {
  components: {
    'selectUser': selectUser
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        consultantId: '', // 顾问id
        consultantUserName: '', // 顾问登录名
        consultantRealName: '', // 顾问真实姓名
        month: '', // 所属月份
        sum: '', // 特殊项金额
        description: '', // 特殊项说明
        isPre: 'yes' // 是否前置计算
      },
      selectConsultantDialogShow: false
    }
  },
  methods: {
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.salarySpecialItem
      } else {
        this.form.id = null
        this.form.consultantId = '' // 顾问id
        this.form.consultantUserName = '' // 顾问登录名
        this.form.consultantRealName = '' // 顾问真实姓名
        this.form.month = '' // 月份
        this.form.sum = 0 // 金额
        this.form.description = '' // 说明
        this.form.isPre = 'yes' // 是否前置计算
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          salarySpecialItemApi.save(this.form).then(
            res => {
              if (res.status === 200) {
                // 将从服务端获取的id赋值给前端显示
                this.form.id = res.data.id
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  showClose: true
                })
              } else {
                this.$message.error('保存失败！')
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
    },
    // 打开“选择顾问”对话框
    openSelectConsultantDialog () {
      this.selectConsultantDialogShow = true
    },
    // “选择顾问”对话框返回
    sureSelectConsultantDialog (val) {
      // 首先关闭对话框
      this.selectConsultantDialogShow = false
      this.form.consultantId = val.id
      this.form.consultantUserName = val.username
      this.form.consultantRealName = val.realname
    }
  },
  computed: {
    formatSum: function () {
      if (this.form.sum !== '') {
        return this.form.sum / 1000 + 'k'
      }
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.salarySpecialItem) !== 'undefined') {
        this.form = this.$route.query.salarySpecialItem
      }
    }
  }
}
