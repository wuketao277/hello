import axios from 'axios'

export default {
  // 保存角色接口
  saveRole (params) {
    return axios.post('/role/saveRole', params)
  },
  // 查找后台数据
  queryRolePage (params) {
    return axios.get('/role/queryRolePage', {params: params})
  },
  // 删除后台数据
  deleteRole (params) {
    return axios.get('/role/deleteRole', {params: params})
  }
}
