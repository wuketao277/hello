import candidate from '@/api/candidate'
import comment from '@/api/comment'

export default {
  data () {
    return {
      contentFromComment: [],
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
    query () {
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
        this.$message({
          type: 'success',
          message: '查询完成！'
        })
      })
      debugger
      // 如果存在查询条件就通过查询条件从评论中搜索候选人
      if (this.search !== '') {
        let query = {'search': this.search}
        comment.queryCandidateByCommentLimit100(query).then(res => {
          if (res.status !== 200) {
            this.$message.error({
              message: '通过评论查询候选人失败，请联系管理员！'
            })
            return
          }
          this.contentFromComment = res.data
        })
      } else {
        // 清空查询数据
        this.contentFromComment = []
      }
    },
    // 处理选中行
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 处理选中行
    handleCurrentChangeFromComment (val) {
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
    // 按照条件搜索
    searchCandidate () {
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
