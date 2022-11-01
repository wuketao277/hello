import myTaskApi from '@/api/myTask'
import myNewsApi from '@/api/mynews'
import commentApi from '@/api/comment'
import caseApi from '@/api/case'
import commonJs from '@/common/common'
import candidateApi from '@/api/candidate'

export default {
  data () {
    return {
      calendarValue: new Date(),
      myTasks: [],
      myNewsList: [],
      startDate: null,
      endDate: null,
      KPIDashboard: [],
      commentsDetailTableVisible: false,
      commentsDetailTable: [],
      activeNames: ['1'],
      caseAttention4ClientVOArray: [],
      cwCaseArray: [],
      newsCurrentRow: null,
      candidateAttentionList: [],
      tabIndex: this.getTabIndex(), // 首页当前页签
      attentionCaseShowCandidate: this.getAttentionCaseShowCandidate(), // 关注职位页面是否显示候选人信息
      cwCaseShowCandidate: this.getCWCaseShowCandidate() // 对接职位页面是否显示候选人信息
    }
  },
  methods: {
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
    // 获取页签选择
    getTabIndex () {
      if (typeof (window.localStorage['summary.tabIndex']) === 'undefined') {
        return '0'
      } else {
        return window.localStorage['summary.tabIndex']
      }
    },
    // 页签点击
    tabClick (tab) {
      // 将新页签索引号保存起来
      window.localStorage['summary.tabIndex'] = tab.index
    },
    // 查看候选人信息
    detailCandidate (candidateId) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: candidateId
        }
      })
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
        this.endDate = commonJs.getYYYY_MM_dd(new Date(this.startDate.getTime() + 6 * 24 * 60 * 60 * 1000))
      } else if (type === 'month') {
        let month = new Date().getMonth() + 1
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
    showControl (url) {
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
    rowChange () {},
    // 跳转到客户
    toClient (id) {
      this.$router.push({
        path: '/client/client',
        query: {
          mode: 'modify',
          clientId: id
        }
      })
    },
    // 跳转到职位
    toCase (id) {
      this.$router.push({
        path: '/case/case',
        query: {
          mode: 'modify',
          caseId: id
        }
      })
    },
    // 跳转到候选人
    toCandidate (row) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
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
      commentApi.downloadKPI(this.startDate, this.endDate)
    },
    // 计算KPI
    calcKPI () {
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
    viewMyTaskDetail (task) {
      // if (task.relativeCandidateId !== null) {
      //   // 如果关联候选人id不为空，就调用后台查询候选人信息，并跳转到候选人页面
      //   candidateApi.findById(task.relativeCandidateId).then(res => {
      //     if (res.status === 200) {
      //       this.$router.push({
      //         path: '/candidate/candidate',
      //         query: {
      //           mode: 'modify',
      //           candidate: res.data
      //         }
      //       })
      //     }
      //   })
      // } else {
      // 否则就跳转到任务详情页
      this.$router.push({
        path: '/mytask/mytask',
        query: {
          mode: 'modify',
          task: task
        }
      })
      // }
    },
    // 查询当前用户所有职位关注
    queryAllCaseAttention () {
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
        path: '/mynews/mynews',
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
        path: '/mytask/mytask',
        query: {
          mode: 'detail',
          task: this.taskCurrentRow
        }
      })
    }
  },
  created () {
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
  }
}
