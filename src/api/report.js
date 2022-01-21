import axios from 'axios'

export default {
  // 获取总体报告
  queryGeneral (params) {
    return axios.post('/report/queryGeneral', params)
  }
}
