import axios from 'axios'

export default {
  // 保存新闻接口
  saveNews (params) {
    return axios.post('/mynews/saveNews', params)
  },
  // 查找后台数据
  queryNewsPage (params) {
    return axios.get('/mynews/queryNewsPage', {params: params})
  },
  // 获取前100条新闻
  findTop100 () {
    return axios.get('/mynews/findTop100')
  }
}
