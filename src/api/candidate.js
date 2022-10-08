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
    return axios.get('/candidate/findById', {params: params})
  },
  // 通过主键查找候选人信息
  isExist (params) {
    return axios.get('/candidate/isExist?phoneNo=' + params)
  },
  // 通过候选人Id，获取简历信息
  findResumeByCandidateId (params) {
    return axios.get('/candidate/findResumeByCandidateId', {params: params})
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/candidate/deleteById?id=' + params)
  },
  // 查找后台数据
  queryCandidatePage (params) {
    return axios.get('/candidate/queryCandidatePage', {params: params})
  },
  // 查找后台数据
  queryCandidate (params) {
    return axios.get('/candidate/queryCandidate', {params: params})
  }
}
