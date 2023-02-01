import axios from 'axios'

export default {
  // 生成工资
  generateSalary (params) {
    return axios.post('/salary/generateSalary', params)
  },
  // 通过主键查找工资信息
  findById (params) {
    return axios.get('/salary/findById', {
      params: params
    })
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/salary/queryPage', {
      params: params
    })
  },
  // 下载薪资
  downloadSalary (params) {
    let urls = 'http://www.helloapplicant.com/salary/downloadSalary?currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize']
    if (typeof (params['loginName']) !== 'undefined') {
      urls = urls + '&loginName=' + params['loginName']
    }
    if (typeof (params['userName']) !== 'undefined') {
      urls = urls + '&userName=' + params['userName']
    }
    if (typeof (params['month']) !== 'undefined') {
      urls = urls + '&month=' + params['month']
    }
    if (typeof (params['pretaxIncome']) !== 'undefined') {
      urls = urls + '&pretaxIncome=' + params['pretaxIncome']
    }
    if (typeof (params['netPay']) !== 'undefined') {
      urls = urls + '&netPay=' + params['netPay']
    }
    window.open(urls, '_blank')
  },
  // 更新
  update (params) {
    return axios.post('/salary/update', params)
  },
  // 获取薪资统计信息
  getSalaryStatisticsInfo (params) {
    return axios.get('/salary/getSalaryStatisticsInfo', {
      params: params
    })
  },
  // 删除
  deleteById (params) {
    return axios.get('/salary/deleteById?id=' + params)
  }
}
