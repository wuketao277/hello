import candidate from '@/api/candidate'

export default {
  data () {
    return {
      // 显示的是搜索后的结果
      showSearchResult: false,
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
      search: '',
      fileList: []
    }
  },
  methods: {
    // 添加候选人
    addCandidate () {
      this.$router.push({
        path: '/candidate/candidate'
      })
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
    // 查看候选人
    detailCandidate () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/candidate/candidate',
          query: {
            mode: 'detail',
            candidate: this.currentRow
          }
        })
      }
    },
    // 修改候选人
    modifyCandidate () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/candidate/candidate',
          query: {
            mode: 'modify',
            candidate: this.currentRow
          }
        })
      }
    },
    // 删除候选人
    deleteCandidate () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除该记录吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃'
        })
          .then(() => {
            candidate.deleteById(this.currentRow.id).then(res => {
              if (res.status !== 200) {
                this.$message.error({
                  message: '删除失败，请联系管理员！'
                })
              } else {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true
                })
                this.query()
              }
            })
          })
      }
    },
    // 查询后台数据
    query (showDialog = false) {
      if (this.search === '') {
        this.showSearchResult = false
      } else {
        this.showSearchResult = true
      }
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      candidate.queryCandidatePage(query).then(res => {
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
      } else {
        this.$message({
          message: response.msg,
          type: 'error',
          showClose: true,
          duration: 0
        })
      }
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
    switchSearchDialog () {
      this.$refs['search'].focus()
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.table.pageable.pageSize = 10
      this.query()
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
