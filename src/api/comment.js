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
  downloadKPI (startDate, endDate, scope) {
    let urls = 'http://www.helloapplicant.com/comment/downloadKPI?startDate=' + startDate + '&endDate=' + endDate + '&scope=' + scope
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
  }
}
