import clientApi from '@/api/client'
import commonApi from '@/common/common'

export default {
  data () {
    return {
      // 显示搜索对话框
      showSearchDialog: false,
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
    // 显示控制
    showControl (val) {
      debugger
      if (val === 'addClient' || val === 'modifyClient') {
        return commonApi.isFullTimeJobType() && commonApi.isAdmin()
      }
      return false
    },
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.detail()
    },
    rowStyle (row, rowIndex) {
      if (this.currentRow === null) {
        return 'unselectedRow'
      }
      if (this.currentRow['chineseName'] === row['row']['chineseName']) {
        // alert('selectedRow')
        return 'selectedRow'
      }
    },
    switchSearch () {
      this.showSearchDialog = !this.showSearchDialog
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
        this.$router.push({
          path: '/client/client',
          query: {
            mode: 'modify',
            client: this.currentRow
          }
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/client/client',
          query: {
            mode: 'detail',
            client: this.currentRow
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
      clientApi.queryPage(query).then(res => {
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
