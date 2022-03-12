import axios from 'axios'

export default {
  // 保存 候选人与职位关联 信息
  save (params) {
    return axios.post('/candidateForCase/save', params)
  },
  // 简单保存 候选人与职位关联 信息
  saveSimple (params) {
    return axios.post('/candidateForCase/saveSimple', params)
  },
  // 从旧职位上拷贝候选人到当前职位
  copyFromOldCase (params) {
    return axios.post('/candidateForCase/copyFromOldCase', params)
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
  },
  // 查找后台数据
  findByCandidateId (params) {
    return axios.get('/candidateForCase/findByCandidateId', {
      params: params
    })
  },
  // 通过id删除
  deleteById (params) {
    return axios.get('/candidateForCase/deleteById?id=' + params)
  },
  // 更新关注
  updateAttention (params) {
    return axios.post('/candidateForCase/updateAttention', params)
  }
}
