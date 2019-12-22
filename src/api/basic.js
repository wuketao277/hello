import axios from 'axios'

export default {
  // 登录接口
  login (params) {
    return axios.post('/security/login', params)
  }
}
