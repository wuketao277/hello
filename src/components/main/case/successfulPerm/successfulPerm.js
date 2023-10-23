import successfulPermApi from '@/api/successfulPerm'
import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import selectCandidate from '@/components/main/dialog/selectCandidate/selectCandidate.vue'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import selectHr from '@/components/main/dialog/selectHr/selectHr.vue'
import clientApi from '@/api/client'
import configApi from '@/api/config'
import commonJS from '@/common/common'
import userApi from '@/api/user'
import salaryApi from '@/api/salary'

export default {
  components: {
    'selectCandidate': selectCandidate,
    'selectCase': selectCase,
    'selectUser': selectUser,
    'selectHr': selectHr
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      consultantIndex: 1, // 顾问索引
      consultantColumnShow1: true, // 顾问列显示控制
      consultantColumnShow2: false, // 顾问列显示控制
      consultantColumnShow3: false, // 顾问列显示控制
      consultantColumnShow4: false, // 顾问列显示控制
      consultantColumnShow5: false, // 顾问列显示控制
      consultantColumnShow6: false, // 顾问列显示控制
      consultantColumnShow7: false, // 顾问列显示控制
      consultantColumnShow8: false, // 顾问列显示控制
      consultantColumnShow9: false, // 顾问列显示控制
      consultantColumnShow10: false, // 顾问列显示控制
      consultantColumnShow11: false, // 顾问列显示控制
      consultantColumnShow12: false, // 顾问列显示控制
      consultantColumnShow13: false, // 顾问列显示控制
      consultantColumnShow14: false, // 顾问列显示控制
      consultantColumnShow15: false, // 顾问列显示控制
      consultantColumnShow16: false, // 顾问列显示控制
      consultantColumnShow17: false, // 顾问列显示控制
      consultantColumnShow18: false, // 顾问列显示控制
      consultantColumnShow19: false, // 顾问列显示控制
      consultantColumnShow20: false, // 顾问列显示控制
      form: {
        id: null,
        clientId: '', // 公司id
        approveStatus: 'applied', // 审批状态，apply表示申请状态，approved表示审批通过，denied表示审批否决
        department: '', // 部门名称
        caseId: '', // 职位id
        title: '', // 职位名称
        candidateId: '', // 候选人id
        candidateEnglishName: '', // 候选人英文名字
        candidateChineseName: '', // 候选人中文名字
        hrId: '',
        hrChineseName: '',
        hrEnglishName: '',
        cwId: '', // CWid
        cwUserName: '', // CW登录名
        cwRealName: '', // CW真实姓名
        cwCommissionPercent: '', // CW提成比例
        bdId: '', // BDid
        bdUserName: '', // BD登录名
        bdRealName: '', // BD真实姓名
        bdCommissionPercent: '', // BD提成比例
        leaderId: '', // Leaderid
        leaderUserName: '', // Leader登录名
        leaderRealName: '', // Leader真实姓名
        leaderCommissionPercent: '', // Leader提成比例
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
        consultantId6: '', // 顾问id6
        consultantUserName6: '', // 顾问登录名6
        consultantRealName6: '', // 顾问真实姓名6
        consultantCommissionPercent6: '', // 顾问提成比例6
        consultantId7: '', // 顾问id7
        consultantUserName7: '', // 顾问登录名7
        consultantRealName7: '', // 顾问真实姓名7
        consultantCommissionPercent7: '', // 顾问提成比例7
        consultantId8: '', // 顾问id8
        consultantUserName8: '', // 顾问登录名8
        consultantRealName8: '', // 顾问真实姓名8
        consultantCommissionPercent8: '', // 顾问提成比例8
        consultantId9: '', // 顾问id9
        consultantUserName9: '', // 顾问登录名9
        consultantRealName9: '', // 顾问真实姓名9
        consultantCommissionPercent9: '', // 顾问提成比例9
        consultantId10: '', // 顾问id10
        consultantUserName10: '', // 顾问登录名10
        consultantRealName10: '', // 顾问真实姓名10
        consultantCommissionPercent10: '', // 顾问提成比例10
        consultantId11: '', // 顾问id11
        consultantUserName11: '', // 顾问登录名11
        consultantRealName11: '', // 顾问真实姓名11
        consultantCommissionPercent11: '', // 顾问提成比例11
        consultantId12: '', // 顾问id12
        consultantUserName12: '', // 顾问登录名12
        consultantRealName12: '', // 顾问真实姓名12
        consultantCommissionPercent12: '', // 顾问提成比例12
        consultantId13: '', // 顾问id13
        consultantUserName13: '', // 顾问登录名13
        consultantRealName13: '', // 顾问真实姓名13
        consultantCommissionPercent13: '', // 顾问提成比例13
        consultantId14: '', // 顾问id4
        consultantUserName14: '', // 顾问登录名14
        consultantRealName14: '', // 顾问真实姓名14
        consultantCommissionPercent14: '', // 顾问提成比例14
        consultantId15: '', // 顾问id15
        consultantUserName15: '', // 顾问登录名15
        consultantRealName15: '', // 顾问真实姓名15
        consultantCommissionPercent15: '', // 顾问提成比例15
        consultantId16: '', // 顾问id16
        consultantUserName16: '', // 顾问登录名16
        consultantRealName16: '', // 顾问真实姓名16
        consultantCommissionPercent16: '', // 顾问提成比例16
        consultantId17: '', // 顾问id17
        consultantUserName17: '', // 顾问登录名17
        consultantRealName17: '', // 顾问真实姓名17
        consultantCommissionPercent17: '', // 顾问提成比例17
        consultantId18: '', // 顾问id18
        consultantUserName18: '', // 顾问登录名18
        consultantRealName18: '', // 顾问真实姓名18
        consultantCommissionPercent18: '', // 顾问提成比例18
        consultantId19: '', // 顾问id19
        consultantUserName19: '', // 顾问登录名19
        consultantRealName19: '', // 顾问真实姓名19
        consultantCommissionPercent19: '', // 顾问提成比例19
        consultantId20: '', // 顾问id20
        consultantUserName20: '', // 顾问登录名20
        consultantRealName20: '', // 顾问真实姓名20
        consultantCommissionPercent20: '', // 顾问提成比例20
        location: '', // 地点
        base: 0,
        gp: 0,
        billing: 0,
        interviewDate: '', // 到面日期
        onBoardDate: '',
        guaranteeDate: '',
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
      selectHRDialogShow: false,
      selectConsultantDialogShow: false,
      selectCWDialogShow: false,
      selectBDDialogShow: false,
      selectLeaderDialogShow: false,
      approveStatusList: [{
        'id': 'applied',
        'name': '申请状态'
      }, {
        'id': 'approved',
        'name': '审批通过'
      }, {
        'id': 'denied',
        'name': '审批否决'
      }],
      typeList: [],
      // [{'id': 'perm', 'name': 'perm'}, {'id': 'contracting', 'name': 'contracting'}]
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 跳转到编辑职位
    jumpToTitle () {
      if (this.form.caseId !== '') {
        this.$router.push({
          path: '/background.html/case/case',
          query: {
            mode: 'modify',
            caseId: this.form.caseId
          }
        })
      }
    },
    // 跳转到编辑候选人
    jumpToCandidate () {
      if (this.form.candidateId !== '') {
        this.$router.push({
          path: '/background.html/candidate/candidate',
          query: {
            mode: 'modify',
            candidateId: this.form.candidateId
          }
        })
      }
    },
    // 增加顾问
    addConsultant () {
      if (!this.consultantColumnShow1) {
        this.consultantColumnShow1 = true
      } else if (!this.consultantColumnShow2) {
        this.consultantColumnShow2 = true
      } else if (!this.consultantColumnShow3) {
        this.consultantColumnShow3 = true
      } else if (!this.consultantColumnShow4) {
        this.consultantColumnShow4 = true
      } else if (!this.consultantColumnShow5) {
        this.consultantColumnShow5 = true
      } else if (!this.consultantColumnShow6) {
        this.consultantColumnShow6 = true
      } else if (!this.consultantColumnShow7) {
        this.consultantColumnShow7 = true
      } else if (!this.consultantColumnShow8) {
        this.consultantColumnShow8 = true
      } else if (!this.consultantColumnShow9) {
        this.consultantColumnShow9 = true
      } else if (!this.consultantColumnShow10) {
        this.consultantColumnShow10 = true
      } else if (!this.consultantColumnShow11) {
        this.consultantColumnShow11 = true
      } else if (!this.consultantColumnShow12) {
        this.consultantColumnShow12 = true
      } else if (!this.consultantColumnShow13) {
        this.consultantColumnShow13 = true
      } else if (!this.consultantColumnShow14) {
        this.consultantColumnShow14 = true
      } else if (!this.consultantColumnShow15) {
        this.consultantColumnShow15 = true
      } else if (!this.consultantColumnShow16) {
        this.consultantColumnShow16 = true
      } else if (!this.consultantColumnShow17) {
        this.consultantColumnShow17 = true
      } else if (!this.consultantColumnShow18) {
        this.consultantColumnShow18 = true
      } else if (!this.consultantColumnShow19) {
        this.consultantColumnShow19 = true
      } else if (!this.consultantColumnShow20) {
        this.consultantColumnShow20 = true
      }
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
      if (key === 'approveStatus' || key === 'commissionDate' || key === 'actualPaymentDate' || key === 'calcGP' || key === 'invoiceDate') {
        return commonJS.isAdminInArray(this.roles)
      } else if (key === 'save') {
        // 保持按钮。如果已经是审批状态，只有管理员显示保存按钮
        if (this.form.approveStatus === 'approved') {
          return commonJS.isAdminInArray(this.roles)
        }
        return true
      }
    },
    // 编辑候选人
    editCandidate (index, row) {
      this.$router.push({
        path: '/background.html/candidate/candidate',
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
        this.form.department = '' // 部门名称
        this.form.caseId = '' // 职位id
        this.form.title = '' // 职位名称
        this.form.candidateId = '' // 候选人id
        this.form.candidateEnglishName = '' // 候选人英文名字
        this.form.candidateChineseName = '' // 候选人中文名字
        this.form.hrId = ''
        this.form.hrChineseName = ''
        this.form.hrEnglishName = ''
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
        this.form.interviewDate = ''
        this.form.onBoardDate = ''
        this.form.guaranteeDate = ''
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
      if (this.form.approveStatus === 'approved' && !commonJS.isAdmin()) {
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
    // “选择候选人”对话框返回
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
      if (val === 'cw') {
        this.form.cwId = ''
        this.form.cwUserName = ''
        this.form.cwRealName = ''
        this.form.cwCommissionPercent = null
      } else if (val === 'bd') {
        this.form.bdId = ''
        this.form.bdUserName = ''
        this.form.bdRealName = ''
        this.form.bdCommissionPercent = null
      } else if (val === 'leader') {
        this.form.leaderId = ''
        this.form.leaderUserName = ''
        this.form.leaderRealName = ''
        this.form.leaderCommissionPercent = null
      } else if (val === '1') {
        this.form.consultantId = ''
        this.form.consultantUserName = ''
        this.form.consultantRealName = ''
        this.form.consultantCommissionPercent = null
        this.consultantColumnShow1 = false
      } else if (val === '2') {
        this.form.consultantId2 = ''
        this.form.consultantUserName2 = ''
        this.form.consultantRealName2 = ''
        this.form.consultantCommissionPercent2 = null
        this.consultantColumnShow2 = false
      } else if (val === '3') {
        this.form.consultantId3 = ''
        this.form.consultantUserName3 = ''
        this.form.consultantRealName3 = ''
        this.form.consultantCommissionPercent3 = null
        this.consultantColumnShow3 = false
      } else if (val === '4') {
        this.form.consultantId4 = ''
        this.form.consultantUserName4 = ''
        this.form.consultantRealName4 = ''
        this.form.consultantCommissionPercent4 = null
        this.consultantColumnShow4 = false
      } else if (val === '5') {
        this.form.consultantId5 = ''
        this.form.consultantUserName5 = ''
        this.form.consultantRealName5 = ''
        this.form.consultantCommissionPercent5 = null
      } else if (val === '6') {
        this.form.consultantId6 = ''
        this.form.consultantUserName6 = ''
        this.form.consultantRealName6 = ''
        this.form.consultantCommissionPercent6 = null
      } else if (val === '7') {
        this.form.consultantId7 = ''
        this.form.consultantUserName7 = ''
        this.form.consultantRealName7 = ''
        this.form.consultantCommissionPercent7 = null
      } else if (val === '8') {
        this.form.consultantId8 = ''
        this.form.consultantUserName8 = ''
        this.form.consultantRealName8 = ''
        this.form.consultantCommissionPercent8 = null
      } else if (val === '9') {
        this.form.consultantId9 = ''
        this.form.consultantUserName9 = ''
        this.form.consultantRealName9 = ''
        this.form.consultantCommissionPercent9 = null
      } else if (val === '10') {
        this.form.consultantId10 = ''
        this.form.consultantUserName10 = ''
        this.form.consultantRealName10 = ''
        this.form.consultantCommissionPercent10 = null
      } else if (val === '11') {
        this.form.consultantId11 = ''
        this.form.consultantUserName11 = ''
        this.form.consultantRealName11 = ''
        this.form.consultantCommissionPercent11 = null
      } else if (val === '12') {
        this.form.consultantId12 = ''
        this.form.consultantUserName12 = ''
        this.form.consultantRealName12 = ''
        this.form.consultantCommissionPercent12 = null
      } else if (val === '13') {
        this.form.consultantId13 = ''
        this.form.consultantUserName13 = ''
        this.form.consultantRealName13 = ''
        this.form.consultantCommissionPercent13 = null
      } else if (val === '14') {
        this.form.consultantId14 = ''
        this.form.consultantUserName14 = ''
        this.form.consultantRealName14 = ''
        this.form.consultantCommissionPercent14 = null
      } else if (val === '15') {
        this.form.consultantId15 = ''
        this.form.consultantUserName15 = ''
        this.form.consultantRealName15 = ''
        this.form.consultantCommissionPercent15 = null
      } else if (val === '16') {
        this.form.consultantId16 = ''
        this.form.consultantUserName16 = ''
        this.form.consultantRealName16 = ''
        this.form.consultantCommissionPercent16 = null
      } else if (val === '17') {
        this.form.consultantId17 = ''
        this.form.consultantUserName17 = ''
        this.form.consultantRealName17 = ''
        this.form.consultantCommissionPercent17 = null
      } else if (val === '18') {
        this.form.consultantId18 = ''
        this.form.consultantUserName18 = ''
        this.form.consultantRealName18 = ''
        this.form.consultantCommissionPercent18 = null
      } else if (val === '19') {
        this.form.consultantId19 = ''
        this.form.consultantUserName19 = ''
        this.form.consultantRealName19 = ''
        this.form.consultantCommissionPercent19 = null
      } else if (val === '20') {
        this.form.consultantId20 = ''
        this.form.consultantUserName20 = ''
        this.form.consultantRealName20 = ''
        this.form.consultantCommissionPercent20 = null
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
      } else if (this.consultantIndex === '6') {
        this.form.consultantId6 = val.id
        this.form.consultantUserName6 = val.username
        this.form.consultantRealName6 = val.realname
      } else if (this.consultantIndex === '7') {
        this.form.consultantId7 = val.id
        this.form.consultantUserName7 = val.username
        this.form.consultantRealName7 = val.realname
      } else if (this.consultantIndex === '8') {
        this.form.consultantId8 = val.id
        this.form.consultantUserName8 = val.username
        this.form.consultantRealName8 = val.realname
      } else if (this.consultantIndex === '9') {
        this.form.consultantId9 = val.id
        this.form.consultantUserName9 = val.username
        this.form.consultantRealName9 = val.realname
      } else if (this.consultantIndex === '10') {
        this.form.consultantId10 = val.id
        this.form.consultantUserName10 = val.username
        this.form.consultantRealName10 = val.realname
      } else if (this.consultantIndex === '11') {
        this.form.consultantId11 = val.id
        this.form.consultantUserName11 = val.username
        this.form.consultantRealName11 = val.realname
      } else if (this.consultantIndex === '12') {
        this.form.consultantId12 = val.id
        this.form.consultantUserName12 = val.username
        this.form.consultantRealName12 = val.realname
      } else if (this.consultantIndex === '13') {
        this.form.consultantId13 = val.id
        this.form.consultantUserName13 = val.username
        this.form.consultantRealName13 = val.realname
      } else if (this.consultantIndex === '14') {
        this.form.consultantId14 = val.id
        this.form.consultantUserName14 = val.username
        this.form.consultantRealName14 = val.realname
      } else if (this.consultantIndex === '15') {
        this.form.consultantId15 = val.id
        this.form.consultantUserName15 = val.username
        this.form.consultantRealName15 = val.realname
      } else if (this.consultantIndex === '16') {
        this.form.consultantId16 = val.id
        this.form.consultantUserName16 = val.username
        this.form.consultantRealName16 = val.realname
      } else if (this.consultantIndex === '17') {
        this.form.consultantId17 = val.id
        this.form.consultantUserName17 = val.username
        this.form.consultantRealName17 = val.realname
      } else if (this.consultantIndex === '18') {
        this.form.consultantId18 = val.id
        this.form.consultantUserName18 = val.username
        this.form.consultantRealName18 = val.realname
      } else if (this.consultantIndex === '19') {
        this.form.consultantId19 = val.id
        this.form.consultantUserName19 = val.username
        this.form.consultantRealName19 = val.realname
      } else if (this.consultantIndex === '20') {
        this.form.consultantId20 = val.id
        this.form.consultantUserName20 = val.username
        this.form.consultantRealName20 = val.realname
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
    // 打开“选择Leader”对话框
    openSelectLeaderDialog () {
      this.selectLeaderDialogShow = true
    },
    // “选择BD”对话框返回
    sureSelectBDDialog (val) {
      // 首先关闭对话框
      this.selectBDDialogShow = false
      this.form.bdId = val.id
      this.form.bdUserName = val.username
      this.form.bdRealName = val.realname
    },
    // “选择Leader”对话框返回
    sureSelectLeaderDialog (val) {
      // 首先关闭对话框
      this.selectLeaderDialogShow = false
      this.form.leaderId = val.id
      this.form.leaderUserName = val.username
      this.form.leaderRealName = val.realname
    },
    // “选择hr”对话框返回
    sureSelectHRDialog (val) {
      // 首先关闭对话框
      this.selectHRDialogShow = false
      this.form.hrId = val.id
      this.form.hrChineseName = val.chineseName
      this.form.hrEnglishName = val.englishName
    },
    // billing只读控制方法
    billingReadonly: function () {
      // 管理员可以修改Billing
      if (commonJS.isAdmin()) {
        return false
      } else {
        if (this.form.clientId === 83128 || this.form.clientId === 116400 || this.form.clientId === 511253 || this.form.clientId === 7487) {
          // 一汽奔腾 一汽红旗 理想的2个公司 可以修改billing
          return false
        }
        return true
      }
    },
    // gp只读控制方法
    gpReadonly: function () {
      // 管理员可以修改GP
      return !commonJS.isAdmin()
    },
    // 通过billing计算GP
    getGP: function () {
      if (this.form.type === 'perm' && this.form.billing !== null) {
        // 猎头业务才计算
        let params = {
          'billing': this.form.billing
        }
        salaryApi.billingToGp(params).then(res => {
          if (res.status === 200) {
            this.form.gp = res.data
          }
        })
      }
    },
    // base变化计算billing和gp
    calcBillingAndGp: function () {
      if (this.form.type === 'perm' && this.form.base !== null && this.form.clientId !== null) {
        // 猎头业务才计算
        let params = {
          'base': this.form.base,
          'clientId': this.form.clientId
        }
        salaryApi.calcBillingByBaseAndClient(params).then(res => {
          if (res.status === 200) {
            this.form.billing = res.data[0]
            this.form.gp = res.data[1]
          }
        })
      }
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
    }
  },
  created () {
    // 获取当前用户的角色列表
    userApi.findSelf().then(res => {
      if (res.status === 200) {
        this.roles = res.data.roles
        this.jobType = res.data.jobType
      }
    })
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.successfulPerm) !== 'undefined') {
        this.form = this.$route.query.successfulPerm
        // 通过顾问id不为空，控制顾问按钮显示
        if (commonJS.judgeStrIsNotNull(this.form.consultantId)) {
          this.consultantColumnShow1 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId2)) {
          this.consultantColumnShow2 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId3)) {
          this.consultantColumnShow3 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId4)) {
          this.consultantColumnShow4 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId5)) {
          this.consultantColumnShow5 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId6)) {
          this.consultantColumnShow6 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId7)) {
          this.consultantColumnShow7 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId8)) {
          this.consultantColumnShow8 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId9)) {
          this.consultantColumnShow9 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId10)) {
          this.consultantColumnShow10 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId11)) {
          this.consultantColumnShow11 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId12)) {
          this.consultantColumnShow12 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId13)) {
          this.consultantColumnShow13 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId14)) {
          this.consultantColumnShow14 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId15)) {
          this.consultantColumnShow15 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId16)) {
          this.consultantColumnShow16 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId17)) {
          this.consultantColumnShow17 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId18)) {
          this.consultantColumnShow18 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId19)) {
          this.consultantColumnShow19 = true
        }
        if (commonJS.judgeStrIsNotNull(this.form.consultantId20)) {
          this.consultantColumnShow20 = true
        }
      }
    }
    clientApi.findAllOrderByChineseName().then(
      res => {
        if (res.status === 200) {
          // 将从服务端获取的id赋值给前端显示
          this.clients = res.data
        }
      })
    // 查询成功case类型列表
    configApi.findAllByCategory({
      category: 'SuccessfulCaseType'
    }).then(res => {
      if (res.status === 200) {
        this.typeList = res.data
      }
    })
  }
}
