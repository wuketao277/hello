import axios from 'axios'

export default {
  // 获取总体报告
  getGeneralReport () {
    return axios.get('/report/general')
  }
}
