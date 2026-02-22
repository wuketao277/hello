import commonJS from '@/common/common'
import costInvoiceUsedApi from '@/api/costInvoiceUsed'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'

export default {
  components: {
    'selectUser': selectUser
  },
  data () {
    return {
      types: commonJS.invoiceTypeList,
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        consultantId: null,
        consultantUserName: null,
        consultantRealName: null,
        usedDate: null,
        sum: null,
        remark: null
      },
      roles: [],
      jobType: '',
      selectConsultantDialogShow: false
    }
  },
  methods: {
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
        this.form.usedDate = null
        this.form.sum = null
        this.form.remark = null
      }
    },
    // 保存
    save () {
      // 通过role进行检查
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          costInvoiceUsedApi.save(this.form).then(
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
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.costInvoiceUsed) !== 'undefined') {
        this.form = this.$route.query.costInvoiceUsed
      }
    }
  }
}
