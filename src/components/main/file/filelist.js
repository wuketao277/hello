import uploadFileApi from '@/api/uploadFile'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'
import commonJs from '@/common/common'

export default {
  components: {
    downloadFile,
    uploadFile
  },
  data () {
    return {
      fileList: [],
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJs.getPageNumber('filelist.pageNumber'),
          pageSize: commonJs.getPageSize('filelist.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJs.getStorageContent('filelist.search'),
      showUploadFileDialog: false,
      uploadFileData: {}
    }
  },
  methods: {
    // 下载文件
    downloadFile (row) {
      uploadFileApi.downloadPreCheck(row.uuid).then(res => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            // 返回空表示可以下载
            uploadFileApi.download(row.uuid)
          } else {
            this.$message({
              type: 'warning',
              message: res.data
            })
          }
        }
      })
    },
    // 删除文件
    deleteFile (row) {
      this.$confirm('确认要删除文件“' + row.originalFileName + '”吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        uploadFileApi.deleteById(row.id).then(res => {
          if (res.status === 200) {
            if (res.data.length === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 800
              })
              // 触发更新文件操作
              this.$emit('delete-file-success')
            } else {
              this.$message({
                type: 'warning',
                message: res.data
              })
            }
          }
        })
      }).catch(() => { })
    },
    // 打开上传文件对话框
    openUploadFileDialog () {
      this.showUploadFileDialog = true
    },
    // 查询后台数据
    query () {
      window.localStorage['filelist.search'] = this.search
      window.localStorage['filelist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['filelist.pageSize'] = this.table.pageable.pageSize
      let params = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      uploadFileApi.findByOriginalFileName(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
        this.$message({
          type: 'success',
          message: '查询完成！',
          duration: 800
        })
      })
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.table.pageable.pageSize = 10
      this.query()
    },
    // 处理选中行时间
    handleCurrentChange (val) {
      this.currentRow = val
    },
    queryUploadFiles () {
      // 刷新列表
      this.query()
    },
    handlePreview () { },
    handleRemove () { },
    beforeRemove () { },
    sizeChange (val) {
      this.table.pageable.pageSize = val
      this.query()
    },
    currentChange (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    prevClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    nextClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    switchSearchDialog () { }
  },
  computed: {},
  created () {
    this.query()
  }
}
