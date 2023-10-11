import axios from 'axios'

export default {
  // 查找后台数据
  queryKPIVOPage (params) {
    return axios.get('/kpi/queryKPIVOPage', {
      params: params
    })
  }
}
