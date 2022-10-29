import axios from 'axios'

export default {
  // 保存假期
  save (params) {
    return axios.post('/holiday/save', params)
  },
  // 通过主键查找
  findById (params) {
    return axios.get('/holiday/findById', {params: params})
  },
  // 通过主键删除
  deleteById (params) {
    return axios.get('/holiday/deleteById', {params: params})
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/holiday/queryPage', {params: params})
  },
  // 审批通过选中行
  approveSelection (params) {
    return axios.post('/holiday/approveSelection', params)
  }
}
