import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/invoice/save', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/invoice/findById', { params: params })
  },
  // 查找后台数据
  queryPage (params) {
    return axios.post('/invoice/queryPage', params)
  },
  // 查找后台数据
  query (params) {
    return axios.get('/invoice/query', { params: params })
  },
  // 通过主键删除
  deleteById (params) {
    return axios.get('/invoice/deleteById?id=' + params)
  },
  // 获取未付款金额
  getNoPaymentSum (params) {
    return axios.get('/invoice/getNoPaymentSum')
  }
}
