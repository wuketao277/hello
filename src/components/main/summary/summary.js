import myTaskApi from '@/api/myTask'
import myNewsApi from '@/api/mynews'
import candidateApi from '@/api/candidate'

export default {
  data () {
    return {
      calendarValue: new Date(),
      myTasks: [],
      myNewsList: []
    }
  },
  methods: {
    openView (path) {
      this.$router.push({
        path: path,
        query: {}
      })
    },
    // 查看任务详情
    viewMyTaskDetail (task) {
      if (task.relativeCandidateId !== null) {
        // 如果关联候选人id不为空，就调用后台查询候选人信息，并跳转到候选人页面
        candidateApi.findById(task.relativeCandidateId).then(res => {
          if (res.status === 200) {
            this.$router.push({
              path: '/candidate/candidate',
              query: {
                mode: 'modify',
                candidate: res.data
              }
            })
          }
        })
      } else {
        // 否则就跳转到任务详情页
        this.$router.push({
          path: '/mytask/mytask',
          query: {
            mode: 'modify',
            task: task
          }
        })
      }
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
