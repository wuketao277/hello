import axios from 'axios'

export default {
  // 查找所有正常状态下的用户
  findAllEnabled () {
    return axios.get('/user/findAllEnabled')
  },
  // 保存用户接口
  save (params) {
    return axios.post('/user/save', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/user/findById', {params: params})
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/user/queryPage', {params: params})
  },
  // 更新用户密码接口
  updatePassword (params) {
    return axios.post('/user/updatePassword', params)
  }
}
