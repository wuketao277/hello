import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import selectCandidate from '@/components/main/dialog/selectCandidate/selectCandidate.vue'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import clientApi from '@/api/client'
import commonJS from '@/common/common'
import invoiceApi from '@/api/invoice'

export default {
  components: {
    'selectCandidate': selectCandidate,
    'selectCase': selectCase,
    'selectUser': selectUser
  },
  data () {
    return {
      types: [{code: 'Z3', name: '3%专票'},
        {code: 'Z6', name: '6%专票'},
        {code: 'P3', name: '3%普票'},
        {code: 'P6', name: '6%普票'}],
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        createDate: null,
        sum: null,
        type: null,
        clientId: null,
        clientChineseName: null,
        kind: '人才咨询费',
        po: null,
        contact: null,
        amId: null,
        amName: null,
        amChineseName: null,
        candidateId: null,
        candidateChineseName: null,
        remark: null,
        sendDate: null,
        receiveDate: null,
        status: true
      },
      clients: [],
      // 选择候选人对话框是否显示
      selectCandidateDialogShow: false,
      selectAMDialogShow: false
    }
  },
  methods: {
    // 客户变更
    clientChange () {
      clientApi.queryById(this.form.clientId).then(res => {
        if (res.status === 200) {
          this.form.clientChineseName = res.data.chineseName
          this.form.contact = res.data.invoiceContact
          this.form.remark = res.data.invoiceRemark
        }
      })
    },
    // 获取日期部分
    getDateStr (dateStr) {
      if (typeof (dateStr) !== 'undefined' && dateStr !== null && dateStr.length > 10) {
        return dateStr.substr(0, 10)
      }
      return dateStr
    },
    // 显示控制
    showControl (key) {
      if (key === 'approveStatus' || key === 'commissionDate' || key === 'actualPaymentDate') {
        return commonJS.isAdmin()
      }
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.invoice
      } else {
        this.form.id = null
        this.form.createDate = null
        this.form.sum = null
        this.form.type = null
        this.form.clientId = null
        this.form.clientChineseName = null
        this.form.kind = '人才咨询费'
        this.form.po = null
        this.form.contact = null
        this.form.amId = null
        this.form.amName = null
        this.form.amChineseName = null
        this.form.candidateId = null
        this.form.candidateChineseName = null
        this.form.remark = null
        this.form.sendDate = null
        this.form.receiveDate = null
        this.form.status = true
      }
    },
    // 保存
    save () {
      if (this.form.clientId === '') {
        this.$message({
          message: '客户必选！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.form.candidateId === '') {
        this.$message({
          message: '候选人必选！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.form.sum === '') {
        this.$message({
          message: '开票金额必填！',
          type: 'warning',
          showClose: true
        })
        return
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          invoiceApi.save(this.form).then(
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
    // 打开“选择候选人”对话框
    openSelectCandidateDialog () {
      this.selectCandidateDialogShow = true
    },
    // “选择候选人”对话框返回
    sureSelectCandidateDialog (val) {
      // 首先关闭对话框
      this.selectCandidateDialogShow = false
      this.form.candidateId = val.id
      this.form.candidateChineseName = val.chineseName
      this.form.candidateEnglishName = val.englishName
    },
    // 打开“选择顾问”对话框
    openSelectAMDialog (val) {
      this.selectAMDialogShow = true
    },
    // “选择顾问”对话框返回
    sureSelectAMDialog (val) {
      // 首先关闭对话框
      this.selectAMDialogShow = false
      this.form.amId = val.id
      this.form.amName = val.username
      this.form.amChineseName = val.realname
    }
  },
  computed: {
    formatSum: function () {
      if (this.form.sum !== '') {
        return parseInt(this.form.sum / 10000) + 'w'
      }
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.invoice) !== 'undefined') {
        this.form = this.$route.query.invoice
      }
    }
    clientApi.findAll().then(
      res => {
        if (res.status === 200) {
          // 将从服务端获取的id赋值给前端显示
          this.clients = res.data
        }
      })
  }
}
