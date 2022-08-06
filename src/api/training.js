import axios from 'axios'

export default {
  // 保存课程
  saveLesson (params) {
    return axios.post('/training/saveLesson', params)
  },
  // 删除课程
  deleteLessonById (params) {
    return axios.get('/training/deleteLessonById?id=' + params)
  },
  // 查找后台数据课程
  queryLessonByPage (params) {
    return axios.get('/training/queryLessonByPage', {params: params})
  },
  // 通过id查询课程
  queryLessonById (params) {
    return axios.get('/training/queryLessonById?id=' + params)
  },
  // 保存课程问题
  saveLessonQuestion (params) {
    return axios.post('/training/saveLessonQuestion', params)
  },
  // 查找课程问题列表
  queryLessonQuestionByPage (params) {
    return axios.get('/training/queryLessonQuestionByPage', {params: params})
  },
  // 通过id，删除课程问题
  deleteLessonQuestionById (params) {
    return axios.delete('/training/deleteLessonQuestionById?id=' + params)
  },
  // 当前用户是否在课程上签到
  isSignInForLessonStudyRecord (params) {
    return axios.get('/training/isSignInForLessonStudyRecord', {params: params})
  },
  // 当前用户在课程上签到
  signInForLessonStudyRecord (params) {
    return axios.get('/training/signInForLessonStudyRecord', {params: params})
  },
  // 当前用户是否完成课程
  isFinishForLessonStudyRecord (params) {
    return axios.get('/training/isFinishForLessonStudyRecord', {params: params})
  },
  // 完成当前用户课程
  finishForLessonStudyRecord (params) {
    return axios.get('/training/finishForLessonStudyRecord', {params: params})
  },
  // 通过id查询课程学习记录
  queryLessonStudyRecordById (params) {
    return axios.get('/training/queryLessonStudyRecordById', {params: params})
  },
  // 查找课程学习记录列表
  queryLessonStudyRecordByPage (params) {
    return axios.get('/training/queryLessonStudyRecordByPage', {params: params})
  },
  // 保存课程考核记录得分
  saveStudyRecordScore (params) {
    return axios.post('/training/saveStudyRecordScore', params)
  }
}
