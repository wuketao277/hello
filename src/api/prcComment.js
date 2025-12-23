import axios from 'axios'

export default {
  // 保存评论接口
  save (params) {
    return axios.post('/prcComment/save', params)
  },
  deleteById (id) {
    return axios.get('/prcComment/deleteById?id=' + id)
  },
  // 查找后台数据
  findAllByPRCIdOrderByDesc (params) {
    return axios.get('/prcComment/findAllByPRCIdOrderByDesc', {
      params: params
    })
  },
}
