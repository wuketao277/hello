import axios from 'axios'
import commonJS from '@/common/common'

export default {
  // 保存评论接口
  save (params) {
    return axios.post('/comment/save', params)
  },
  // 查找后台数据
  findAllByCandidateId (params) {
    return axios.get('/comment/findAllByCandidateId', {
      params: params
    })
  },
  // 计算KPI
  calcKPI (params) {
    return axios.post('/comment/calcKPI', params)
  },
  // 下载KPI
  downloadKPI (params) {
    let urls = 'http://www.helloapplicant.com/comment/downloadKPI?startDate=' + commonJS.getYYYY_MM_dd(params[0]) + '&endDate=' + commonJS.getYYYY_MM_dd(params[1])
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
