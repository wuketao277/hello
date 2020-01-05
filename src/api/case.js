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
  // 通过id查询
  queryById (params) {
    return axios.get('/case/queryById', {params: params})
  }
}
