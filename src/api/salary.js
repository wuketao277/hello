import axios from 'axios'

export default {
  // 生成工资
  generateSalary (params) {
    return axios.post('/salary/generateSalary', params)
  },
  // 通过主键查找工资信息
  findById (params) {
    return axios.get('/salary/findById', {params: params})
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/salary/queryPage', {params: params})
  },
  // 更新
  update (params) {
    return axios.post('/salary/update', params)
  }
}
