import axios from 'axios'

export default {
  // 保存接口
  save (params) {
    return axios.post('/bigEvent/save', params)
  },
  // 通过id查询
  findById (params) {
    return axios.get('/bigEvent/findById=' + params)
  },
  // 分页查询
  query (params) {
    return axios.get('/bigEvent/query?search=' + params['search'] + '&currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize'])
  }
}
