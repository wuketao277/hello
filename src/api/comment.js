import axios from 'axios'

export default {
  // 保存评论接口
  save (params) {
    return axios.post('/comment/save', params)
  },
  deleteById (id) {
    return axios.get('/comment/deleteById?id=' + id)
  },
  // 查找后台数据
  findAllByCandidateIdOrderByDesc (params) {
    return axios.get('/comment/findAllByCandidateIdOrderByDesc', {
      params: params
    })
  },
  // 计算KPI
  calcKPI (params) {
    return axios.post('/comment/calcKPI', params)
  },
  // 下载KPI
  downloadKPI (startDate, endDate, scope, kpiOnlyShowCheck) {
    let urls = 'http://www.helloapplicant.com/comment/downloadKPI?startDate=' + startDate + '&endDate=' + endDate + '&scope=' + scope + '&kpiOnlyShowCheck=' + kpiOnlyShowCheck
    window.open(urls, '_blank')
  },
  // 通过开始时间、结束时间、录入人 查找评论
  findCommentsByTimeAndUsername (params) {
    return axios.get('/comment/findCommentsByTimeAndUsername', {
      params: params
    })
  },
  // 通过评论查找候选人
  queryCandidateByCommentLimit100 (params) {
    return axios.get('/comment/queryCandidateByCommentLimit100', {
      params: params
    })
  },
  // 面试安排列表
  queryInterviewPlan (params) {
    return axios.get('/comment/queryInterviewPlan?range=' + params['range'])
  },
  // 查询面试安排分页
  queryInterviewPage (params) {
    return axios.post('/comment/queryInterviewPage', params)
  },
  // 保存KPI
  saveKPI (params) {
    return axios.post('/comment/saveKPI', params)
  },
  // 下载所有面试
  downloadInterviews (params) {
    let urls = 'http://www.helloapplicant.com/comment/downloadInterviews?loginName=' + params['loginName'] + '&clientName=' + params['clientName'] + '&title=' + params['title'] + '&startDate=' + params['startDate'] + '&endDate=' + params['endDate'] + '&phase=' + params['phase'] + '&currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize']
    window.open(urls, '_blank')
  }
}
