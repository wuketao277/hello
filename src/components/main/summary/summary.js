import myTaskApi from '@/api/myTask'
import myNewsApi from '@/api/mynews'
import commentApi from '@/api/comment'
import caseApi from '@/api/case'
import commonJs from '@/common/common'

export default {
  data () {
    return {
      calendarValue: new Date(),
      myTasks: [],
      myNewsList: [],
      KPIDate: '',
      KPIDashboard: [],
      commentsDetailTableVisible: false,
      commentsDetailTable: [],
      activeNames: ['1'],
      caseAttention4ClientVOArray: [],
      cwCaseArray: [],
      newsCurrentRow: null,
      backgroundImage: require('../../../assets/background-6.jpg')
    }
  },
  methods: {
    // 显示控制
    showControl (url) {
      if (url === '/') {
        // 主页内容显示给非外包人员
        return !commonJs.isConsultantJobType()
      }
      if (url === '/focus' || url === '/cw' || url === '/news' || url === '/task' || url === '/kpi') {
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
      if (this.KPIDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      let request = {
        'beginDate': this.KPIDate[0],
        'endDate': this.KPIDate[1],
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
      if (this.KPIDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      commentApi.downloadKPI(this.KPIDate)
    },
    // 计算KPI
    calcKPI () {
      if (this.KPIDate === '') {
        this.$message.error('请先选择要计算的日期')
        return
      }
      let request = {
        'dates': this.KPIDate
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
