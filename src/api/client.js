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
  },
  // 通过id查询
  queryById (params) {
    return axios.get('/client/queryById?id=' + params)
  },
  // 查找所有
  findAll () {
    return axios.get('/client/findAll')
  }
}
