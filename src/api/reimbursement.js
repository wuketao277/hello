import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/reimbursement/save', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/reimbursement/findById', {params: params})
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/reimbursement/queryPage', {params: params})
  },
  // 查找后台数据
  query (params) {
    return axios.get('/reimbursement/query', {params: params})
  },
  // 查找后台数据
  querySummaryPage (params) {
    return axios.get('/reimbursement/querySummaryPage', {params: params})
  },
  // 生成报销摘要
  generateReimbursementSummary () {
    return axios.post('/reimbursement/generateReimbursementSummary')
  },
  // 获取当前月总报销金额
  getCurrentMonthSumReimbursement () {
    return axios.get('/reimbursement/getCurrentMonthSumReimbursement')
  },
  // 通过主键删除
  deleteById (params) {
    return axios.delete('/reimbursement/deleteById?id=' + params)
  }
}
