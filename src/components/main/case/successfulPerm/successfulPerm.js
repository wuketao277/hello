import successfulPermApi from '@/api/successfulPerm'
import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import selectCandidate from '@/components/main/dialog/selectCandidate/selectCandidate.vue'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import clientApi from '@/api/client'

export default {
  components: {
    'selectCandidate': selectCandidate,
    'selectCase': selectCase,
    'selectUser': selectUser
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        clientId: '', // 公司id
        caseId: '', // 职位id
        title: '', // 职位名称
        candidateId: '', // 候选人id
        candidateEnglishName: '', // 候选人英文名字
        candidateChineseName: '', // 候选人中文名字
        consultantId: '', // 顾问id
        consultantUserName: '', // 顾问登录名
        consultantRealName: '', // 顾问真实姓名
        consultantCommissionPercent: '', // 顾问提成比例
        cwId: '', // CWid
        cwUserName: '', // CW登录名
        cwRealName: '', // CW真实姓名
        cwCommissionPercent: '', // CW提成比例
        bdId: '', // BDid
        bdUserName: '', // BD登录名
        bdRealName: '', // BD真实姓名
        bdCommissionPercent: '', // BD提成比例
        location: '', // 地点
        base: 0,
        gp: 0,
        billing: 0,
        onBoardDate: '',
        offerDate: '',
        paymentDate: '',
        invoiceDate: '',
        po: '',
        invoiceNo: '',
        channel: '',
        actualAcceptDate: '', // 实际收款日期
        bonusPaymentDate: '' // 奖金发放日期
      },
      rules: {
        clientId: [{
          required: true,
          message: '客户必填',
          trigger: 'blur'
        }],
        title: [
          {
            required: true,
            message: '职位名称必填',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '职位名称长度不能大于200个字符',
            trigger: 'blur'
          }
        ],
        status: [{
          required: true,
          message: '职位状态必填',
          trigger: 'blur'
        }]
      },
      clients: [],
      // 职位候选人集合
      candidateForCase: [],
      // 当前选中职位对应候选人
      curCandidateForCase: null,
      // 选择候选人对话框是否显示
      selectCandidateDialogShow: false,
      // 选择职位对话框是否显示
      selectCaseDialogShow: false,
      selectConsultantDialogShow: false,
      selectCWDialogShow: false,
      selectBDDialogShow: false
    }
  },
  methods: {
    // 编辑候选人
    editCandidate (index, row) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.successfulPerm
      } else {
        this.form.id = null
        this.form.clientId = '' // 公司id
        this.form.caseId = '' // 职位id
        this.form.title = '' // 职位名称
        this.form.candidateId = '' // 候选人id
        this.form.candidateEnglishName = '' // 候选人英文名字
        this.form.candidateChineseName = '' // 候选人中文名字
        this.form.consultantId = '' // 顾问id
        this.form.consultantUserName = '' // 顾问登录名
        this.form.consultantRealName = '' // 顾问真实姓名
        this.form.consultantCommissionPercent = '' // 顾问提成比例
        this.form.cwId = '' // CWid
        this.form.cwUserName = '' // CW登录名
        this.form.cwRealName = '' // CW真实姓名
        this.form.cwCommissionPercent = '' // CW提成比例
        this.form.bdId = '' // BDid
        this.form.bdUserName = '' // BD登录名
        this.form.bdRealName = '' // BD真实姓名
        this.form.bdCommissionPercent = '' // BD提成比例
        this.form.location = '' // 地点
        this.form.base = 0
        this.form.gp = 0
        this.form.billing = 0
        this.form.onBoardDate = ''
        this.form.offerDate = ''
        this.form.paymentDate = ''
        this.form.invoiceDate = ''
        this.form.po = ''
        this.form.invoiceNo = ''
        this.form.channel = ''
        this.form.actualAcceptDate = '' // 实际收款日期
        this.form.bonusPaymentDate = '' // 奖金发放日期
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          successfulPermApi.save(this.form).then(
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
    // 职位候选人变化
    rowChange (val) {
      this.curCandidateForCase = val
    },
    // 打开“选择候选人”对话框
    openSelectCandidateDialog () {
      this.selectCandidateDialogShow = true
    },
    // “选择后续人”对话框返回
    sureSelectCandidateDialog (val) {
      // 首先关闭对话框
      this.selectCandidateDialogShow = false
      this.form.candidateId = val.id
      this.form.candidateChineseName = val.chineseName
      this.form.candidateEnglishName = val.englishName
    },
    // 打开“选择职位”对话框
    openSelectCaseDialog () {
      this.selectCaseDialogShow = true
    },
    // “选择职位”对话框返回
    sureSelectCaseDialog (val) {
      // 首先关闭对话框
      this.selectCaseDialogShow = false
      this.form.caseId = val.id
      this.form.title = val.title
    },
    // 打开“选择顾问”对话框
    openSelectConsultantDialog () {
      this.selectConsultantDialogShow = true
    },
    // “选择顾问”对话框返回
    sureSelectConsultantDialog (val) {
      // 首先关闭对话框
      debugger
      this.selectConsultantDialogShow = false
      this.form.consultantId = val.id
      this.form.consultantUserName = val.username
      this.form.consultantRealName = val.realname
    },
    // 打开“选择CW”对话框
    openSelectCWDialog () {
      this.selectCWDialogShow = true
    },
    // “选择CW”对话框返回
    sureSelectCWDialog (val) {
      // 首先关闭对话框
      this.selectCWDialogShow = false
      this.form.cwId = val.id
      this.form.cwUserName = val.username
      this.form.cwRealName = val.realname
    },
    // 打开“选择BD”对话框
    openSelectBDDialog () {
      this.selectBDDialogShow = true
    },
    // “选择BD”对话框返回
    sureSelectBDDialog (val) {
      // 首先关闭对话框
      this.selectBDDialogShow = false
      this.form.bdId = val.id
      this.form.bdUserName = val.username
      this.form.bdRealName = val.realname
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.successfulPerm) !== 'undefined') {
        this.form = this.$route.query.successfulPerm
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
