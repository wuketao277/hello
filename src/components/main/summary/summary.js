import myTaskApi from '@/api/myTask'
import myNewsApi from '@/api/mynews'
import commentApi from '@/api/comment'
import caseApi from '@/api/case'

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
      caseAttention4ClientVOArray: []
    }
  },
  methods: {
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
    toCandidate (id) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: id
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
    // 查看新闻详情
    viewMyNewsDetail (myNews) {
      // 否则就跳转到任务详情页
      this.$router.push({
        path: '/mynews/mynews',
        query: {
          mode: 'detail',
          news: myNews
        }
      })
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
    myNewsApi.findTop10().then(res => {
      if (res.status === 200) {
        this.myNewsList = res.data
      }
    })
    // 查询当前用户所有职位关注
    this.queryAllCaseAttention()
  }
}
