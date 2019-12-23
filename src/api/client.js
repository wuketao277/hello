import axios from 'axios'

export default {
  // 保存客户接口
  save (params) {
    debugger
    return axios.post('/client/save', params)
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/client/deleteById?id=' + params)
  },
  // 查找后台数据
  queryClientPage (params) {
    return axios.get('/client/queryClientPage', {params: params})
  }
}
