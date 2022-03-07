import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/case/save', params)
  },
  // 删除
  deleteById (params) {
    return axios.get('/case/deleteById?id=' + params)
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/case/queryPage', {params: params})
  },
  // 查找后台数据
  query (params) {
    return axios.get('/case/query', {params: params})
  },
  // 通过id查询
  queryById (params) {
    return axios.get('/case/queryById', {params: params})
  },
  // 更新关注
  updateCaseAttention (params) {
    return axios.post('/case/updateCaseAttention', params)
  },
  // 查询关注信息
  queryCaseAttentionByCaseId (params) {
    return axios.get('/case/queryCaseAttentionByCaseId?caseId=' + params)
  },
  // 查询当前用户的所有关注信息
  queryAllCaseAttention () {
    return axios.get('/case/queryAllCaseAttention')
  }
}
