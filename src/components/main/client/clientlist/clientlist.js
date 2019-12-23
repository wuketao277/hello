import client from '@/api/client'

export default {
  data () {
    return {
      showSearchDialog: false,
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
    switchSearch () {
      if (this.$data.search.show) {
        this.$data.search.show = false
      } else {
        this.$data.search.show = true
      }
    },
    // 检查是否选择了一条记录
    checkSelectRow () {
      if (this.currentRow === null) {
        this.$message({
          message: '请选择一条记录！',
          type: 'info',
          showClose: true
        })
        return false
      }
      return true
    },
    // 新增
    add () {
      this.$router.push('/client/client')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
      }
    },
    // 删除
    del () {
      if (this.checkSelectRow()) {
      }
    },
    // 查询后台数据
    query () {
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      client.queryClientPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
        debugger
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
      this.showSearchDialog = !this.showSearchDialog
    },
    // 搜索对话框，取消按钮
    cancelSearchDialog () {
      this.showSearchDialog = false
      this.search = ''
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.showSearchDialog = false
      this.query()
      this.search = ''
    }
  }
}
