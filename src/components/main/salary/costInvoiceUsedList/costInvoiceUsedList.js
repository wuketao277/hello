import costInvoiceUsedApi from '@/api/costInvoiceUsed'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('costInvoiceUsedList.pageNumber'),
          pageSize: commonJS.getPageSize('costInvoiceUsedList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300, 1000, 10000]
      },
      currentRow: null,
      searchDialog: false,
      search: {
        consultantUserName: null
      },
    }
  },
  methods: {
    // 清空搜索条件
    clearQueryCondition () {
      this.search = {
        consultantUserName: null
      }
    },
    // 通过id发票信息
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除用户名:' + this.currentRow.consultantUserName + ' 金额:' + this.currentRow.sum + '的信息吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          costInvoiceUsedApi.deleteById(this.currentRow.id).then(res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                this.$message.error(res.data)
              } else {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true,
                  duration: 800
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
    formatCancel (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined') {
        if (cellvalue === '1') {
          return '作废'
        }
      }
      return '正常'
    },
    formatDate (row, column, cellvalue, index) {
      return commonJS.formatDate(cellvalue)
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
      this.$router.push('/background.html/salary/costInvoiceUsed')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/salary/costInvoiceUsed',
          query: {
            mode: 'modify',
            costInvoiceUsed: this.currentRow
          }
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/salary/costInvoiceUsed',
          query: {
            mode: 'detail',
            costInvoice: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['costInvoiceListUsed.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['costInvoiceListUsed.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      costInvoiceUsedApi.queryPage(query).then(res => {
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
      this.table.pageable.pageSize = 10
      this.query()
    },
  },
  created () {
    this.query()
  }
}
