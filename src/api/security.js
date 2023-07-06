import axios from 'axios'

export default {
  // 检查是否登录
  checkLogin () {
    return axios.get('/security/checkLogin')
  },
  // 检查前端版本
  checkVersion (params) {
    return axios.get('/security/checkVersion?version=' + params)
  }
}
