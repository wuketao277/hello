import axios from 'axios'

export default {
  // 查找当前用户
  findSelf () {
    return axios.get('/user/findSelf')
  },
  // 查找所有正常状态下的用户
  findAllEnabled () {
    return axios.get('/user/findAllEnabled')
  },
  // 保存用户基本信息接口
  saveBaseInfo (params) {
    return axios.post('/user/saveBaseInfo', params)
  },
  // 保存用户扩展信息接口
  saveExtInfo (params) {
    return axios.post('/user/saveExtInfo', params)
  },
  // 通过主键查找用户信息
  findById (params) {
    return axios.get('/user/findById', {params: params})
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/user/queryPage', {params: params})
  },
  // 查找后台数据
  query (params) {
    return axios.get('/user/query', {params: params})
  },
  // 更新用户密码接口
  updatePassword (params) {
    return axios.post('/user/updatePassword', params)
  }
}
