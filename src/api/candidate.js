import axios from 'axios'

export default {
  // 保存候选人接口
  save (params) {
    debugger
    return axios.post('/candidate/save', params)
  },
  // 通过主键查找候选人信息
  findById (params) {
    return axios.get('/candidate/findById?id=' + params)
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/candidate/deleteById?id=' + params)
  },
  // 查找后台数据
  queryCandidatePage (params) {
    return axios.get('/candidate/queryCandidatePage', {params: params})
  }
}
