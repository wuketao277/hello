import holidayApi from '@/api/holiday'
import commonJS from '@/common/common'

export default {
  data () {
    return {
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
      multipleSelection: []
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'selectionColumn' || key === 'approveButton') {
        return commonJS.isAdmin()
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.query()
    },
    // 日期格式化
    formatDate (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined' && cellvalue !== null && cellvalue !== '') {
        return cellvalue.substr(0, 10)
      }
      return ''
    },
    // 添加
    add () {
      this.$router.push({
        path: '/holiday/holiday'
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
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/holiday/holiday',
          query: {
            mode: 'detail',
            holiday: this.currentRow
          }
        })
      }
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/holiday/holiday',
          query: {
            mode: 'modify',
            holiday: this.currentRow
          }
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
      holidayApi.queryPage(query).then(res => {
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
    switchSearchDialog () {
      this.$refs['search'].focus()
    },
    // 按照条件搜索
    searchCandidate () {
      this.table.pageable.pageNumber = 1
      this.table.pageable.pageSize = 10
      this.query()
    },
    getStorageContent () {
      if (typeof (window.localStorage['holidaylist.search']) === 'undefined') {
        return ''
      } else {
        return window.localStorage['holidaylist.search']
      }
    },
    getPageNumber () {
      if (typeof (window.localStorage['holidaylist.pageNumber']) === 'undefined') {
        return 1
      } else {
        return window.localStorage['holidaylist.pageNumber']
      }
    },
    getPageSize () {
      if (typeof (window.localStorage['holidaylist.pageSize']) === 'undefined') {
        return 10
      } else {
        return window.localStorage['holidaylist.pageSize']
      }
    },
    // 处理行选择变更
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 选中项审批通过
    approveSelection () {
      if (this.multipleSelection.size === 0) {
        this.$message({
          message: '请先选择要审批的记录！',
          type: 'info',
          showClose: true
        })
      } else {
        this.$confirm('确认要审批通过选中项吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          holidayApi.approveSelection(this.multipleSelection).then(res => {
            if (res.status === 200) {
              // 刷新列表
              this.query()
              this.$message({
                message: '审批成功！',
                type: 'success',
                showClose: true
              })
            }
          })
        })
      }
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
