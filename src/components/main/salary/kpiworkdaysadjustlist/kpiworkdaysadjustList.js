import kpiworkdaysadjustApi from '@/api/kpiworkdaysadjust'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('kpiworkdaysadjustList.pageNumber'),
          pageSize: commonJS.getPageSize('kpiworkdaysadjustList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null
    }
  },
  methods: {
    // 通过id发票信息
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除 ' + this.currentRow.userName + ' ' + this.currentRow.adjustDate.substr(0, 10) + '的调整信息吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          kpiworkdaysadjustApi.deleteById(this.currentRow.id).then(res => {
            if (res.status === 200) {
              this.$message({
                message: '删除成功！',
                type: 'success',
                showClose: true
              })
              // 删除后刷新列表
              this.query()
            } else {
              this.$message.error('删除失败！')
            }
          })
        })
      }
    },
    formatDate (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined' && cellvalue !== null && cellvalue !== '') {
        return cellvalue.substr(0, 10)
      }
      return ''
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
      this.$router.push('/salary/kpiworkdaysadjust')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/kpiworkdaysadjust',
          query: {
            mode: 'modify',
            kpiworkdaysadjust: this.currentRow
          }
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/kpiworkdaysadjust',
          query: {
            mode: 'detail',
            kpiworkdaysadjust: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['kpiworkdaysadjustList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['kpiworkdaysadjustList.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      kpiworkdaysadjustApi.queryPage(query).then(res => {
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
    }
  },
  created () {
    this.query()
  }
}
