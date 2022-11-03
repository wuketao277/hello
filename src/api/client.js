import axios from 'axios'

export default {
  // 保存客户接口
  save (params) {
    return axios.post('/client/save', params)
  },
  // 删除候选人接口
  deleteById (params) {
    return axios.get('/client/deleteById?id=' + params)
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/client/queryPage', {params: params})
  },
  // 通过id查询
  queryById (params) {
    return axios.get('/client/queryById?id=' + params)
  },
  // 查找所有
  findAll () {
    return axios.get('/client/findAll')
  },
  // 查找所有
  findAllOrderByChineseName () {
    return axios.get('/client/findAllOrderByChineseName')
  },
  // 保存客户合同
  saveContract (params) {
    return axios.post('/client/saveContract', params)
  },
  // 查询客户合同信息
  findContractByClientId (params) {
    return axios.get('/client/findContractByClientId?clientId=' + params)
  }
}
