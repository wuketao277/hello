import axios from 'axios'

export default {
  // 登录接口
  async login (params) {
    let res = await axios.post('/bg/login', params)
    return res.data
  }
}
