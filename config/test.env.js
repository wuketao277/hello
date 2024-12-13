'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  // 测试环境下上传文件的地址
  UPLOAD_FILE_URL: '"http://localhost/uploadFile/uploadFile"',
  // 测试环境下下载文件的地址
  DOWNLOAD_FILE_URL: '"http://localhost/uploadFile/download?uuid="'
})
