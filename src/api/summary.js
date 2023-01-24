import axios from 'axios'

export default {
  // 查询pipeline情况
  queryPipeline (params) {
    return axios.get('/summary/queryPipeline', {
      params: params
    })
  }
}
