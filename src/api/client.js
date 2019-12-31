import axios from 'axios'

export default {
  // 保存客户接口
  save (params) {
    return axios.post('/client/save', params)
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/client/deleteById?id=' + params)
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/client/queryPage', {params: params})
  }
}
