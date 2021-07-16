import axios from 'axios'

export default {
  // 保存评论接口
  save (params) {
    return axios.post('/comment/save', params)
  },
  // 查找后台数据
  findAllByCandidateId (params) {
    return axios.get('/comment/findAllByCandidateId', {params: params})
  },
  // 计算KPI
  calcKPI (params) {
    return axios.post('/comment/calcKPI', params)
  },
  // 通过开始时间、结束时间、录入人 查找评论
  findCommentsByTimeAndUsername (params) {
    return axios.get('/comment/findCommentsByTimeAndUsername', {params: params})
  }
}
