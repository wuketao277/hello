import uploadFile from '@/api/uploadFile'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'

export default {
  components: {
    downloadFile
  },
  data () {
    return {
      fileList: [],
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: 1,
          pageSize: 10
        }
      },
      page: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      currentRow: null,
      search: ''
    }
  },
  methods: {
    // 查询后台数据
    query (showDialog = false) {
      if (this.search === '') {
        this.showSearchResult = false
      } else {
        this.showSearchResult = true
      }
      let params = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      uploadFile.findByOriginalFileName(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
        if (showDialog) {
          this.$message({
            type: 'success',
            message: '查询完成！'
          })
        }
      })
    },
    // 处理选中行时间
    handleCurrentChange (val) {
      this.currentRow = val
    },
    uploadFileSuccess (response, file, fileList) {
      if (response.flag) {
        this.$message({
          message: '文件' + file.name + '上传成功',
          type: 'success',
          showClose: true
        })
        // 刷新列表
        this.query()
      } else {
        this.$message({
          message: response.msg,
          showClose: true
        })
      }
    },
    handlePreview () {},
    handleRemove () {},
    beforeRemove () {},
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
    switchSearchDialog () {
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.query()
      this.search = ''
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
