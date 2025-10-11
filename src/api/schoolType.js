import axios from 'axios'

export default {
  // 保存接口
  save (params) {
    return axios.post('/schoolType/save', params)
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/schoolType/queryPage', { params: params })
  },
  // 通过id查询
  queryById (params) {
    return axios.get('/schoolType/queryById?id=' + params)
  },
  // 检查是否为公立学校
  checkIsPublic (params) {
    return axios.get('/schoolType/checkIsPublic?schoolName=' + params)
  }
}
