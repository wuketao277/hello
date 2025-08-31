import myTaskApi from '@/api/myTask'
import myNewsApi from '@/api/mynews'
import commentApi from '@/api/comment'
import caseApi from '@/api/case'
import commonJs from '@/common/common'
import candidateApi from '@/api/candidate'
import userApi from '@/api/user'
import summaryApi from '@/api/summary'
import successfulPermApi from '@/api/successfulPerm'

export default {
  data () {
    return {
      pipelineCaseShowControlFlag: true, // pipeline中空职位的显示控制
      calendarValue: new Date(),
      myTasks: [],
      myNewsList: [],
      interviewPlan: [], // 面试安排列表
      startDate: commonJs.getStorageContent('summary.kpiStartDate', commonJs.getYYYY_MM_dd(new Date())),
      endDate: commonJs.getStorageContent('summary.kpiEndDate', commonJs.getYYYY_MM_dd(new Date())),
      KPIDashboard: [],
      commentsDetailTableVisible: false,
      commentsDetailTable: [],
      commentsDetailTableBackup: [], // 备份数据
      activeNames: ['1'],
      caseAttention4ClientVOArray: [],
      cwCaseArray: [],
      newsCurrentRow: null,
      candidateAttentionList: [],
      tabName: commonJs.getStorageContent('summary.tabName', 'interviewPlanTab'), // 首页当前页签
      tabIndex: commonJs.getStorageContent('summary.tabIndex', '0'), // 首页当前页签
      attentionCaseShowCandidate: this.getAttentionCaseShowCandidate(), // 关注职位页面是否显示候选人信息
      cwCaseShowCandidate: this.getCWCaseShowCandidate(), // 对接职位页面是否显示候选人信息
      selectUsers: [], // 任务执行人集合
      sortSelectUsers: [], // 排序后的执行人
      kpiOrderType: 'phase', // kpi排序类型，默认按阶段排序
      users: [],
      drawusers: [], // 抽签功能使用的用户集合
      phaseList: ['TI', 'VI', 'IOI', 'CVO', '1st Interview', '2nd Interview', '3rd Interview', '4th Interview', '5th Interview', 'Final Interview', 'Offer Signed', 'On Board'], // 评论阶段列表
      selectedPhases: ['TI', 'VI', 'IOI', 'CVO', '1st Interview', '2nd Interview', '3rd Interview', '4th Interview', '5th Interview', 'Final Interview', 'Offer Signed', 'On Board'], // 选择的阶段
      pipelineList: [],
      pipelineShowControlList: [],
      todoTaskDialog: false,
      isChouqianAll: true,
      isChouqianCheckAll: false,
      kpiOnlyShowCheck: false, // kpi只展示考核kpi用户的数据
      candidateDetailTableVisible: false, // 候选人详情列表展示控制
      candidateDetailTable: [], // 候选人详情列表
      saveKPIMonth: null, // KPI保存月
      todayOnboardList: [], // 当如入职情况列表
      onlyShowMyselfCandidate: this.getOnlyShowMyselfCandidate() // 关注候选人列表，只显示自己的候选人
    }
  },
  methods: {
    // 只显示自己的候选人复选框变更事件
    onlyShowMyselfCandidateChange (val) {
      commonJs.setStorageContent('summary.onlyShowMyselfCandidate', val)
      this.onlyShowMyselfCandidate = val
      this.queryAllCaseAttention()
    },
    // 当日入职列表显示控制
    showTodayOnboardTable () {
      let v = this.todayOnboardList.length > 0
      return v
    },
    // 展开全部pipeline
    openAllPipeline () {
      for (let i = 0; i < this.pipelineList.length; i++) {
        // 遍历pipeline中所有的用户添加到pipeline的显示控制数组中
        let name = this.pipelineList[i].user.username
        if (this.pipelineShowControlList.indexOf(name, 0) === -1) {
          // 不存在才添加
          this.pipelineShowControlList.push(name)
        }
      }
    },
    // 折叠全部pipeline
    closeAllPipeline () {
      // 清空pipeline的显示控制数组中所有数据
      this.pipelineShowControlList = []
    },
    // 展开pipeline
    openPipeline (val) {
      this.pipelineShowControlList.push(val)
    },
    // 关闭pipeline
    closePipeline (val) {
      this.pipelineShowControlList = this.pipelineShowControlList.filter(item => item !== val)
    },
    // pipeline显示控制
    showPipeline (val) {
      return this.pipelineShowControlList.indexOf(val, 0) > -1
    },
    // 查询pipeline
    queryPipeline (val) {
      window.localStorage['summary.pipelineRange'] = val
      let params = {
        'range': val
      }
      summaryApi.queryPipeline(params).then(res => {
        if (res.status === 200) {
          this.pipelineList = res.data
          this.openAllPipeline()
          this.$message({
            message: '查询完成！',
            type: 'success',
            showClose: true,
            duration: 800
          })
        }
      })
    },
    // 设置行样式for面试计划
    setRowClassNameForInterviewPlan ({
      row,
      index
    }) {
      if (row.distanceDays === 0) {
        return 'rowDistanceDay0'
      }
    },
    // 编辑职位
    editCase (index, row) {
      this.$router.push({
        path: '/background.html/case/case',
        query: {
          mode: 'modify',
          caseId: row.caseId
        }
      })
    },
    // 编辑客户
    editClient (index, row) {
      this.$router.push({
        path: '/background.html/client/client',
        query: {
          mode: 'modify',
          clientId: row.clientId
        }
      })
    },
    // 查询当日入职情况
    queryTodayOnboardList (val) {
      successfulPermApi.todayOnboardList().then(res => {
        if (res.status === 200) {
          this.todayOnboardList = res.data
          this.$message({
            message: '查询完成！',
            type: 'success',
            showClose: true,
            duration: 800
          })
        }
      })
    },
    // 查询interviewPlan的数据
    queryInterviewPlan (val) {
      window.localStorage['summary.interviewPlanRange'] = val
      let params = {
        'range': val
      }
      commentApi.queryInterviewPlan(params).then(res => {
        if (res.status === 200) {
          this.interviewPlan = res.data
          this.$message({
            message: '查询完成！',
            type: 'success',
            showClose: true,
            duration: 800
          })
        }
      })
    },
    // 跳转到候选人
    jumpToCandidate (row) {
      this.$router.push({
        path: '/background.html/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    // 跳转到候选人
    jumpToCandidateById (id) {
      this.$router.push({
        path: '/background.html/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: id
        }
      })
    },
    // 切换候选人信息显示状态
    switchCWCaseShowCandidate (v) {
      window.localStorage['summary.cwCaseShowCandidate'] = v
      this.cwCaseShowCandidate = v
    },
    // 切换候选人信息显示状态
    switchAttentionCaseShowCandidate (v) {
      window.localStorage['summary.attentionCaseShowCandidate'] = v
      this.attentionCaseShowCandidate = v
    },
    // 查询关注职位列表中候选人显示状态
    getAttentionCaseShowCandidate () {
      if (typeof (window.localStorage['summary.attentionCaseShowCandidate']) === 'undefined') {
        return true
      } else {
        return window.localStorage['summary.attentionCaseShowCandidate'] === 'true'
      }
    },
    // 查询对接职位中候选人显示状态
    getCWCaseShowCandidate () {
      if (typeof (window.localStorage['summary.cwCaseShowCandidate']) === 'undefined') {
        return true
      } else {
        return window.localStorage['summary.cwCaseShowCandidate'] === 'true'
      }
    },
    // 查询只显示自己候选人复选框的状态
    getOnlyShowMyselfCandidate () {
      if (typeof (window.localStorage['summary.onlyShowMyselfCandidate']) === 'undefined') {
        return false
      } else {
        return window.localStorage['summary.onlyShowMyselfCandidate'] === 'true'
      }
    },
    // 页签点击
    tabClick (tab) {
      // 将新页签索引号保存起来
      window.localStorage['summary.tabIndex'] = tab.index
      window.localStorage['summary.tabName'] = tab.name
      this.initTab(tab.name)
    },
    // 初始化tab
    initTab (name) {
      if (name === 'pipelineTab') {
        // 查询pipeline情况
        this.queryPipeline(commonJs.getStorageContent('summary.pipelineRange', 'myself'))
      } else if (name === 'interviewPlanTab') {
        // 查询interviewPlan的数据
        this.queryInterviewPlan(commonJs.getStorageContent('summary.interviewPlanRange', 'all'))
        // 查询当日入职数据
        this.queryTodayOnboardList()
      } else if (name === 'attentionCaseTab') {
        // 查询当前用户所有职位关注
        this.queryAllCaseAttention()
      } else if (name === 'cwCaseTab') {
        // 查询当前用户所有对接的职位
        this.queryCWCaseArray()
      } else if (name === 'attentionCandidateTab') {
        // 查询关注候选人列表
        candidateApi.queryCandidateAttentionListByUser().then(res => {
          if (res.status === 200) {
            this.candidateAttentionList = res.data
            this.$message({
              message: '查询完成！',
              type: 'success',
              showClose: true,
              duration: 800
            })
          }
        })
      } else if (name === 'myNewsTab') {
        // 获取新闻
        myNewsApi.findTop100().then(res => {
          if (res.status === 200) {
            this.myNewsList = res.data
            this.$message({
              message: '查询完成！',
              type: 'success',
              showClose: true,
              duration: 800
            })
          }
        })
      } else if (name === 'myTasksTab') {
        // 获取今日任务
        myTaskApi.queryTodayTaskForMe().then(res => {
          if (res.status === 200) {
            this.myTasks = res.data
            this.$message({
              message: '查询完成！',
              type: 'success',
              showClose: true,
              duration: 800
            })
          }
        })
      } else if (name === 'kpiTab') {
        // kpi初始化
        this.calcKPI()
      }
    },
    // 查看候选人信息
    detailCandidate (candidateId) {
      this.$router.push({
        path: '/background.html/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: candidateId
        }
      })
    },
    // 设置范围
    kpiScopeChange (val) {
      commonJs.setStorageContent('summary.kpiScope', val)
      // 计算kpi
      this.calcKPI()
    },
    // 计算开始日期和结束日期
    calcDate (type) {
      if (type === 'today') {
        this.startDate = commonJs.getYYYY_MM_dd(new Date())
        this.endDate = commonJs.getYYYY_MM_dd(new Date())
      } else if (type === 'week') {
        let now = new Date()
        if (now.getDay() === 0) {
          this.startDate = commonJs.getYYYY_MM_dd(new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000))
        } else {
          this.startDate = commonJs.getYYYY_MM_dd(new Date(now.getTime() - (now.getDay() - 1) * 24 * 60 * 60 * 1000))
        }
        this.endDate = commonJs.getYYYY_MM_dd(new Date(Date.parse(this.startDate) + 6 * 24 * 60 * 60 * 1000))
      } else if (type === 'month') {
        let month = new Date().getMonth() + 1
        month = month < 10 ? '0' + month : month
        this.startDate = new Date().getFullYear() + '-' + month + '-01'
        if (month === '02') {
          // 2 月
          debugger
          if ((new Date().getFullYear()) % 4 === 0) {
            // 闰年
            this.endDate = new Date().getFullYear() + '-' + month + '-29'
          } else {
            // 非闰年
            this.endDate = new Date().getFullYear() + '-' + month + '-28'
          }
        } else if (month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
          // 1 3 5 7 8 10 12月
          this.endDate = new Date().getFullYear() + '-' + month + '-31'
        } else {
          // 4 6 9 11月
          this.endDate = new Date().getFullYear() + '-' + month + '-30'
        }
      } else if (type === 'preMonth') {
        let month = new Date().getMonth()
        let year = new Date().getFullYear()
        if (month === 0) {
          month = 12
          year = year - 1
        }
        this.startDate = new Date(Date.parse(year + '-' + month + '-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        if (month === 2) {
          // 2 月
          debugger
          if ((new Date().getFullYear()) % 4 === 0) {
            // 闰年
            this.endDate = new Date().getFullYear() + '-' + month + '-29'
          } else {
            // 非闰年
            this.endDate = new Date().getFullYear() + '-' + month + '-28'
          }
        } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          // 1 3 5 7 8 10 12月
          this.endDate = new Date(Date.parse(year + '-' + month + '-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else {
          // 4 6 9 11月
          this.endDate = new Date(Date.parse(year + '-' + month + '-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        }
      } else if (type === 'monthToNow') {
        let month = new Date().getMonth() + 1
        month = month < 10 ? '0' + month : month
        this.startDate = new Date().getFullYear() + '-' + month + '-01'
        this.endDate = commonJs.getYYYY_MM_dd(new Date())
      } else if (type === 'season') {
        let month = new Date().getMonth() + 1
        if (month === 1 || month === 2 || month === 3) {
          this.startDate = new Date().getFullYear() + '-01-01'
          this.endDate = new Date().getFullYear() + '-03-31'
        } else if (month === 4 || month === 5 || month === 6) {
          this.startDate = new Date().getFullYear() + '-04-01'
          this.endDate = new Date().getFullYear() + '-06-30'
        } else if (month === 7 || month === 8 || month === 9) {
          this.startDate = new Date().getFullYear() + '-07-01'
          this.endDate = new Date().getFullYear() + '-09-30'
        } else if (month === 10 || month === 11 || month === 12) {
          this.startDate = new Date().getFullYear() + '-10-01'
          this.endDate = new Date().getFullYear() + '-12-31'
        }
      } else if (type === 'year') {
        this.startDate = new Date().getFullYear() + '-01-01'
        this.endDate = new Date().getFullYear() + '-12-31'
      } else if (type === 'tonow') {
        this.startDate = new Date().getFullYear() + '-01-01'
        this.endDate = commonJs.getYYYY_MM_dd(new Date())
      }
      // 计算kpi
      this.calcKPI()
    },
    // 显示控制
    showControl (url) {
      if (url === '/') {
        // 外包、体验显示背景图片
        return !(commonJs.isConsultantJobType() || commonJs.isExperienceJobType())
      }
      if (url === 'Pipeline' || url === '/candidateAttention' || url === '/cw' || url === '/news' || url === '/task' || url === '/kpi' || url === 'drawLots') {
        // 这些页面只显示给全职用户
        return commonJs.isFulltimeJobType()
      }
      if (url === 'saveKPIDate' || url === 'saveKPIButton') {
        // 保存KPI的日期和按钮只有管理员能看到
        return commonJs.isAdmin()
      }
      if (url === '/queryAllUserCaseAttention') {
        // 查询所有关注职位按钮，只有管理员能看到
        return commonJs.isAdmin()
      }
      return false
    },
    // 保存KPI
    saveKPI () {
      if (this.saveKPIMonth !== null) {
        let params = {
          month: this.saveKPIMonth
        }
        commentApi.saveKPI(params).then(res => {
          if (res.status === 200) {
            // 保存成功
            this.$message({
              message: '保存成功！',
              type: 'success',
              showClose: true,
              duration: 800
            })
          } else {
            this.$message({
              message: '查询异常，请联系管理员！',
              type: 'warning',
              showClose: true
            })
          }
        })
      }
    },
    rowChange () { },
    // 跳转到客户
    toClient (id) {
      // 只有全职的同事可以跳转到客户列表
      this.$router.push({
        path: '/background.html/client/client',
        query: {
          mode: 'modify',
          clientId: id
        }
      })
    },
    // 跳转到职位
    toCase (id) {
      this.$router.push({
        path: '/background.html/case/case',
        query: {
          mode: 'modify',
          caseId: id
        }
      })
    },
    // 跳转到候选人
    toCandidate (row) {
      this.$router.push({
        path: '/background.html/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    // 编辑候选人
    editCandidate (index, candidateId) {
      this.$router.push({
        path: '/background.html/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: candidateId
        }
      })
    },
    // 查看用户
    detailUser (userName) {
      this.$router.push({
        path: '/background.html/user/user',
        query: {
          mode: 'modify',
          userName: userName
        }
      })
    },
    // kpi详情展示
    kpiDetail (index, row) {
      if (this.startDate === null || this.endDate === null || this.startDate === '' || this.endDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      let request = {
        'beginDate': this.startDate,
        'endDate': this.endDate,
        'userName': row['userName']
      }
      commentApi.findCommentsByTimeAndUsername(request).then(res => {
        if (res.status === 200) {
          // 评论详情
          this.commentsDetailTableVisible = true
          this.commentsDetailTable = res.data
          this.commentsDetailTableBackup = this.commentsDetailTable
          this.filerAndSortKpi()
        } else {
          this.$message({
            message: '查询异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 候选人详情展示
    candidateDetail (index, row) {
      let request = {
        'startDate': this.startDate,
        'endDate': this.endDate,
        'createUser': row['userName']
      }
      candidateApi.queryByCreateTimeAndCreateUser(request).then(res => {
        if (res.status === 200) {
          // 候选人详情
          this.candidateDetailTableVisible = true
          this.candidateDetailTable = res.data
        } else {
          this.$message({
            message: '查询异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    openView (path) {
      this.$router.push({
        path: path,
        query: {}
      })
    },
    // 下载KPI
    downloadKPI () {
      if (this.startDate === null || this.endDate === null || this.startDate === '' || this.endDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      commentApi.downloadKPI(this.startDate, this.endDate, commonJs.getStorageContent('summary.kpiScope', 'myself'), this.kpiOnlyShowCheck)
    },
    // 计算KPI
    calcKPI () {
      if (this.startDate === null || this.endDate === null || this.startDate === '' || this.endDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      let request = {
        'startDate': this.startDate,
        'endDate': this.endDate,
        'scope': commonJs.getStorageContent('summary.kpiScope', 'myself'),
        'kpiOnlyShowCheck': this.kpiOnlyShowCheck
      }
      commonJs.setStorageContent('summary.kpiStartDate', this.startDate)
      commonJs.setStorageContent('summary.kpiEndDate', this.endDate)
      commentApi.calcKPI(request).then(res => {
        if (res.status === 200) {
          // 重新查询全部评论
          this.KPIDashboard = res.data
          this.$message({
            message: '查询完成！',
            type: 'success',
            showClose: true,
            duration: 800
          })
        } else {
          this.$message({
            message: '查询异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 查看任务详情
    viewMyTaskDetail (task) {
      this.$router.push({
        path: '/background.html/mytask/mytask',
        query: {
          mode: 'modify',
          task: task
        }
      })
    },
    // 查询当前用户所有职位关注
    queryAllCaseAttention () {
      caseApi.queryAllCaseAttention(this.onlyShowMyselfCandidate).then(res => {
        if (res.status === 200) {
          this.caseAttention4ClientVOArray = res.data
        } else {
          this.$message({
            message: '查询异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 查询所有用户所有职位关注
    queryAllUserCaseAttention () {
      caseApi.queryAllUserCaseAttention().then(res => {
        if (res.status === 200) {
          this.caseAttention4ClientVOArray = res.data
        } else {
          this.$message({
            message: '查询异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 查询当前用户所有对接的职位
    queryCWCaseArray () {
      caseApi.queryAllCWCase().then(res => {
        if (res.status === 200) {
          this.cwCaseArray = res.data
        } else {
          this.$message({
            message: '查询异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 新闻列表行变化
    newsRowChange (val) {
      this.newsCurrentRow = val
    },
    // 查看新闻详情
    handleNewsDblClick () {
      this.$router.push({
        path: '/background.html/mynews/mynews',
        query: {
          mode: 'detail',
          news: this.newsCurrentRow
        }
      })
    },
    // 任务列表行变化
    taskRowChange (val) {
      this.taskCurrentRow = val
    },
    // 查看任务详情
    handleTaskDblClick () {
      this.$router.push({
        path: '/background.html/mytask/mytask',
        query: {
          mode: 'modify',
          task: this.taskCurrentRow
        }
      })
    },
    // 用户排序
    sortUsers () {
      this.selectUsers.sort(function () {
        return Math.random() - 0.5
      })
      this.sortSelectUsers = this.selectUsers
    },
    // 清空
    clearSelectUsers () {
      this.selectUsers = []
      this.sortSelectUsers = []
    },
    // 转换阶段名称为数字
    phaseConvertToInt (phase) {
      let result = 0
      if (phase === 'TI') {
        result = 1
      } else if (phase === 'VI') {
        result = 2
      } else if (phase === 'IOI') {
        result = 3
      } else if (phase === 'CVO') {
        result = 4
      } else if (phase === '1st Interview') {
        result = 5
      } else if (phase === '2nd Interview') {
        result = 6
      } else if (phase === '3rd Interview') {
        result = 7
      } else if (phase === '4th Interview') {
        result = 8
      } else if (phase === '5th Interview') {
        result = 9
      } else if (phase === 'Final Interview') {
        result = 10
      } else if (phase === 'Offer Signed') {
        result = 11
      } else if (phase === 'On Board') {
        result = 12
      }
      return result
    },
    // KPI选择全部阶段
    selectAllPhase () {
      this.selectedPhases = this.phaseList
      this.handlePhaseChange(this.selectedPhases)
    },
    // 清空选择的阶段
    clearPhaseSelected () {
      this.selectedPhases = []
      this.handlePhaseChange(this.selectedPhases)
    },
    // 筛选并排序KPI数据
    filerAndSortKpi () {
      // 筛选
      this.commentsDetailTable = []
      // 过滤选中的阶段
      for (let c of this.commentsDetailTableBackup) {
        if (this.selectedPhases.includes(c['phase'])) {
          this.commentsDetailTable.push(c)
        }
      }
      // 排序
      if (this.kpiOrderType === 'phase') {
        // 按阶段排序
        let that = this
        this.commentsDetailTable.sort(function (a, b) {
          let result = 0
          if (that.phaseConvertToInt(a['phase']) === that.phaseConvertToInt(b['phase'])) {
            // 阶段相同按姓名排序
            if (a['chineseName'] === b['chineseName']) {
              // 姓名相同按时间排序
              result = a['inputTime'] >= b['inputTime'] ? 1 : -1
            } else if (a['chineseName'] > b['chineseName']) {
              result = 1
            } else if (a['chineseName'] < b['chineseName']) {
              result = -1
            }
          } else if (that.phaseConvertToInt(a['phase']) > that.phaseConvertToInt(b['phase'])) {
            result = -1
          } else if (that.phaseConvertToInt(a['phase']) < that.phaseConvertToInt(b['phase'])) {
            result = 1
          }
          return result
        })
      } else if (this.kpiOrderType === 'candidate') {
        // 姓名排序
        this.commentsDetailTable.sort(function (a, b) {
          let result = 0
          if (a['candidateName'] === b['candidateName']) {
            // 姓名相同按时间排序
            result = a['inputTime'] >= b['inputTime'] ? 1 : -1
          } else if (a['candidateName'] > b['candidateName']) {
            result = 1
          } else if (a['candidateName'] < b['candidateName']) {
            result = -1
          }
          return result
        })
      }
    },
    // 处理阶段变更
    handlePhaseChange (value) {
      this.selectedPhases = value
      this.filerAndSortKpi()
    },
    // 排序评论
    orderComment (type) {
      this.kpiOrderType = type
      this.filerAndSortKpi()
    },
    // 抽签全选
    handleChouqianCheckAllChange (val) {
      if (val) {
        for (let u of this.drawusers) {
          this.selectUsers.push(u)
        }
      } else {
        this.selectUsers = []
      }
      this.isChouqianAll = false
    },
    // 时间格式化
    formatTime (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined' && cellvalue !== null && cellvalue !== '') {
        return cellvalue.substr(0, 19).replace('T', ' ')
      }
      return ''
    }
  },
  created () {
    // 获取所有正常状态的全职员工
    userApi.findAllEnabledFullTime().then(res => {
      if (res.status === 200) {
        this.users = res.data
      }
    })
    // 获取所有正常状态的全职员工和实习生
    userApi.findAllEnabledFullTimeAndIntern().then(res => {
      if (res.status === 200) {
        // 针对Victor和Mike的特殊处理
        for (let u of res.data) {
          if (u.username !== 'Mike') {
            this.drawusers.push(u)
          }
        }
      }
    })
    // kpi初始化开始日期和结束日期
    this.startDate = commonJs.getStorageContent('summary.kpiStartDate', commonJs.getYYYY_MM_dd(new Date()))
    this.endDate = commonJs.getStorageContent('summary.kpiEndDate', commonJs.getYYYY_MM_dd(new Date()))
    // 初始化当前tab
    this.initTab(this.tabName)
    // 获取今日任务，如果有未完成任务就弹出对话框
    myTaskApi.queryTodayTaskForMe().then(res => {
      if (res.status === 200) {
        this.myTasks = res.data
        if (this.myTasks.length > 0) {
          this.todoTaskDialog = true
        }
      }
    })
  }
}
