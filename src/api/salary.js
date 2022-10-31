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
  // 下载薪资
  downloadSalary (params) {
    let urls = 'http://localhost:8080/salary/downloadSalary?currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize'] + '&search=' + params['search']
    window.open(urls, '_blank')
  },
  // 更新
  update (params) {
    return axios.post('/salary/update', params)
  },
  // 获取薪资统计信息
  getSalaryStatisticsInfo (params) {
    return axios.get('/salary/getSalaryStatisticsInfo')
  }
}
