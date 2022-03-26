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
          pageNumber: this.getPageNumber(),
          pageSize: this.getPageSize()
        }
      },
      page: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      currentRow: null,
      search: this.getSearchContent()
    }
  },
  methods: {
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
      uploadFile.findByOriginalFileName(params).then(res => {
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
          message: '查询完成！'
        })
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
    getSearchContent () {
      if (typeof (window.localStorage['filelist.search']) === 'undefined') {
        return ''
      } else {
        return window.localStorage['filelist.search']
      }
    },
    getPageNumber () {
      if (typeof (window.localStorage['filelist.pageNumber']) === 'undefined') {
        return 1
      } else {
        return window.localStorage['filelist.pageNumber']
      }
    },
    getPageSize () {
      if (typeof (window.localStorage['filelist.pageSize']) === 'undefined') {
        return 10
      } else {
        return window.localStorage['filelist.pageSize']
      }
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
