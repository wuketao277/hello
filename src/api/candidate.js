import axios from 'axios'

export default {
  // 保存候选人接口
  save (params) {
    return axios.post('/candidate/save', params)
  },
  // 保存候选人简历接口
  saveResume (params) {
    return axios.post('/candidate/saveResume', params)
  },
  // 通过主键查找候选人信息
  findById (params) {
    return axios.get('/candidate/findById', {
      params: params
    })
  },
  // 通过主键查找候选人信息
  isExist (params) {
    return axios.get('/candidate/isExist?phoneNo=' + params)
  },
  // 通过候选人Id，获取简历信息
  findResumeByCandidateId (params) {
    return axios.get('/candidate/findResumeByCandidateId', {
      params: params
    })
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/candidate/deleteById?id=' + params)
  },
  // 查找后台数据
  queryCandidatePage (params) {
    return axios.get('/candidate/queryCandidatePage', {
      params: params
    })
  },
  // 查找后台数据
  queryCandidate (params) {
    return axios.get('/candidate/queryCandidate', {
      params: params
    })
  },
  // 更新关注信息
  updateCandidateAttention (params) {
    return axios.post('/candidate/updateCandidateAttention', params)
  },
  // 查询候选人关注情况
  queryCandidateAttentionByCandidateId (params) {
    return axios.get('/candidate/queryCandidateAttentionByCandidateId?candidateId=' + params)
  },
  // 查询当前用户关注的候选人
  queryCandidateAttentionListByUser () {
    return axios.get('/candidate/queryCandidateAttentionListByUser')
  },
  // 计算候选人年龄
  calcAge (params) {
    return axios.get('/candidate/calcAge?birthdayStr=' + params)
  },
  // 搜索候选人集合
  searchCandidateList (params) {
    return axios.post('/candidate/searchCandidateList', params)
  }
}
