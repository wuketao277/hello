export default {
  data () {
    return {
      fileList: [],
      // 从配置文件中读取上传文件地址
      uploadFileUrl: process.env.UPLOAD_FILE_URL
    }
  },
  // uploadFileData 中定义了上传文件需要的管理信息
  props: ['uploadFileData'],
  methods: {
    uploadFileSuccess (response, file, fileList) {
      this.$message({
        message: '文件上传成功！',
        type: 'success',
        showClose: true
      })
      // 触发上传文件成功方法
      this.$emit('upload_file_success')
      // 情况历史数据
      this.fileList = []
    },
    handlePreview () {},
    handleRemove () {},
    beforeRemove () {}
  },
  created () {
  }
}
