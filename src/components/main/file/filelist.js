import uploadFileApi from '@/api/uploadFile'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'

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
          pageNumber: this.getPageNumber(),
          pageSize: this.getPageSize()
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: this.getStorageContent(),
      showUploadFileDialog: false,
      uploadFileData: {}
    }
  },
  methods: {
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
          message: '查询完成！'
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
    switchSearchDialog () {},
    getStorageContent () {
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
