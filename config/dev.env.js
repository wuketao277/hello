'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 测试环境下上传文件的地址
  UPLOAD_FILE_URL: '"http://localhost:8080/uploadFile/uploadFile"',
  // 测试环境下下载文件的地址
  DOWNLOAD_FILE_URL: '"http://localhost:8080/uploadFile/download?uuid="'
})
