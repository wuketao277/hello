import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/costInvoice/save', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/costInvoice/findById', { params: params })
  },
  // 查找后台数据
  queryPage (params) {
    return axios.post('/costInvoice/queryPage', params)
  },
  // 查找后台数据
  query (params) {
    return axios.get('/costInvoice/query', { params: params })
  },
  // 通过主键删除
  deleteById (params) {
    return axios.get('/costInvoice/deleteById?id=' + params)
  }
}
