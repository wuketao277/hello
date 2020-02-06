export default {
  data () {
    return {
      fileList: []
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
