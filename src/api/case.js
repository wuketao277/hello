import axios from 'axios'

export default {
  // 保存
  save (params) {
    return axios.post('/case/save', params)
  },
  // 查找后台数据
  queryPage (params) {
    return axios.post('/case/queryPage', params)
  },
  // 查找后台数据
  query (params) {
    return axios.get('/case/query', {
      params: params
    })
  },
  // 通过id查询
  queryById (params) {
    return axios.get('/case/queryById', {
      params: params
    })
  },
  // 更新关注
  updateCaseAttention (params) {
    return axios.post('/case/updateCaseAttention', params)
  },
  // 查询关注信息
  queryCaseAttentionByCaseId (params) {
    return axios.get('/case/queryCaseAttentionByCaseId?caseId=' + params)
  },
  // 查询当前用户的所有关注信息
  queryAllCaseAttention (params) {
    return axios.get('/case/queryAllCaseAttention?onlyShowMyselfCandidate=' + params)
  },
  // 查询当前用户的所有关注信息
  queryAllCaseAttention2 () {
    return axios.get('/case/queryAllCaseAttention2')
  },
  // 查询所有用户的所有关注信息
  queryAllUserCaseAttention () {
    return axios.get('/case/queryAllUserCaseAttention')
  },
  // 查询当前用户的所有对接职位
  queryAllCWCase () {
    return axios.get('/case/queryAllCWCase')
  },
  // 通过主键删除
  deleteById (params) {
    return axios.post('/case/deleteById', params)
  },
  // 清空体验岗位
  clearExperience () {
    return axios.get('/case/clearExperience')
  }
}
