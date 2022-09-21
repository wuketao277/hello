import successfulPermApi from '@/api/successfulPerm'
import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import selectCandidate from '@/components/main/dialog/selectCandidate/selectCandidate.vue'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import clientApi from '@/api/client'
import commonJS from '@/common/common'

export default {
  components: {
    'selectCandidate': selectCandidate,
    'selectCase': selectCase,
    'selectUser': selectUser
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      consultantIndex: 1, // 顾问索引
      form: {
        id: null,
        clientId: '', // 公司id
        approveStatus: '', // 审批状态，apply表示申请状态，approved表示审批通过，denied表示审批否决
        caseId: '', // 职位id
        title: '', // 职位名称
        candidateId: '', // 候选人id
        candidateEnglishName: '', // 候选人英文名字
        candidateChineseName: '', // 候选人中文名字
        cwId: '', // CWid
        cwUserName: '', // CW登录名
        cwRealName: '', // CW真实姓名
        cwCommissionPercent: '', // CW提成比例
        bdId: '', // BDid
        bdUserName: '', // BD登录名
        bdRealName: '', // BD真实姓名
        bdCommissionPercent: '', // BD提成比例
        consultantId: '', // 顾问id
        consultantUserName: '', // 顾问登录名
        consultantRealName: '', // 顾问真实姓名
        consultantCommissionPercent: '', // 顾问提成比例
        consultantId2: '', // 顾问id2
        consultantUserName2: '', // 顾问登录名2
        consultantRealName2: '', // 顾问真实姓名2
        consultantCommissionPercent2: '', // 顾问提成比例2
        consultantId3: '', // 顾问id3
        consultantUserName3: '', // 顾问登录名3
        consultantRealName3: '', // 顾问真实姓名3
        consultantCommissionPercent3: '', // 顾问提成比例3
        consultantId4: '', // 顾问id4
        consultantUserName4: '', // 顾问登录名4
        consultantRealName4: '', // 顾问真实姓名4
        consultantCommissionPercent4: '', // 顾问提成比例4
        consultantId5: '', // 顾问id5
        consultantUserName5: '', // 顾问登录名5
        consultantRealName5: '', // 顾问真实姓名5
        consultantCommissionPercent5: '', // 顾问提成比例5
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
        actualPaymentDate: '', // 实际收款日期
        commissionDate: '', // 奖金发放日期
        comment: '', // 说明
        type: 'perm'
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
      selectBDDialogShow: false,
      approveStatusList: [{'id': 'applied', 'name': '申请状态'}, {'id': 'approved', 'name': '审批通过'}, {'id': 'denied', 'name': '审批否决'}],
      typeList: [{'id': 'perm', 'name': 'perm'}, {'id': 'contracting', 'name': 'contracting'}]
    }
  },
  methods: {
    // 类型修改事件
    typeChange () {
      this.form.gp = 0
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
        return commonJS.hasRole('admin')
      }
    },
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
        this.form.approveStatus = ''
        this.form.caseId = '' // 职位id
        this.form.title = '' // 职位名称
        this.form.candidateId = '' // 候选人id
        this.form.candidateEnglishName = '' // 候选人英文名字
        this.form.candidateChineseName = '' // 候选人中文名字
        this.form.cwId = '' // CWid
        this.form.cwUserName = '' // CW登录名
        this.form.cwRealName = '' // CW真实姓名
        this.form.cwCommissionPercent = '' // CW提成比例
        this.form.bdId = '' // BDid
        this.form.bdUserName = '' // BD登录名
        this.form.bdRealName = '' // BD真实姓名
        this.form.bdCommissionPercent = '' // BD提成比例
        this.form.consultantId = '' // 顾问id
        this.form.consultantUserName = '' // 顾问登录名
        this.form.consultantRealName = '' // 顾问真实姓名
        this.form.consultantCommissionPercent = '' // 顾问提成比例
        this.form.consultantId2 = '' // 顾问id2
        this.form.consultantUserName2 = '' // 顾问登录名2
        this.form.consultantRealName2 = '' // 顾问真实姓名2
        this.form.consultantCommissionPercent2 = '' // 顾问提成比例2
        this.form.consultantId3 = '' // 顾问id3
        this.form.consultantUserName3 = '' // 顾问登录名3
        this.form.consultantRealName3 = '' // 顾问真实姓名3
        this.form.consultantCommissionPercent3 = '' // 顾问提成比例3
        this.form.consultantId4 = '' // 顾问id4
        this.form.consultantUserName4 = '' // 顾问登录名4
        this.form.consultantRealName4 = '' // 顾问真实姓名4
        this.form.consultantCommissionPercent4 = '' // 顾问提成比例4
        this.form.consultantId5 = '' // 顾问id5
        this.form.consultantUserName5 = '' // 顾问登录名5
        this.form.consultantRealName5 = '' // 顾问真实姓名5
        this.form.consultantCommissionPercent5 = '' // 顾问提成比例5
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
        this.form.actualPaymentDate = '' // 实际收款日期
        this.form.commissionDate = '' // 奖金发放日期
        this.form.comment = ''
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
      if (this.form.caseId === '') {
        this.$message({
          message: '职位必选！',
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
      if (this.form.base === '') {
        this.$message({
          message: 'Base不能为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.form.billing === '') {
        this.$message({
          message: 'Billing不能为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.form.gp === '') {
        this.$message({
          message: 'GP不能为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.form.approveStatus === 'approved' && !commonJS.hasRole('admin')) {
        this.$message({
          message: '审批通过后，只有管理员可以修改！',
          type: 'warning',
          showClose: true
        })
        return
      }
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
    openSelectConsultantDialog (val) {
      this.consultantIndex = val
      this.selectConsultantDialogShow = true
    },
    // 删除“选择顾问”
    deleteConsultant (val) {
      debugger
      if (val === '1') {
        this.form.consultantId = ''
        this.form.consultantUserName = ''
        this.form.consultantRealName = ''
      } else if (val === '2') {
        this.form.consultantId2 = ''
        this.form.consultantUserName2 = ''
        this.form.consultantRealName2 = ''
      } else if (val === '3') {
        this.form.consultantId3 = ''
        this.form.consultantUserName3 = ''
        this.form.consultantRealName3 = ''
      } else if (val === '4') {
        this.form.consultantId4 = ''
        this.form.consultantUserName4 = ''
        this.form.consultantRealName4 = ''
      } else if (val === '5') {
        this.form.consultantId5 = ''
        this.form.consultantUserName5 = ''
        this.form.consultantRealName5 = ''
      }
    },
    // “选择顾问”对话框返回
    sureSelectConsultantDialog (val) {
      // 首先关闭对话框
      this.selectConsultantDialogShow = false
      if (this.consultantIndex === '1') {
        this.form.consultantId = val.id
        this.form.consultantUserName = val.username
        this.form.consultantRealName = val.realname
      } else if (this.consultantIndex === '2') {
        this.form.consultantId2 = val.id
        this.form.consultantUserName2 = val.username
        this.form.consultantRealName2 = val.realname
      } else if (this.consultantIndex === '3') {
        this.form.consultantId3 = val.id
        this.form.consultantUserName3 = val.username
        this.form.consultantRealName3 = val.realname
      } else if (this.consultantIndex === '4') {
        this.form.consultantId4 = val.id
        this.form.consultantUserName4 = val.username
        this.form.consultantRealName4 = val.realname
      } else if (this.consultantIndex === '5') {
        this.form.consultantId5 = val.id
        this.form.consultantUserName5 = val.username
        this.form.consultantRealName5 = val.realname
      }
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
  computed: {
    formatBase: function () {
      if (this.form.base !== '') {
        return parseInt(this.form.base / 10000) + 'w'
      }
    },
    formatGp: function () {
      if (this.form.gp !== '') {
        return parseInt(this.form.gp / 10000) + 'w'
      }
    },
    formatBilling: function () {
      if (this.form.billing !== '') {
        return parseInt(this.form.billing / 10000) + 'w'
      }
    },
    getGP: function () {
      if (this.form.type === 'perm') {
        // perm情况下，gp是通过billing计算出来的
        if (typeof (this.form.billing) === 'undefined') {
          this.form.gp = 0
        }
        if (this.form.billing === 0) {
          this.form.gp = 0
        }
        this.form.gp = parseInt(this.form.billing / 1.06 - (this.form.billing - this.form.billing / 1.06) * 0.07)
      }
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
