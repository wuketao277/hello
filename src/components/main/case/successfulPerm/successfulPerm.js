import caseApi from '@/api/case'
import successfulPermApi from '@/api/successfulPerm'
import clientApi from '@/api/client'
import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import selectCandidate from '@/components/main/dialog/selectCandidate/selectCandidate.vue'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'

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
        cwId: '', // CWid
        cwUserName: '', // CW登录名
        cwRealName: '', // CW真实姓名
        bdId: '', // BDid
        bdUserName: '', // BD登录名
        bdRealName: '', // BD真实姓名
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
        this.form = this.$route.query.client
      } else {
        this.form.id = ''
        this.form.clientId = ''
        this.form.clientName = ''
        this.form.title = ''
        this.form.status = ''
        this.form.description = ''
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
      if (typeof (this.$route.query.case) !== 'undefined') {
        this.form = this.$route.query.case
        this.queryOthers()
      } else if (typeof (this.$route.query.caseId) !== 'undefined') {
        let params = {
          'id': this.$route.query.caseId
        }
        caseApi.queryById(params).then(res => {
          if (res.status === 200) {
            this.form = res.data
            this.queryOthers()
          }
        })
      }
    }
    // 获取所有“客户”信息
    clientApi.findAll().then(res => {
      if (res.status === 200) {
        this.clients = res.data
      }
    })
    // 查询上传文件
    this.queryUploadFiles()
  }
}
