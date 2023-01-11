import myTaskApi from '@/api/myTask'
import myNewsApi from '@/api/mynews'
import commentApi from '@/api/comment'
import caseApi from '@/api/case'
import commonJs from '@/common/common'
import candidateApi from '@/api/candidate'
import userApi from '@/api/user'

export default {
  data() {
    return {
      calendarValue: new Date(),
      myTasks: [],
      myNewsList: [],
      startDate: null,
      endDate: null,
      KPIDashboard: [],
      commentsDetailTableVisible: false,
      commentsDetailTable: [],
      commentsDetailTableBackup: [], // 备份数据
      activeNames: ['1'],
      caseAttention4ClientVOArray: [],
      cwCaseArray: [],
      newsCurrentRow: null,
      candidateAttentionList: [],
      tabIndex: this.getTabIndex(), // 首页当前页签
      attentionCaseShowCandidate: this.getAttentionCaseShowCandidate(), // 关注职位页面是否显示候选人信息
      cwCaseShowCandidate: this.getCWCaseShowCandidate(), // 对接职位页面是否显示候选人信息
      selectUsers: [], // 任务执行人集合
      sortSelectUsers: [], // 排序后的执行人
      kpiOrderType: 'phase', // kpi排序类型，默认按阶段排序
      users: [],
      phaseList: ['TI', 'VI', 'IOI', 'CVO', '1st Interview', 'Offer Signed', 'On Board'], // 评论阶段列表
      selectedPhases: ['TI', 'VI', 'IOI', 'CVO', '1st Interview', 'Offer Signed', 'On Board'] // 选择的阶段
    }
  },
  methods: {
    // 跳转到候选人
    jumpToCandidate(row) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    // 切换候选人信息显示状态
    switchCWCaseShowCandidate(v) {
      window.localStorage['summary.cwCaseShowCandidate'] = v
      this.cwCaseShowCandidate = v
    },
    // 切换候选人信息显示状态
    switchAttentionCaseShowCandidate(v) {
      window.localStorage['summary.attentionCaseShowCandidate'] = v
      this.attentionCaseShowCandidate = v
    },
    // 查询关注职位列表中候选人显示状态
    getAttentionCaseShowCandidate() {
      if (typeof (window.localStorage['summary.attentionCaseShowCandidate']) === 'undefined') {
        return true
      } else {
        return window.localStorage['summary.attentionCaseShowCandidate'] === 'true'
      }
    },
    // 查询对接职位中候选人显示状态
    getCWCaseShowCandidate() {
      if (typeof (window.localStorage['summary.cwCaseShowCandidate']) === 'undefined') {
        return true
      } else {
        return window.localStorage['summary.cwCaseShowCandidate'] === 'true'
      }
    },
    // 获取页签选择
    getTabIndex() {
      if (typeof (window.localStorage['summary.tabIndex']) === 'undefined') {
        return '0'
      } else {
        return window.localStorage['summary.tabIndex']
      }
    },
    // 页签点击
    tabClick(tab) {
      // 将新页签索引号保存起来
      window.localStorage['summary.tabIndex'] = tab.index
    },
    // 查看候选人信息
    detailCandidate(candidateId) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: candidateId
        }
      })
    },
    // 计算开始日期和结束日期
    calcDate(type) {
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
        if (month === 2) {
          // 2 月
          this.endDate = new Date().getFullYear() + '-' + month + '-28'
        } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          // 1 3 5 7 8 10 12月
          this.endDate = new Date().getFullYear() + '-' + month + '-31'
        } else {
          // 4 6 9 11月
          this.endDate = new Date().getFullYear() + '-' + month + '-30'
        }
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
    showControl(url) {
      if (url === '/') {
        // 主页内容显示给非外包人员
        return !(commonJs.isConsultantJobType() || commonJs.isExperienceJobType())
      }
      if (url === '/candidateAttention' || url === '/focus' || url === '/cw' || url === '/news' || url === '/task' || url === '/kpi') {
        // 关注职位显示给非外包人员
        return !commonJs.isConsultantJobType()
      }
      return false
    },
    rowChange() {},
    // 跳转到客户
    toClient(id) {
      this.$router.push({
        path: '/client/client',
        query: {
          mode: 'modify',
          clientId: id
        }
      })
    },
    // 跳转到职位
    toCase(id) {
      this.$router.push({
        path: '/case/case',
        query: {
          mode: 'modify',
          caseId: id
        }
      })
    },
    // 跳转到候选人
    toCandidate(row) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    // 编辑候选人
    editCandidate(index, row) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    kpiDetail(index, row) {
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
    openView(path) {
      this.$router.push({
        path: path,
        query: {}
      })
    },
    // 下载KPI
    downloadKPI() {
      if (this.startDate === null || this.endDate === null || this.startDate === '' || this.endDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      commentApi.downloadKPI(this.startDate, this.endDate)
    },
    // 计算KPI
    calcKPI() {
      if (this.startDate === null || this.endDate === null || this.startDate === '' || this.endDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      let request = {
        'startDate': this.startDate,
        'endDate': this.endDate
      }
      commentApi.calcKPI(request).then(res => {
        if (res.status === 200) {
          // 重新查询全部评论
          this.KPIDashboard = res.data
        } else {
          this.$message({
            message: '保存异常，请联系管理员！',
            type: 'warning',
            showClose: true
          })
        }
      })
    },
    // 查看任务详情
    viewMyTaskDetail(task) {
      this.$router.push({
        path: '/mytask/mytask',
        query: {
          mode: 'modify',
          task: task
        }
      })
    },
    // 查询当前用户所有职位关注
    queryAllCaseAttention() {
      caseApi.queryAllCaseAttention().then(res => {
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
    queryCWCaseArray() {
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
    newsRowChange(val) {
      this.newsCurrentRow = val
    },
    // 查看新闻详情
    handleNewsDblClick() {
      this.$router.push({
        path: '/mynews/mynews',
        query: {
          mode: 'detail',
          news: this.newsCurrentRow
        }
      })
    },
    // 任务列表行变化
    taskRowChange(val) {
      this.taskCurrentRow = val
    },
    // 查看任务详情
    handleTaskDblClick() {
      this.$router.push({
        path: '/mytask/mytask',
        query: {
          mode: 'modify',
          task: this.taskCurrentRow
        }
      })
    },
    // 用户排序
    sortUsers() {
      this.selectUsers.sort(function () {
        return Math.random() - 0.5
      })
      this.sortSelectUsers = this.selectUsers
    },
    // 清空
    clearSelectUsers() {
      this.selectUsers = []
      this.sortSelectUsers = []
    },
    // 转换阶段名称为数字
    phaseConvertToInt(phase) {
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
      } else if (phase === 'Offer Signed') {
        result = 6
      } else if (phase === 'On Board') {
        result = 7
      }
      return result
    },
    // KPI选择全部阶段
    selectAllPhase() {
      this.selectedPhases = this.phaseList
      this.handlePhaseChange(this.selectedPhases)
    },
    // 清空选择的阶段
    clearPhaseSelected() {
      this.selectedPhases = []
      this.handlePhaseChange(this.selectedPhases)
    },
    // 筛选并排序KPI数据
    filerAndSortKpi() {
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
          if (a['chineseName'] === b['chineseName']) {
            // 姓名相同按时间排序
            result = a['inputTime'] >= b['inputTime'] ? 1 : -1
          } else if (a['chineseName'] > b['chineseName']) {
            result = 1
          } else if (a['chineseName'] < b['chineseName']) {
            result = -1
          }
          return result
        })
      }
    },
    // 处理阶段变更
    handlePhaseChange(value) {
      this.selectedPhases = value
      this.filerAndSortKpi()
    },
    // 排序评论
    orderComment(type) {
      this.kpiOrderType = type
      this.filerAndSortKpi()
    }
  },
  created() {
    // 查询关注候选人列表
    candidateApi.queryCandidateAttentionListByUser().then(res => {
      if (res.status === 200) {
        this.candidateAttentionList = res.data
      }
    })
    // 获取今日任务
    myTaskApi.queryTodayTaskForMe().then(res => {
      if (res.status === 200) {
        this.myTasks = res.data
      }
    })
    // 获取新闻
    myNewsApi.findTop100().then(res => {
      if (res.status === 200) {
        this.myNewsList = res.data
      }
    })
    // 查询当前用户所有职位关注
    this.queryAllCaseAttention()
    // 查询当前用户所有对接的职位
    this.queryCWCaseArray()
    userApi.findAllEnabled().then(res => {
      if (res.status === 200) {
        this.users = res.data
      }
    })
  }
}
