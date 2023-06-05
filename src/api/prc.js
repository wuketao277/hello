import axios from 'axios'

export default {
  // 保存PRC接口
  save (params) {
    return axios.post('/prc/save', params)
  },
  // 通过主键查找候选人信息
  findById (params) {
    return axios.get('/prc/findById', {
      params: params
    })
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/prc/deleteById?id=' + params)
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/prc/queryPage', {
      params: params
    })
  }
}
