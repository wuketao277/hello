import axios from 'axios'

export default {
  // 保存客户接口
  save (params) {
    return axios.post('/kpiWorkDaysAdjust/save', params)
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/kpiWorkDaysAdjust/deleteById?id=' + params)
  },
  // 查找后台数据
  queryPage (params) {
    return axios.post('/kpiWorkDaysAdjust/queryPage', params)
  },
  // 通过id查询
  queryById (params) {
    return axios.get('/kpiWorkDaysAdjust/queryById?id=' + params)
  }
}
