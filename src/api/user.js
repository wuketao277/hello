import axios from 'axios'

export default {
  // 查找所有正常状态下的用户
  findAllEnabled () {
    return axios.get('/user/findAllEnabled')
  }
}
