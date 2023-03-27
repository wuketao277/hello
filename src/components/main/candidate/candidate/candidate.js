import candidateApi from '@/api/candidate'
import candidateForCaseApi from '@/api/candidateForCase'
import commentApi from '@/api/comment'
import myTaskApi from '@/api/myTask'
import uploadFileApi from '@/api/uploadFile'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'
import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import commonJS from '@/common/common'
import userApi from '@/api/user'

export default {
  components: {
    uploadFile,
    downloadFile,
    selectCase
  },
  data () {
    return {
      attention: false,
      selectCaseDialogShow: false, // 选择职位对话框
      candidateForCaseList: [], // 候选人推荐职位列表
      selectedCase: null, // 选中职位
      mode: 'add', // 默认操作模式为新建
      resume: '', // 简历
      form: {
        id: null,
        date: '',
        chineseName: '',
        englishName: '',
        age: 0,
        birthDay: '',
        phoneNo: '',
        email: '',
        companyName: '',
        department: '',
        title: '',
        schoolName: '',
        hometown: '',
        currentAddress: '',
        futureAddress: '',
        currentMoney: '',
        futureMoney: '',
        englishLevel: '',
        japaneseLevel: '',
        remark: '',
        createUserId: null,
        createUserName: null,
        createRealName: null,
        notMatchReason: 'NO',
        notMatchReasonDetail: '',
        doubleCheck: []
      },
      phaseOptions: [{
        value: 'SL',
        lable: 'SL'
      },
      {
        value: 'TI',
        lable: 'TI'
      },
      {
        value: 'VI',
        lable: 'VI'
      },
      {
        value: 'IOI',
        lable: 'IOI'
      },
      {
        value: 'CVO',
        lable: 'CVO'
      },
      {
        value: '1st Interview',
        lable: '1st Interview'
      },
      {
        value: '2nd Interview',
        lable: '2nd Interview'
      },
      {
        value: '3rd Interview',
        lable: '3rd Interview'
      },
      {
        value: '4th Interview',
        lable: '4th Interview'
      },
      {
        value: 'Final Interview',
        lable: 'Final Interview'
      },
      {
        value: 'CF',
        lable: 'CF'
      },
      {
        value: 'Offer Signed',
        lable: 'Offer Signed'
      },
      {
        value: 'On Board',
        lable: 'On Board'
      },
      {
        value: 'Pre. Service',
        lable: 'Pre. Service'
      },
      {
        value: 'On Service',
        lable: 'On Service'
      },
      {
        value: 'Week Service',
        lable: 'Week Service'
      },
      {
        value: 'Month Service',
        lable: 'Month Service'
      },
      {
        value: '2Month Service',
        lable: '2Month Service'
      },
      {
        value: '3Month Service',
        lable: '3Month Service'
      },
      {
        value: '4Month Service',
        lable: '4Month Service'
      },
      {
        value: '5Month Service',
        lable: '5Month Service'
      },
      {
        value: '6Month Service',
        lable: '6Month Service'
      },
      {
        value: 'Turndown Offer',
        lable: 'Turndown Offer'
      },
      {
        value: 'Period Failed',
        lable: 'Period Failed'
      },
      {
        value: 'END',
        lable: 'END'
      }
      ],
      // 新评论
      newComment: {
        phase: 'TI',
        interviewTime: null,
        content: ''
      },
      // 历史评论
      comments: [],
      rules: {
        chineseName: [{
          required: true,
          message: '中文名必填',
          trigger: 'blur'
        },
        {
          max: 25,
          message: '中文名长度不能大于25个字符',
          trigger: 'blur'
        }
        ],
        englishName: [{
          max: 100,
          message: '英文名长度不能大于100个字符',
          trigger: 'blur'
        }],
        phoneNo: [{
          max: 20,
          message: '电话号码长度不能大于20个字符',
          trigger: 'blur'
        }],
        email: [{
          max: 200,
          message: '邮箱长度不能大于200个字符',
          trigger: 'blur'
        }],
        companyName: [{
          max: 200,
          message: '公司名称长度不能大于200个字符',
          trigger: 'blur'
        }],
        department: [{
          max: 200,
          message: '部门名称长度不能大于200个字符',
          trigger: 'blur'
        }],
        title: [{
          max: 200,
          message: '职位名称长度不能大于200个字符',
          trigger: 'blur'
        }],
        englishLevel: [{
          max: 200,
          message: '英文水平长度不能大于100个字符',
          trigger: 'blur'
        }]
      },
      // 任务集合
      tasks: [],
      // 新任务
      newTask: {
        executeDate: null,
        taskTitle: '',
        taskContent: '',
        relativeCandidateId: null,
        finished: false,
        executeResult: ''
      },
      rulesTask: {
        executeDateTime: {
          required: true,
          message: '执行时间必填',
          trigger: 'blur'
        },
        taskTitle: [{
          required: true,
          message: '任务标题必填',
          trigger: 'blur'
        },
        {
          max: 200,
          message: '任务标题长度不能大于200个字符',
          trigger: 'blur'
        }
        ],
        taskContent: [{
          required: true,
          message: '任务内容必填',
          trigger: 'blur'
        },
        {
          max: 2000,
          message: '任务内容长度不能大于2000个字符',
          trigger: 'blur'
        }
        ]
      },
      // 性别
      genders: commonJS.genders,
      showUploadFileDialog: false, // 上传文件对话框
      uploadFileData: null, // 上传文件附加数据
      uploadFiles: [], // 上传文件集合
      notMatchReasonList: commonJS.notMatchReasonList,
      roles: [],
      jobType: '', // 工作类型
      doubleCheckList: [{
        key: 'RESUME',
        name: '简历内容真实准确'
      }] // 必要检查项
    }
  },
  methods: {
    // 计算候选人年龄
    birthdayChange (val) {
      if (typeof (val) !== 'undefined') {
        candidateApi.calcAge(val).then(res => {
          if (res.status !== 200) {
            this.$message.error({
              message: '系统异常，请联系管理员！'
            })
          } else {
            this.form.age = res.data
          }
        })
      }
    },
    // 格式化时间
    formatTime (row, column, cellvalue, index) {
      return commonJS.formatTime(cellvalue)
    },
    // 格式化 for 面试时间
    formatTimeForInterviewTime (row, column, cellvalue, index) {
      return commonJS.formatTimeToyyyyMMddHHmm(cellvalue)
    },
    // 处理选中职位变更事件
    handleSelectCaseChange (val) {
      this.selectedCase = val
    },
    // 更新关注列表
    updateCandidateAttention () {
      let params = {
        attention: this.attention,
        candidateId: this.form.id
      }
      candidateApi.updateCandidateAttention(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '系统异常，请联系管理员！'
          })
        } else {
          this.$message({
            message: '更新成功！',
            type: 'success',
            showClose: true
          })
        }
      })
    },
    // 查询候选人关注情况
    queryCandidateAttentionByCandidateId () {
      if (this.form.id !== null) {
        candidateApi.queryCandidateAttentionByCandidateId(this.form.id).then(res => {
          if (res.status === 200) {
            this.attention = res.data
          }
        })
      }
    },
    // 添加CF阶段的模板
    addCFModel (row) {
      this.newComment.phase = 'CF'
      this.newComment.content = this.form.chineseName + '面试' + row.caseTitle + '岗位' + row.phase + '反馈：\n' +
        '1、面了多久？面试官是谁？你觉得自己过了吗？为什么？体现在哪儿？\n' +
        '2、顾问觉得候选人通过了吗？为什么？' +
        '3、面试官问了哪些问题？你怎么回答的？好在哪里，体现在哪里，不好在哪里，不好的问题怎么回答的？过程中面试官态度怎么样？\n' +
        '4、面试最后怎么结束的？面试官怎么反馈的？有没有介绍他们那边的情况？\n' +
        '5、面试之后对这个机会的Motivation几分？ 没打满分的原因是什么呢？\n' +
        '6、现在还有在面试流程中的其他机会吗？如果都给你offer你怎么选？'
    },
    // Candidate Feedback的显示控制按钮
    showCommentCFButton (row) {
      let phase = row.phase
      if (phase === '1st Interview' || phase === '2nd Interview' || phase === '3rd Interview' || phase === '4th Interview' || phase === 'Final Interview') {
        return true
      }
      return false
    },
    // 评论删除按钮的显示控制
    showCommentDeleteButton (row) {
      return commonJS.isAdmin() || commonJS.getUserName() === row.username
    },
    // 删除评论
    deleteComment (row) {
      this.$confirm('确认要评论吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 调用接口
          commentApi.deleteById(row.id).then(res => {
            if (res.status === 200) {
              // 删除成功
              this.$message({
                message: '删除成功！',
                type: 'success',
                showClose: true
              })
              // 重新查询全部评论
              this.queryComment()
            } else {
              this.$message({
                message: '保存异常，请联系管理员！',
                type: 'warning',
                showClose: true
              })
            }
          })
        })
    },
    // 显示控制
    showControl (key) {
      if (key === 'deleteRecommend' || key === 'delete') {
        return commonJS.isAdminInArray(this.roles)
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 是否关注
    isAttention (row) {
      return row.attention
    },
    // 更新候选人职位关注信息
    updateCandidateForCaseAttention (row, attention) {
      let params = {
        id: row.id,
        attention: attention
      }
      candidateForCaseApi.updateAttention(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '系统异常，请联系管理员！'
          })
        } else {
          this.$message({
            message: '更新成功！',
            type: 'success',
            showClose: true
          })
          // 刷新推荐列表
          this.queryCandidateForCaseList()
        }
      })
    },
    // 删除推荐
    deleteRecommend (index, row) {
      this.$confirm('确认要删除推荐吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          candidateForCaseApi.deleteById(row.id).then(res => {
            if (res.status !== 200) {
              this.$message.error({
                message: '删除失败，请联系管理员！'
              })
            } else {
              this.$message({
                message: '删除成功！',
                type: 'success',
                showClose: true
              })
              this.queryCandidateForCaseList()
            }
          })
        })
    },
    // 编辑职位
    editCase (index, row) {
      this.$router.push({
        path: '/case/case',
        query: {
          mode: 'modify',
          caseId: row.caseId
        }
      })
    },
    // 编辑客户
    editClient (index, row) {
      this.$router.push({
        path: '/client/client',
        query: {
          mode: 'modify',
          clientId: row.clientId
        }
      })
    },
    // 打开职位选择对话框
    openSelectCaseDialog () {
      // 候选人必须先保存
      if (this.form.id === null) {
        this.$message({
          message: '请先保存候选人！',
          type: 'warning'
        })
        return
      }
      this.selectCaseDialogShow = true
    },
    // 保存 新评论
    saveComment () {
      // 必须先保存候选人
      if (this.form.id === null || this.form.id.length === 0) {
        this.$message({
          message: '请先保存候选人！',
          type: 'warning'
        })
        return
      }
      // 除了END阶段以外，其他阶段必须填写评论内容
      if (this.newComment.phase !== 'END') {
        if (this.newComment.content === null || this.newComment.content.length === 0) {
          this.$message({
            message: '请填写评论内容！',
            type: 'warning'
          })
          return
        }
      }
      // 面试阶段需要填写面试时间
      if (this.newComment.phase === '1st Interview' || this.newComment.phase === '2nd Interview' || this.newComment.phase === '3rd Interview' || this.newComment.phase === '4th Interview' || this.newComment.phase === 'Final Interview') {
        if (this.newComment.interviewTime === null) {
          this.$message({
            message: '请填写面试时间',
            type: 'warning'
          })
          return
        }
      } else {
        // 非面试阶段，面试时间为空
        this.newComment.interviewTime = null
      }
      // 如果是保存CVO阶段，必须勾选“必要检查”
      if (this.newComment.phase === 'CVO') {
        if (this.form.doubleCheck.length !== this.doubleCheckList.length) {
          this.$message({
            message: '请勾选必要检查',
            type: 'warning'
          })
          return
        }
      }
      // 组装数据
      let comment = this.newComment
      comment['candidateId'] = this.form.id
      // 如果只有一个关联职位，就作为默认职位
      if (this.candidateForCaseList.length === 1) {
        this.selectedCase = this.candidateForCaseList[0]
      }
      // 只有SL和TI时可以不选择职位
      if (this.selectedCase === null) {
        if (this.newComment.phase !== 'SL' && this.newComment.phase !== 'TI') {
          this.$message({
            message: '请选择关联职位！',
            type: 'error'
          })
          return
        }
      } else {
        comment['clientId'] = this.selectedCase.clientId
        comment['clientName'] = this.selectedCase.clientName
        comment['caseId'] = this.selectedCase.caseId
        comment['caseTitle'] = this.selectedCase.title
      }
      // 调用接口
      commentApi.save(comment).then(res => {
        if (res.status === 200) {
          // 保存成功
          this.$message({
            message: '保存成功！',
            type: 'success',
            showClose: true
          })
          // 重新查询全部评论
          this.queryComment()
          // 清空评论区
          this.newComment.content = ''
        } else {
          this.$message({
            message: '保存异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 查询所有评论
    queryComment () {
      if (this.form.id !== null) {
        commentApi.findAllByCandidateIdOrderByDesc({
          'candidateId': this.form.id
        }).then(res => {
          if (res.status === 200) {
            this.comments = res.data
          }
        })
      }
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.candidate
      } else {
        this.form.id = ''
        this.form.date = ''
        this.form.chineseName = ''
        this.form.englishName = ''
        this.form.age = 0
        this.form.phoneNo = ''
        this.form.email = ''
        this.form.companyName = ''
        this.form.department = ''
        this.form.title = ''
        this.form.schoolName = ''
        this.form.currentAddress = ''
        this.form.futureAddress = ''
        this.form.currentMoney = ''
        this.form.futureMoney = ''
        this.form.englishLevel = ''
        this.form.remark = ''
        this.form.createUserId = null
        this.form.createUserName = null
        this.form.createRealName = null
        this.form.notMatchReason = 'NO'
        this.form.notMatchReasonDetail = ''
      }
    },
    // 保存候选人-子方法
    saveCandidate () {
      // 如果校验通过就调用后端接口
      candidateApi.save(this.form).then(
        res => {
          if (res.status === 200) {
            // 将从服务端获取的id赋值给前端显示
            this.form.id = res.data.id
            this.form.createUserId = res.data.createUserId
            this.form.createUserName = res.data.createUserName
            this.form.createRealName = res.data.createRealName
            if (this.resume.length === 0) {
              // 如果简历栏中没有内容，就直接返回保存成功
              this.$message({
                message: '保存成功！',
                type: 'success',
                showClose: true
              })
            } else {
              // 如果简历栏中有内容，就保存简历内容
              let resumeObj = {
                'candidateId': this.form.id,
                'content': this.resume
              }
              candidateApi.saveResume(resumeObj).then(
                res => {
                  if (res.status === 200) {
                    this.$message({
                      message: '保存成功！',
                      type: 'success',
                      showClose: true
                    })
                  }
                }
              )
            }
          }
        })
    },
    // 保存候选人
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id === null && this.form.phoneNo !== '' && this.form.phoneNo !== null) {
            candidateApi.isExist(this.form.phoneNo).then(
              res => {
                if (res.status === 200 && res.data === true) {
                  this.$message({
                    message: '电话号码已存在！',
                    type: 'warning',
                    showClose: true
                  })
                } else {
                  this.saveCandidate()
                }
              })
          } else {
            // 已存在的候选人，直接保存修改。
            this.saveCandidate()
          }
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
    // 查询当前候选人相关的任务
    queryTask () {
      if (this.form.id !== null) {
        myTaskApi.findByRelativeCandidateId(this.form.id).then(res => {
          if (res.status === 200) {
            this.tasks = res.data
          }
        })
      }
    },
    // 查询当前候选人简历信息
    queryResume () {
      if (this.form.id !== null) {
        let params = {
          'candidateId': this.form.id
        }
        candidateApi.findResumeByCandidateId(params).then(res => {
          if (res.status === 200) {
            this.resume = res.data
          }
        })
      }
    },
    // 查询当前候选人推荐职位信息
    queryCandidateForCaseList () {
      if (this.form.id !== null) {
        let params = {
          'candidateId': this.form.id
        }
        candidateForCaseApi.findByCandidateId(params).then(res => {
          if (res.status === 200) {
            this.candidateForCaseList = res.data
          }
        })
      }
    },
    // 保存任务
    saveTask () {
      this.newTask.relativeCandidateId = this.form.id
      myTaskApi.saveTaskToSelf(this.newTask).then(
        res => {
          if (res.status === 200) {
            // 重新获取任务列表
            this.queryTask()
          }
        })
    },
    // 打开上传文件对话框
    openUploadFileDialog () {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存候选人信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.uploadFileData = {
          'tableId': this.form.id,
          'tableName': 'candidate'
        }
        this.showUploadFileDialog = true
      }
    },
    // 查询上传文件集合
    queryUploadFiles () {
      if (this.form.id !== null) {
        let params = {
          'relativeTableId': this.form.id,
          'relativeTableName': 'candidate'
        }
        uploadFileApi.findByRelativeTableIdAndRelativeTableName(params).then(res => {
          if (res.status === 200) {
            this.uploadFiles = res.data
          }
        })
      }
    },
    queryOthers () {
      // 查询comment
      this.queryComment()
      // 查询任务
      this.queryTask()
      // 查询上传文件
      this.queryUploadFiles()
      // 查询简历信息
      this.queryResume()
      // 查询当前候选人推荐职位信息
      this.queryCandidateForCaseList()
      // 查询关注情况
      this.queryCandidateAttentionByCandidateId()
    },
    // “推荐职位”对话框返回
    sureSelectCaseDialog (val) {
      // 首先关闭对话框
      this.selectCaseDialogShow = false
      let params = {
        candidateId: this.form.id,
        caseId: val.id
      }
      candidateForCaseApi.saveSimple(params).then(
        res => {
          if (res.status === 200) {
            // 重新获取推荐列表
            this.queryCandidateForCaseList()
            // 清空列表之前可能存在的选中行
            this.selectedCase = null
          }
        })
    },
    // 通过id删除候选人
    deleteById () {
      this.$confirm('确认要删除候选人 ' + this.form.chineseName + ' 吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        candidateApi.deleteById(this.form.id).then(res => {
          if (res.status === 200) {
            this.$router.push({
              path: '/candidate/candidatelist'
            })
          } else {
            this.$message.error('删除失败！')
          }
        })
      })
    }
  },
  computed: {},
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
      // 获取候选人数据
      // 如果没有候选人对象，就获取候选人id然后从数据库中查询候选人对象
      if (typeof (this.$route.query.candidate) === 'undefined') {
        let params = {
          'id': this.$route.query.candidateId
        }
        candidateApi.findById(params).then(
          res => {
            if (res.status === 200) {
              this.form = res.data
              this.queryOthers()
            }
          })
      } else {
        this.form = this.$route.query.candidate
        this.queryOthers()
      }
    }
  }
}
