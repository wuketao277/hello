import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/successfulPerm/save', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/successfulPerm/findById', {params: params})
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/successfulPerm/queryPage', {params: params})
  },
  // 查找后台数据
  query (params) {
    return axios.get('/successfulPerm/query', {params: params})
  }
}
