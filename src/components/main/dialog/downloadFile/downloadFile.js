import uploadFileApi from '@/api/uploadFile'

export default {
  data () {
    return {}
  },
  props: ['files'],
  methods: {
    // 下载文件
    downloadFile (file) {
      uploadFileApi.download(file.uuid)
    },
    // 删除文件
    deleteFile (file) {
      this.$confirm('确认要删除文件“' + file.originalFileName + '”吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        debugger
        uploadFileApi.deleteById(file.id).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 触发更新文件操作
            this.$emit('delete-file-success')
          }
        })
      }).catch(() => {})
    }
  }
}
