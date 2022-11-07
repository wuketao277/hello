import axios from 'axios'

export default {
  // 通过类型查询信息
  findAllByCategory (params) {
    return axios.get('/config/findAllByCategory', {
      params: params
    })
  },
  // 通过类型、类别查询信息
  findAllByCategoryAndType (params) {
    return axios.get('/config/findAllByCategoryAndType', {
      params: params
    })
  },
  // 通过类型、类别、编码查询信息
  findFirstByCategoryAndTypeAndCode (params) {
    return axios.get('/config/findFirstByCategoryAndTypeAndCode', {
      params: params
    })
  }
}
