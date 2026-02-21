import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.get('/candidateClientRepeatedLabel/save?name=' + params)
  },
  // 获取全部标签名称
  findAllName () {
    return axios.get('/candidateClientRepeatedLabel/findAllName')
  },
  // 通过名称删除标签
  deleteByName (params) {
    return axios.delete('/candidateClientRepeatedLabel/deleteByName?name=' + params)
  },
  // 删除然后获取最新
  deleteThenFindAllName (params) {
    return axios.get('/candidateClientRepeatedLabel/deleteThenFindAllName?name=' + params)
  }
}
