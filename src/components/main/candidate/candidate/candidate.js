import candidateApi from '@/api/candidate'
import candidateForCaseApi from '@/api/candidateForCase'
import commentApi from '@/api/comment'
import myTaskApi from '@/api/myTask'
import uploadFileApi from '@/api/uploadFile'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'
import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import commonJS from '@/common/common'
import caseApi from '@/api/case'
import userApi from '@/api/user'
import labelApi from '@/api/label'
import {
  Promise
} from 'q'

export default {
  components: {
    uploadFile,
    downloadFile,
    selectCase
  },
  data() {
    return {
      tempResume: null, // 临时简历
      tempAge: null,
      newLabel: null,
      attention: false,
      myCaseAttentionDialogShow: false, // 我的职位对话框显示标志
      myCaseAttentionList: [], // 我的职位列表
      selectCaseDialogShow: false, // 选择职位对话框
      candidateForCaseList: [], // 候选人推荐职位列表
      selectedCase: null, // 选中职位
      mode: 'add', // 默认操作模式为新建
      resume: '', // 简历
      showMakeCVOButtonFlag: false, // 显示生成CVO按钮标志
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
        schoolName: '',
        hometown: '',
        currentAddress: '',
        futureAddress: '',
        currentMoney: '',
        futureMoney: '',
        englishLevel: '',
        remark: '',
        createUserId: null,
        createUserName: null,
        createRealName: null,
        notMatchReason: 'NO',
        notMatchReasonDetail: '',
        doubleCheck: [],
        lables: [],
        motivation: '请问您会考虑看机会吗？（什么原因不考虑呢？那您想看哪些品牌呢？）您现在考虑看机会最看重的点是什么呢？想看什么方向的机会？',
        interviewHistory: '您面过xx吗？什么时候面的（六个月之内面过，我们不能重复推荐）？面下来情况怎么样？面试官是谁？',
        specialItem: [],
        companyStructure: '你所在的部门叫什么，现在汇报给谁，他的title是什么负责什么？\r\n' +
          '和你平级的有几位？他们都负责什么，你们是怎么分工的？\r\n' +
          '你带多少人，你的下属是如何分工？\r\n' + '和你平级的几位负责的团队有多少人？',
      },
      phaseOptions: commonJS.phaseOptions,
      // 新评论
      newComment: {
        id: null,
        phase: 'TI',
        interviewTime: null,
        content: '',
        isFinal: false
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
          max: 2000,
          message: '公司名称长度不能大于2000个字符',
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
        relativeCandidateChineseName: null,
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
      allLabels: [] // 顾问的全部标签
    }
  },
  methods: {
    // 候选人评论中阶段发生变化事件
    phaseChange(value) {
      this.newComment.isFinal = false
      this.newComment.content = null
      this.newComment.interviewTime = null
      this.showMakeCVOButtonFlag = false
      if (value === 'Pre. Service') {
        this.newComment.content = '一、离职手续是否办妥\r\n' +
          '    （前期）要盖章的材料是否都寄出\r\n' +
          '    （后期）是否有收到盖完章的文件\r\n' +
          '二、能否按时入职\r\n' +
          '    房子是不是租好了\r\n' +
          '    交通方不方便\r\n' +
          '    清楚入职时间和地点么，找谁对接'
      } else if (value === 'On Service') {
        this.newComment.content = '一、 入职办理是否顺利\r\n' +
          '   1.谁帮忙办的入职\r\n' +
          '   2.见到了谁\r\n' +
          '   3.电脑/邮箱等等是否设定好\r\n' +
          '二、生活\r\n' +
          '   1.几点到的公司\r\n' +
          '   2.怎么去的\r\n' +
          '   3.上班路途是否顺利\r\n' +
          '   4.几点下班\r\n' +
          '   5.和谁一起吃饭，同事怎么样\r\n' +
          '三、工作\r\n' +
          '   1.工作和自己想象中差别大吗\r\n' +
          '   2.有没有什么training 或者work plan\r\n' +
          '   3.Team 氛围如何'
      } else if (value === 'Week Service') {
        this.newComment.content = '一、上周的工作情况\r\n' +
          '   1.接触项目\r\n' +
          '   2.培训情况\r\n' +
          '   3.加班情况\r\n' +
          '二、同事关系\r\n' +
          '   1.饭搭子\r\n' +
          '   2.领导的印象\r\n' +
          '三、对家庭的影响\r\n' +
          '   1.老婆上班\r\n' +
          '   2.父母作息\r\n' +
          '   3.小孩接送\r\n' +
          '四、现在项目与之前期待的一致吗\r\n' +
          '   1.区别是？\r\n' +
          '   2.进展是？\r\n' +
          '   3.有影响吗？\r\n' +
          '   4.期待收获什么？\r\n' +
          '五、觉得自己能够胜任吗（挑战/压力）\r\n' +
          '六、觉得比较嗨的地方'
      } else if (value === 'Month Service') {
        this.newComment.content = '一、工作内容\r\n' +
          '   1.项目进度\r\n' +
          '   2.难点、压力与挑战\r\n' +
          '   3.变动与进展\r\n' +
          '二、关系\r\n' +
          '   1.上下沟通\r\n' +
          '   2.内外沟通\r\n' +
          '三、工资的落实情况\r\n' +
          '四、主观体验\r\n' +
          '   1.工作状态\r\n' +
          '   2.满意度\r\n' +
          '   3.与预期的差别\r\n' +
          '五、生活适应，生活状态的更新，与工作的平衡 \r\n' +
          '六、未来导向（计划、期望、自我定位）\r\n' +
          '七、组织架构、老板风格、招聘进度、其他外包人员、推荐 \r\n' +
          '八、是否被其他猎头联系 \r\n' +
          '九、反馈客户的评价'
      } else if (value === '2Month Service' || value === '3Month Service' ||
        value === '4Month Service' || value === '5Month Service' || value === '6Month Service') {
        this.newComment.content = '一、General Questions：工作+生活\r\n' +
          '二、了解公司情况：\r\n' +
          '   1.公司内部有没有新项目\r\n' +
          '   2.有没有新的招聘需求\r\n' +
          '   3.有没有新人进入\r\n' +
          '   4.用人经理什么风格\r\n' +
          '   5.公司最近有没有什么变动'
      } else if (value === 'CVO') {
        this.showMakeCVOButtonFlag = true
      }
    },
    // 计算候选人年龄
    birthdayChange(val) {
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
    // 计算候选人生日
    ageChange(val) {
      if (typeof (val) !== 'undefined') {
        this.form.birthDay = new Date().getFullYear() - val + '-01-01'
        this.birthdayChange(this.form.birthDay)
      }
    },
    // 格式化是否终面
    formatIsFinal(row, column, cellvalue, index) {
      if (cellvalue) {
        return '是'
      } else {
        return '否'
      }
    },
    // 格式化阶段
    formatPhase(row, column, cellvalue, index) {
      if (row['isFinal']) {
        return cellvalue + ' (F)'
      } else {
        return cellvalue
      }
    },
    // 格式化 for 面试时间
    formatTimeForInterviewTime(row, column, cellvalue, index) {
      return commonJS.formatTimeToyyyyMMddHHmm(cellvalue)
    },
    // 处理选中职位变更事件
    handleSelectCaseChange(val) {
      this.selectedCase = val
    },
    // 更新关注列表
    updateCandidateAttention() {
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
    queryCandidateAttentionByCandidateId() {
      if (this.form.id !== null) {
        candidateApi.queryCandidateAttentionByCandidateId(this.form.id).then(res => {
          if (res.status === 200) {
            this.attention = res.data
          }
        })
      }
    },
    // 添加CF阶段的模板
    addCFModel(row) {
      this.newComment.phase = 'CF'
      this.newComment.content = this.form.chineseName + '面试' + row.caseTitle + '岗位' + row.phase + '反馈：\n' +
        '1、你觉得自己过了吗？面了多久？面试官是谁？为什么？体现在哪儿？\n' +
        '2、顾问觉得候选人通过了吗？为什么？\n' +
        '3、面试官问了哪些问题？你怎么回答的？好在哪里，体现在哪里，不好在哪里，不好的问题怎么回答的？过程中面试官态度怎么样？\n' +
        '4、面试最后怎么结束的？面试官怎么反馈的？有没有介绍他们那边的情况？\n' +
        '5、面试之后对这个机会的Motivation几分？ 没打满分的原因是什么呢？\n' +
        '6、现在还有在面试流程中的其他机会吗？如果都给你offer你怎么选？\n' +
        '7、目前薪资和期望薪资具体是多少，如果有变化原因是什么？\n' +
        '8、下一轮方便面试的时间是什么？'
    },
    // Candidate Feedback的显示控制按钮
    showCommentCFButton(row) {
      let phase = row.phase
      if (phase === '1st Interview' || phase === '2nd Interview' || phase === '3rd Interview' || phase === '4th Interview' || phase === '5th Interview' || phase === '6th Interview') {
        return true
      }
      return false
    },
    // 评论删除按钮的显示控制
    showCommentDeleteButton(row) {
      return commonJS.isAdmin() || commonJS.getUserName() === row.username
    },
    // 删除评论
    deleteComment(row) {
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
    showControl(key) {
      if (key === 'deleteRecommend' || key === 'delete') {
        return commonJS.isAdminInArray(this.roles)
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 是否关注
    isAttention(row) {
      return row.attention
    },
    // 更新候选人职位关注信息
    updateCandidateForCaseAttention(row, attention) {
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
    deleteRecommend(index, row) {
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
    editCase(index, row) {
      this.$router.push({
        path: '/background.html/case/case',
        query: {
          mode: 'modify',
          caseId: row.caseId
        }
      })
    },
    // 生成确认岗位信息话术
    makeConfirmStr(index, row) {
      let s = ''
      if (this.form.gender === 'MALE') {
        s = '先生'
      } else if (this.form.gender === 'FEMALE') {
        s = '女士'
      }
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<span>' + this.form.chineseName + s + '，现在给您推荐的是' + row.clientName + '的' + row.title + '岗位。</br>' +
          '您的电话是：' + this.form.phoneNo + '</br>' +
          '您的邮箱是：' + this.form.email + '</br>' + '请确认！</span>'
      })
    },
    // 编辑客户
    editClient(index, row) {
      // 只有全职的同事可以跳转到客户列表
      if (commonJS.isFulltimeJobType()) {
        this.$router.push({
          path: '/background.html/client/client',
          query: {
            mode: 'modify',
            clientId: row.clientId
          }
        })
      }
    },
    // 打开我的职位对话框
    openMyCaseDialog() {
      // 候选人必须先保存
      if (this.form.id === null) {
        this.$message({
          message: '请先保存候选人！',
          type: 'warning'
        })
        return
      }
      caseApi.queryAllCaseAttention2().then(res => {
        this.myCaseAttentionList = res.data
      })
      this.myCaseAttentionDialogShow = true
    },
    // 打开职位选择对话框
    openSelectCaseDialog() {
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
    // 保存 新评论 同步方法
    async saveComment() {
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
      // 评论阶段必填
      if (this.newComment.phase === null || this.newComment.phase === '') {
        this.$message({
          message: '请评论阶段必选！',
          type: 'warning'
        })
        return
      }
      // 面试阶段需要填写面试时间
      if (this.newComment.phase === '1st Interview' || this.newComment.phase === '2nd Interview' || this.newComment.phase === '3rd Interview' || this.newComment.phase === '4th Interview' || this.newComment.phase === '5th Interview' || this.newComment.phase === '6th Interview') {
        if (this.newComment.interviewTime === null) {
          this.$message({
            message: '请填写面试时间',
            type: 'warning'
          })
          return
        } else if (new Date() > this.newComment.interviewTime) {
          this.$message({
            message: '面试时间不能小于当前时间',
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
        // 调用后台接口查看必要检查是否都完成
        let params = {
          'id': this.form.id
        }
        let finish = await candidateApi.finishAllDoubleCheck(params).then(res => {
          return Promise.resolve(res.data)
        })
        if (finish === false) {
          this.$message({
            message: '请勾选必要检查',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.birthDay) === 'undefined' || this.form.birthDay === '' || this.form.birthDay === null) {
          this.$message({
            message: '生日必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.phoneNo) === 'undefined' || this.form.phoneNo === '' || this.form.phoneNo === null) {
          this.$message({
            message: '手机号必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.email) === 'undefined' || this.form.email === '' || this.form.email === null) {
          this.$message({
            message: '邮箱必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.hometown) === 'undefined' || this.form.hometown === '' || this.form.hometown === null) {
          this.$message({
            message: '户籍地址必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.currentAddress) === 'undefined' || this.form.currentAddress === '' || this.form.currentAddress === null) {
          this.$message({
            message: '现地址必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.futureAddress) === 'undefined' || this.form.futureAddress === '' || this.form.futureAddress === null) {
          this.$message({
            message: '期望地址必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.companyName) === 'undefined' || this.form.companyName === '' || this.form.companyName === null) {
          this.$message({
            message: '公司必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.currentMoney) === 'undefined' || this.form.currentMoney === '' || this.form.currentMoney === null) {
          this.$message({
            message: '现薪资必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.futureMoney) === 'undefined' || this.form.futureMoney === '' || this.form.futureMoney === null) {
          this.$message({
            message: '期望薪资必须填写',
            type: 'warning'
          })
          return
        }
        if (typeof (this.form.schoolName) === 'undefined' || this.form.schoolName === '' || this.form.schoolName === null) {
          this.$message({
            message: '学校必须填写',
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
          this.newComment.id = null
          this.newComment.phase = 'TI'
          this.newComment.interviewTime = null
          this.newComment.content = null
          this.newComment.isFinal = false
          this.showMakeCVOButtonFlag = false
        } else {
          this.$message({
            message: '保存异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 生成CVO内容
    makeCVO() {
      // 如果只有一个关联职位，就作为默认职位
      if (this.candidateForCaseList.length === 1) {
        this.newComment.content = 'CVO ' + this.candidateForCaseList[0].clientName + ' ' + this.candidateForCaseList[0].title
      } else if (this.candidateForCaseList.length > 1) {
        if (this.selectedCase === null) {
          this.$message({
            message: '请选择关联职位！',
            type: 'error'
          })
        } else {
          this.newComment.content = 'CVO ' + this.selectedCase.clientName + ' ' + this.selectedCase.title
        }
      }
    },
    // 修改评论
    modifyComment(row) {
      this.newComment.id = row.id
      this.newComment.phase = row.phase
      this.newComment.interviewTime = row.interviewTime
      this.newComment.content = row.content
      this.newComment.isFinal = row.isFinal
    },
    // 查询所有评论
    queryComment() {
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
    cancel() {
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
    saveCandidate() {
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
    save() {
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
    queryTask() {
      if (this.form.id !== null) {
        myTaskApi.findByRelativeCandidateId(this.form.id).then(res => {
          if (res.status === 200) {
            this.tasks = res.data
          }
        })
      }
    },
    // 查询当前候选人简历信息
    queryResume() {
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
    queryCandidateForCaseList() {
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
    saveTask() {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存候选人信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.newTask.relativeCandidateId = this.form.id
        this.newTask.relativeCandidateChineseName = this.form.chineseName
        myTaskApi.saveTaskToSelf(this.newTask).then(
          res => {
            if (res.status === 200) {
              // 重新获取任务列表
              this.queryTask()
            }
          })
      }
    },
    // 打开上传文件对话框
    openUploadFileDialog() {
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
    queryUploadFiles() {
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
    queryOthers() {
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
    // 我的职位列表双击处理事件
    handleRowDblClickMyCaseAttentionList(row, column, event) {
      this.myCaseAttentionDialogShow = false
      let params = {
        candidateId: this.form.id,
        caseId: row.caseId
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
    // “推荐职位”对话框返回
    sureSelectCaseDialog(val) {
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
    deleteById() {
      this.$confirm('确认要删除候选人 ' + this.form.chineseName + ' 吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        candidateApi.deleteById(this.form.id).then(res => {
          if (res.status === 200) {
            this.$router.push({
              path: '/background.html/candidate/candidatelist'
            })
          } else {
            this.$message.error('删除失败！')
          }
        })
      })
    },
    // 添加新标签
    addLabel() {
      if (typeof (this.newLabel) === 'undefined' || this.form.newLabel === null || this.form.newLabel === '') {
        this.$message({
          message: '请添加标签名称！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (typeof (this.form.id) === 'undefined' || this.form.id === null) {
        this.$message({
          message: '请先保存候选人信息！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (typeof (this.newLabel) !== 'undefined' && this.newLabel !== null && this.newLabel !== '') {
        // 检查新标签是否在标签集合中
        if (this.allLabels.indexOf(this.newLabel) === -1) {
          // 新标签不在标签集合中，就将新标签添加到数据库中
          labelApi.save(this.newLabel).then(res => {
            if (res.status === 200) {
              this.findAllLabel()
              // 检查是否在已选择标签集合中
              if (this.form.labels.indexOf(this.newLabel) === -1) {
                // 不在已选择标签集合中，就添加进去
                this.form.labels.push(this.newLabel)
              }
            }
            // 保存候选人
            this.save()
          })
        } else {
          // 新标签在标签集合中
          // 检查是否在已选择标签集合中
          if (this.form.labels.indexOf(this.newLabel) === -1) {
            // 不在已选择标签集合中，就添加进去
            this.form.labels.push(this.newLabel)
          }
          // 保存候选人
          this.save()
        }
      }
    },
    // 删除标签
    deleteLabel() {
      if (typeof (this.newLabel) === 'undefined' || this.form.newLabel === null || this.form.newLabel === '') {
        this.$message({
          message: '请添加标签名称！',
          type: 'warning',
          showClose: true
        })
        return
      }
      // 调用后台删除并获取最新
      labelApi.deleteThenFindAllName(this.newLabel).then(res => {
        if (res.status === 200) {
          this.allLabels = res.data
          this.$message({
            message: '删除成功',
            type: 'success',
            showClose: true
          })
          this.save()
        }
      })
    },
    // 获取所有标签
    findAllLabel() {
      labelApi.findAllName().then(res => {
        if (res.status === 200) {
          this.allLabels = res.data
        }
      })
    },
    // 标签变更事件
    handleLabelsChange() {
      this.save()
    },
    // 整理学校
    formatSchool() {
      if (this.form.schoolName === null || this.form.schoolName.length === 0) {
        return
      }
      // 把回车换成空格，整理成1行
      let schoolName = this.form.schoolName.replace(/\r?\n/g, ' ')
      // 将学历拆分成数组
      let schoolList = []
      while (true) {
        let index = schoolName.lastIndexOf('大学') > schoolName.lastIndexOf('学院') ? schoolName.lastIndexOf('大学') : schoolName.lastIndexOf('学院')
        if (index === -1) {
          // 没找到关键字，直接把整个字符串放入数组中
          schoolList.push(schoolName)
          break
        } else {
          while (true) {
            if (schoolName[index] === ' ') {
              // 将一段学历放到数组中
              schoolList.push(schoolName.substr(index + 1))
              // 将剩余部分赋值给原来的字符串中
              schoolName = schoolName.substr(0, index)
              break
            } else if (index === 0) {
              schoolList.push(schoolName)
              schoolName = ''
              break
            }
            index--
          }
        }
      }
      // 重新拼接学校名称
      this.form.schoolName = ''
      while (schoolList.length > 0) {
        if (this.form.schoolName.length > 0) {
          this.form.schoolName += '\r\n'
        }
        this.form.schoolName += schoolList.pop()
      }
      // 出掉多余的空格
      while (this.form.schoolName.indexOf('  ') > -1) {
        this.form.schoolName = this.form.schoolName.replaceAll('  ', ' ')
      }
    },
    // 整理公司
    formatCompany() {
      if (this.form.companyName === null || this.form.companyName.length === 0) {
        return
      }
      // 把回车换成空格，整理成1行
      let companyName = this.form.companyName.replace(/\r?\n/g, ' ')
      // 拆分成数组
      let companyList = []
      while (true) {
        let index = companyName.lastIndexOf('公司')
        if (index === -1) {
          // 没找到关键字，直接把整个字符串放入数组中
          companyList.push(companyName)
          break
        } else {
          while (true) {
            if (companyName[index] === ' ') {
              // 将一段工作经历放到数组中
              companyList.push(companyName.substr(index + 1))
              // 将剩余部分赋值给原来的字符串中
              companyName = companyName.substr(0, index)
              break
            } else if (index === 0) {
              companyList.push(companyName)
              companyName = ''
              break
            }
            index--
          }
        }
      }
      // 重新拼接公司名称
      this.form.companyName = ''
      while (companyList.length > 0) {
        if (this.form.companyName.length > 0) {
          this.form.companyName += '\n\n'
        }
        let next = companyList.pop()
        let p = commonJS.getMinPosition(next, ['所在部门', '工作地点', '下属人数', '汇报对象', '职责业绩'])
        if (p != -1) {
          next = next.substr(0, p) + '\n' + next.substr(p)
        }
        this.form.companyName += next
      }
      // 出掉多余的空格
      while (this.form.companyName.indexOf('  ') > -1) {
        this.form.companyName = this.form.companyName.replaceAll('  ', ' ')
      }
    },
    // 解析简历
    analysisResume() {
      debugger
      if (this.tempResume === null || this.tempResume.trim() === '') {
        return
      }
      // 获取教育部分
      this.analysisEducationPart(this.tempResume)
      // 获取公司部分
      this.analysisCompanyPart(this.tempResume)
      // 解析求职意向
      this.analysisMotivationPart(this.tempResume)
      // 获取基础信息
      this.analysisBasisPart(this.tempResume)
      // 获取自我评价放到备注中
      this.analysisSelfEvaluationPart(this.tempResume)
      // 获取手机号
      if (commonJS.strIsBlank(this.form.phoneNo)) {
        this.form.phoneNo = commonJS.getPhoneNoFromStr(this.tempResume)
      }
      // 获取邮箱
      if (commonJS.strIsBlank(this.form.email)) {
        this.form.email = commonJS.getEmailFromStr(this.tempResume)
      }
       // 获取英文等级
       if (commonJS.strIsBlank(this.form.englishLevel)) {
        this.form.englishLevel = commonJS.getEnglishLevelFromStr(this.tempResume)
      }
      // 解析完成后，清空临时数据
      this.tempResume = ''
    },
    // 获取教育经历部分
    analysisEducationPart(resume) {
      if (!commonJS.strIsBlank(this.form.schoolName)) {
        // 教育经历字段中有内容就直接返回
        return
      }
      let startPosition = resume.indexOf('教育经历')
      if (startPosition > -1) {
        // 获取“教育经历”之后的部分
        resume = resume.substr(startPosition + 4)
        // 寻找下一个关键词位置
        let endPosition = commonJS.getMinPosition(resume, ['语言能力', '我的技能', '自我评价'])
        if (endPosition != -1) {
          this.form.schoolName = resume.substr(0, endPosition)
        } else {
          this.form.schoolName = resume
        }
        this.formatSchool()
      }
    },
    // 获取工作经历部分
    analysisCompanyPart(resume) {
      if (!commonJS.strIsBlank(this.form.companyName)) {
        // 工作经历字段中有内容就直接返回
        return
      }
      let startPosition = resume.indexOf('工作经历')
      if (startPosition > -1) {
        // 获取“工作经历”之后的部分
        resume = resume.substr(startPosition + 4)
        // 寻找下一个关键词位置
        let endPosition = commonJS.getMinPosition(resume, ['项目经历', '教育经历', '语言能力', '我的技能', '自我评价'])
        if (endPosition != -1) {
          this.form.companyName = resume.substr(0, endPosition).trim()
        } else {
          this.form.companyName = resume.trim()
        }
        this.formatCompany()
      }
    },
    // 解析求职意向
    analysisMotivationPart(resume) {
      if (!commonJS.strIsBlank(this.form.futureMoney)) {
        // 薪资字段中有内容就直接返回
        return
      }
      let startPosition = resume.indexOf('求职意向')
      if (startPosition > -1) {
        // 获取“求职意向”之后的部分
        resume = resume.substr(startPosition + 4)
        // 寻找下一个关键词位置
        let endPosition = commonJS.getMinPosition(resume, ['工作经历', '项目经历', '教育经历', '语言能力', '我的技能', '自我评价'])
        if (endPosition != -1) {
          resume = resume.substr(0, endPosition)
        }
        // 获取期望薪资
        let moneys = resume.match(/\d{1,3}-\d{1,3}k×\d{1,3}薪/)
        if (moneys.length > 0) {
          this.form.futureMoney = moneys[0]
        }
        // 获取期望地点
        for (let n of commonJS.provinceAndCityName) {
          let index = resume.indexOf(n)
          if (index != -1) {
            this.form.futureAddress = n
            break
          }
        }
      }
    },
    // 获取基础信息部分
    analysisBasisPart(resume) {
      let endPosition = resume.indexOf('求职意向')
      if (endPosition > -1) {
        // 获取“求职意向”之前的部分
        resume = resume.substr(0, endPosition)
      }
      // 获取姓名
      if (commonJS.strIsBlank(this.form.chineseName)) {
        this.form.chineseName = resume.substr(0, resume.indexOf('\n'))
      }
      // 获取年龄
      if (commonJS.strIsBlank(this.form.birthDay)) {
        let ages = resume.match(/\d{2}岁/)
        if (ages != null && ages.length > 0) {
          this.ageChange(ages[0].replace('岁', ''))
        }
      }
      // 获取性别
      if (commonJS.strIsBlank(this.form.gender)) {
        if (resume.indexOf('男') > -1) {
          this.form.gender = 'MALE'
        } else if (resume.indexOf('女') > -1) {
          this.form.gender = 'FEMALE'
        }
      }
      // 获取现地址，遍历所有省市名称，位置最靠前的一个就是现地址
      let defaultIndex = 1000
      for (let n of commonJS.provinceAndCityName) {
        let index = resume.indexOf(n)
        if (index != -1 && index < defaultIndex) {
          defaultIndex = index
          this.form.currentAddress = n
        }
      }
    },
    // 获取自我评价
    analysisSelfEvaluationPart(resume) {
      if (!commonJS.strIsBlank(this.form.remark)) {
        // 备注字段中有内容就直接返回
        return
      }
      let startPosition = resume.indexOf('自我评价')
      if (startPosition == -1) {
        return
      }
      // 获取“自我评价”之后的部分，赋给备注
      this.form.remark = resume.substr(startPosition)
    },
    // 整理简历
    formatResume() {
      if (this.resume === null || this.resume.length === 0) {
        return
      }
      // 把回车换成空格，整理成1行
      let resume = this.resume.replace(/\r?\n/g, ' ')
      // 拆分成数组
      let resumeList = []
      while (true) {
        let index = resume.lastIndexOf('公司')
        if (index === -1) {
          // 没找到关键字，直接把整个字符串放入数组中
          resumeList.push(resume)
          break
        } else {
          while (true) {
            if (resume[index] === ' ') {
              // 将一段工作经历放到数组中
              resumeList.push(resume.substr(index + 1))
              // 将剩余部分赋值给原来的字符串中
              resume = resume.substr(0, index)
              break
            } else if (index === 0) {
              resumeList.push(resume)
              resume = ''
              break
            }
            index--
          }
        }
      }
      // 重新拼接简历名称
      this.resume = ''
      while (resumeList.length > 0) {
        if (this.resume.length > 0) {
          this.resume += '\r\n'
        }
        this.resume += resumeList.pop()
      }
      // 出掉多余的空格
      while (this.resume.indexOf('  ') > -1) {
        this.resume = this.resume.replaceAll('  ', ' ')
      }
    }
  },
  computed: {},
  created() {
    // 获取当前用户的角色列表
    userApi.findSelf().then(res => {
      if (res.status === 200) {
        this.roles = res.data.roles
        this.jobType = res.data.jobType
      }
    })
    // 获取所有标签名称
    this.findAllLabel()
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      // 获取候选人数据
      // 如果没有候选人对象，就获取候选人id然后从数据库中查询候选人对象
      if (typeof (this.$route.query.candidate) !== 'undefined') {
        this.form = this.$route.query.candidate
        this.queryOthers()
      } else if (typeof (this.$route.query.candidateId) !== 'undefined') {
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
      }
    }
  }
}
