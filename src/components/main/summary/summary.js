import myTaskApi from '@/api/myTask'
import myNewsApi from '@/api/mynews'
import commentApi from '@/api/comment'
// import candidateApi from '@/api/candidate'

export default {
  data () {
    return {
      calendarValue: new Date(),
      myTasks: [],
      myNewsList: [],
      KPIDate: '',
      KPIDashboard: []
    }
  },
  methods: {
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
  }
}
