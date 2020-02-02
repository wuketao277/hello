import axios from 'axios'

export default {
  // 保存 候选人与职位关联 信息
  save (params) {
    return axios.post('/candidateForCase/save', params)
  },
  // 更新状态
  updateStatus (params) {
    return axios.get('/candidateForCase/updateStatus', {
      params: params
    })
  },
  // 查找后台数据
  findByCaseId (params) {
    return axios.get('/candidateForCase/findByCaseId?caseId=' + params)
  }
}
