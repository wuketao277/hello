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
  // 下载报销项详情
  downloadReimbursementItem (params) {
    let urls = 'http://www.helloapplicant.com/reimbursement/downloadReimbursementItem?currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize'] + '&search=' + params['search']
    window.open(urls, '_blank')
  },
  // 下载报销
  downloadReimbursementSummary (params) {
    let urls = 'http://www.helloapplicant.com/reimbursement/downloadReimbursementSummary?currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize'] + '&search=' + params['search']
    window.open(urls, '_blank')
  },
  // 查找后台统计
  queryStatistics (params) {
    return axios.get('/reimbursement/queryStatistics', {params: params})
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
  generateReimbursementSummary (params) {
    return axios.post('/reimbursement/generateReimbursementSummary', params)
  },
  // 获取当前月总报销金额
  getCurrentMonthSumReimbursement () {
    return axios.get('/reimbursement/getCurrentMonthSumReimbursement')
  },
  // 通过主键删除
  deleteById (params) {
    return axios.delete('/reimbursement/deleteById?id=' + params)
  },
  // 审批通过选中行
  approveSelection (params) {
    return axios.post('/reimbursement/approveSelection', params)
  }
}
