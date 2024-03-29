import axios from 'axios'

export default {
  // 查找当前用户
  findSelf () {
    return axios.get('/user/findSelf')
  },
  // 查找所有用户
  findAll () {
    return axios.get('/user/findAll')
  },
  // 查找所有正常状态下的用户
  findAllEnabled () {
    return axios.get('/user/findAllEnabled')
  },
  // 获取所有正常状态的全职员工
  findAllEnabledFullTime () {
    return axios.get('/user/findAllEnabledFullTime')
  },
  // 获取所有正常状态的全职员工和实习生
  findAllEnabledFullTimeAndIntern () {
    return axios.get('/user/findAllEnabledFullTimeAndIntern')
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
    return axios.get('/user/findById', {
      params: params
    })
  },
  // 通过姓名查找用户信息
  findByName (params) {
    return axios.get('/user/findByName', {
      params: params
    })
  },
  // 查找后台数据
  queryPage (params) {
    return axios.get('/user/queryPage', {
      params: params
    })
  },
  // 查找后台数据
  query (params) {
    return axios.get('/user/query', {
      params: params
    })
  },
  // 查找正常状态的用户
  queryEnabled (params) {
    return axios.get('/user/queryEnabled', {
      params: params
    })
  },
  // 更新用户密码接口
  updatePassword (params) {
    return axios.post('/user/updatePassword', params)
  },
  // 角色检查
  roleCheck (params) {
    return axios.get('/user/roleCheck', {
      params: params
    })
  },
  // 获取当前用户的角色列表
  getCurrentUserRoleList () {
    return axios.get('/user/getCurrentUserRoleList')
  }
}
