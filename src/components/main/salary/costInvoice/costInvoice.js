import commonJS from '@/common/common'
import costInvoiceApi from '@/api/costInvoice'

export default {
  data () {
    return {
      types: commonJS.invoiceTypeList,
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        consultantId: null,
        consultantUserName: null,
        consultantRealName: null,
        invoiceDate: null,
        submitDate: null,
        invoiceNumber: null,
        sum: null,
        type: null,
        kind: null,
        remark: null,
        approveStatus: 'applied'
      },
      approveStatusList: commonJS.approveStatusList,
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === '') {
        return commonJS.isAdminInArray(this.roles)
      }
      return false
    },
    // 禁用控制
    disableControl (key) {
      if (key === 'approveStatus') {
        return !commonJS.isAdmin()
      }
      return true
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.costInvoice
      } else {
        this.form.id = null
        this.form.consultantId = null
        this.form.consultantUserName = null
        this.form.consultantRealName = null
        this.form.invoiceDate = null
        this.form.submitDate = null
        this.form.invoiceNumber = null
        this.form.sum = null
        this.form.type = null
        this.form.kind = null
        this.form.remark = null
        this.form.approveStatus = 'Apply'
      }
    },
    // 保存
    save () {
      // 通过role进行检查
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          costInvoiceApi.save(this.form).then(
            res => {
              if (res.status === 200) {
                // 将从服务端获取的id赋值给前端显示
                this.form.id = res.data.id
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  showClose: true,
                  duration: 800
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
    }
  },
  computed: {
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.costInvoice) !== 'undefined') {
        this.form = this.$route.query.costInvoice
      }
    }
  }
}
