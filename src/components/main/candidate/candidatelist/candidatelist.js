import candidate from '@/api/candidate'
import comment from '@/api/comment'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      contentFromComment: [],
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
      search: this.getSearchContent(),
      fileList: []
    }
  },
  methods: {
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.detailCandidate()
    },
    // 显示控制
    showControl (key) {
      if (key === 'delete') {
        return commonJS.hasRole('admin')
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 通过id删除成功case
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除候选人 ' + this.currentRow.chineseName + ' 吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          candidate.deleteById(this.currentRow.id).then(res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                this.$message.error(res.data)
              } else {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true
                })
                // 删除后刷新列表
                this.query()
              }
            } else {
              this.$message.error('删除失败！')
            }
          })
        })
      }
    },
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
      window.localStorage['candidatelist.search'] = this.search
      window.localStorage['candidatelist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['candidatelist.pageSize'] = this.table.pageable.pageSize
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
    },
    getSearchContent () {
      if (typeof (window.localStorage['candidatelist.search']) === 'undefined') {
        return ''
      } else {
        return window.localStorage['candidatelist.search']
      }
    },
    getPageNumber () {
      if (typeof (window.localStorage['candidatelist.pageNumber']) === 'undefined') {
        return 1
      } else {
        return window.localStorage['candidatelist.pageNumber']
      }
    },
    getPageSize () {
      if (typeof (window.localStorage['candidatelist.pageSize']) === 'undefined') {
        return 10
      } else {
        return window.localStorage['candidatelist.pageSize']
      }
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
