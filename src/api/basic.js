import axios from 'axios'

export default {
  // 登录接口
  login (params) {
    return axios.post('/security/login', params)
  },
  // 登出接口
  logout (params) {
    return axios.post('/security/logout', params)
  }
}
