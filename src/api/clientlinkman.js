import axios from 'axios'

export default {
  // 保存接口
  save (params) {
    return axios.post('/clientlinkman/save', params)
  },
  // 删除接口
  deleteById (params) {
    return axios.get('/clientlinkman/deleteById?id=' + params)
  },
  // 查找后台数据
  queryByClientId (params) {
    return axios.get('/clientlinkman/queryByClientId', {
      params: params
    })
  },
  // 查找所有联系人
  queryAll () {
    return axios.get('/clientlinkman/queryAll')
  },
  // 查找所有联系人
  queryAllForSimple () {
    return axios.get('/clientlinkman/queryAllForSimple')
  }
}
