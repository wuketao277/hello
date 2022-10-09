import holidayApi from '@/api/holiday'

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
      search: this.getSearchContent()
    }
  },
  methods: {
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.query()
    },
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.detail()
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
    getSearchContent () {
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
    }
  },
  computed: {},
  created () {
    this.query()
  }
}