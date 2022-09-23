import reimbursementApi from '@/api/reimbursement'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      // 显示搜索结果
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
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: ''
    }
  },
  methods: {
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.detail()
    },
    // 显示控制
    showControl (key) {
      if (key === 'generateReimbursementSummary') {
        return commonJS.hasRole('admin')
      }
      // 没有特殊要求的不需要角色
      return true
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
      this.$router.push('/salary/reimbursementItem')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/reimbursementItem',
          query: {
            mode: 'modify',
            reimbursementItem: this.currentRow
          }
        })
      }
    },
    // 删除选中记录
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除报销吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          reimbursementApi.deleteById(this.currentRow.id).then(
            res => {
              if (res.status === 200) {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true
                })
                this.query()
              } else {
                this.$message.error('删除失败！')
              }
            })
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/reimbursementItem',
          query: {
            mode: 'detail',
            reimbursementItem: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
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
      reimbursementApi.queryPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
      })
    },
    // 行变化
    rowChange (val) {
      this.currentRow = val
    },
    // 页尺寸变化
    sizeChange (val) {
      this.table.pageable.pageSize = val
      this.query()
    },
    // 当前页变化
    currentChange (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 上一页 点击
    prevClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 下一页 点击
    nextClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.query()
    }
  },
  created () {
    this.query()
  }
}
