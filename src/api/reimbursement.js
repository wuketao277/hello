import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/reimbursement/save', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/reimbursement/findById', {
      params: params
    })
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/reimbursement/queryPage', {
      params: params
    })
  },
  // 下载报销项详情
  downloadReimbursementItem (params) {
    let urls = 'http://www.helloapplicant.com/reimbursement/downloadReimbursementItem?currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize']
    if (typeof (params['userName']) !== 'undefined') {
      urls = urls + '&userName=' + params['userName']
    }

    if (typeof (params['approveStatus']) !== 'undefined') {
      urls = urls + '&approveStatus=' + params['approveStatus']
    }
    if (typeof (params['needPay']) !== 'undefined') {
      urls = urls + '&needPay=' + params['needPay']
    }
    if (typeof (params['date']) !== 'undefined') {
      urls = urls + '&date=' + params['date']
    }
    if (typeof (params['location']) !== 'undefined') {
      urls = urls + '&location=' + params['location']
    }
    if (typeof (params['company']) !== 'undefined') {
      urls = urls + '&company=' + params['company']
    }
    if (typeof (params['paymentMonth']) !== 'undefined') {
      urls = urls + '&paymentMonth=' + params['paymentMonth']
    }
    if (typeof (params['type']) !== 'undefined') {
      urls = urls + '&type=' + params['type']
    }
    if (typeof (params['kind']) !== 'undefined') {
      urls = urls + '&kind=' + params['kind']
    }
    if (typeof (params['invoiceNo']) !== 'undefined') {
      urls = urls + '&invoiceNo=' + params['invoiceNo']
    }
    if (typeof (params['sum']) !== 'undefined') {
      urls = urls + '&sum=' + params['sum']
    }
    if (typeof (params['description']) !== 'undefined') {
      urls = urls + '&description=' + params['description']
    }
    window.open(urls, '_blank')
  },
  // 下载报销
  downloadReimbursementSummary (params) {
    let urls = 'http://www.helloapplicant.com/reimbursement/downloadReimbursementSummary?currentPage=' + params['currentPage'] + '&pageSize=' + params['pageSize']
    if (typeof (params['company']) !== 'undefined') {
      urls = urls + '&company=' + params['company']
    }
    if (typeof (params['userName']) !== 'undefined') {
      urls = urls + '&userName=' + params['userName']
    }
    if (typeof (params['paymentMonth']) !== 'undefined') {
      urls = urls + '&paymentMonth=' + params['paymentMonth']
    }
    if (typeof (params['sum']) !== 'undefined') {
      urls = urls + '&sum=' + params['sum']
    }
    window.open(urls, '_blank')
  },
  // 查找后台统计
  queryStatistics (params) {
    return axios.get('/reimbursement/queryStatistics', {
      params: params
    })
  },
  // 查找后台数据
  query (params) {
    return axios.get('/reimbursement/query', {
      params: params
    })
  },
  // 查找后台数据
  querySummaryPage (params) {
    return axios.get('/reimbursement/querySummaryPage', {
      params: params
    })
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
