import axios from 'axios'

export default {
  // 保存接口
  save (params) {
    return axios.post('/myTask/save', params)
  },
  // 保存接口
  saveTaskToSelf (params) {
    return axios.post('/myTask/saveTaskToSelf', params)
  },
  // 通过后续人id查询
  findByRelativeCandidateId (params) {
    return axios.get('/myTask/findByRelativeCandidateId?relativeCandidateId=' + params)
  }
}
