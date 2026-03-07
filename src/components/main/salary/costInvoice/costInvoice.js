import commonJS from '@/common/common'
import costInvoiceApi from '@/api/costInvoice'

export default {
  data () {
    return {
      types: commonJS.invoiceTypeList,// 发票类型
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
      debugger
      if (null == this.form.invoiceDate) {
        this.$message({
          message: '请选择开票日期！',
          type: 'warning',
          showClose: true,
          duration: 3000
        })
        return
      }
      if (null == this.form.submitDate) {
        this.$message({
          message: '请选择提交日期！',
          type: 'warning',
          showClose: true,
          duration: 3000
        })
        return
      }
      if (commonJS.strIsBlank(this.form.invoiceNumber)) {
        this.$message({
          message: '请填写发票号码！',
          type: 'warning',
          showClose: true,
          duration: 3000
        })
        return
      }
      if (null == this.form.sum) {
        this.$message({
          message: '请填写价税合计！',
          type: 'warning',
          showClose: true,
          duration: 3000
        })
        return
      }
      if (commonJS.strIsBlank(this.form.type)) {
        this.$message({
          message: '请选择发票类型！',
          type: 'warning',
          showClose: true,
          duration: 3000
        })
        return
      }
      if (commonJS.strIsBlank(this.form.kind)) {
        this.$message({
          message: '请填写品名！',
          type: 'warning',
          showClose: true,
          duration: 3000
        })
        return
      }
      // 如果校验通过就调用后端接口
      costInvoiceApi.save(this.form).then(
        res => {
          if (res.status === 200) {
            // 将从服务端获取的id赋值给前端显示
            this.form.id = res.data.id
            this.form.consultantId = res.data.consultantId
            this.form.consultantUserName = res.data.consultantUserName
            this.form.consultantRealName = res.data.consultantRealName
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
