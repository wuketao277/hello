import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/salarySpecialItem/save', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/salarySpecialItem/findById', {params: params})
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/salarySpecialItem/queryPage', {params: params})
  },
  // 查找后台数据
  query (params) {
    return axios.get('/salarySpecialItem/query', {params: params})
  },
  // 通过主键删除
  deleteById (params) {
    return axios.delete('/salarySpecialItem/deleteById?id=' + params)
  }
}
