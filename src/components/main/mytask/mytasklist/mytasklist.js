import myTaskApi from '@/api/myTask'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      // 显示搜索对话框
      searchDialog: false,
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
      search: commonJS.getStorageContentObject('mytasklist.search'),
      fileList: []
    }
  },
  methods: {
    // 获取状态名称
    getFinishedName (row, column) {
      if (row.finished) {
        return '已完成'
      } else {
        return '未完成'
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
    // 新增任务
    addTask () {
      this.$router.push({
        path: '/mytask/mytask'
      })
    },
    // 修改任务
    modifyTask () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/mytask/mytask',
          query: {
            mode: 'modify',
            task: this.currentRow
          }
        })
      }
    },
    // 查看任务
    detailTask () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/mytask/mytask',
          query: {
            mode: 'view',
            task: this.currentRow
          }
        })
      }
    },
    // 删除任务
    deleteTask () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除该记录吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃'
        })
          .then(() => {
            myTaskApi.deleteById(this.currentRow.id).then(res => {
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
      window.localStorage['mytasklist.search'] = JSON.stringify(this.search)
      window.localStorage['mytasklist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['mytasklist.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      myTaskApi.queryMyTaskPage(query).then(res => {
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
    // 处理选中行时间
    handleCurrentChange (val) {
      this.currentRow = val
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
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.query()
    },
    // 清空查询条件
    clearQueryCondition () {
      this.search = {}
      window.localStorage['mytasklist.search'] = {}
    },
    // 设置单元格样式
    setCellClassName ({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (row.finished && column.label === '状态') {
        return 'cellGreen'
      } else if (!row.finished && column.label === '状态') {
        return 'cellRed'
      }
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
