import axios from 'axios'

export default {
  // 检查是否登录
  checkLogin () {
    return axios.get('/security/checkLogin')
  }
}
