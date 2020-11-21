import axios from 'axios'

export default {
  // 下载文件
  download (uuid) {
    let urls = 'http://hello/uploadFile/download?uuid=' + uuid
    window.open(urls, '_blank')
  },
  // 通过关联表id和关联表名称查询数据
  findByRelativeTableIdAndRelativeTableName (params) {
    return axios.get('/uploadFile/findByRelativeTableIdAndRelativeTableName', {params: params})
  },
  // 通过id删除
  deleteById (id) {
    return axios.get('/uploadFile/deleteById?Id=' + id)
  }
}
