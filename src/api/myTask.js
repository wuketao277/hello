import axios from 'axios'

export default {
  // 保存接口
  save (params) {
    return axios.post('/myTask/save', params)
  },
  // 更新接口
  update (params) {
    return axios.post('/myTask/update', params)
  },
  // 保存接口
  saveTaskToSelf (params) {
    return axios.post('/myTask/saveTaskToSelf', params)
  },
  // 通过候选人id查询
  findByRelativeCandidateId (params) {
    return axios.get('/myTask/findByRelativeCandidateId?relativeCandidateId=' + params)
  },
  // 查询本人今日任务
  queryTodayTaskForMe () {
    return axios.get('/myTask/queryTodayTaskForMe')
  },
  // 查找后台数据
  queryMyTaskPage (params) {
    return axios.get('/myTask/queryMyTaskPage', {params: params})
  }
}
