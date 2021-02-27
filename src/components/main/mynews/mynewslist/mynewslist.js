import mynewsApi from '@/api/mynews'

export default {
  data () {
    return {
      // 显示的是搜索结果
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
      search: ''
    }
  },
  methods: {
    // 添加新闻
    addNews () {
      this.$router.push({path: '/mynews/mynews'})
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
    // 查看新闻
    detailNews () {
      if (this.checkSelectRow()) {
        this.$router.push({path: '/mynews/mynews',
          query: {mode: 'detail', news: this.currentRow}})
      }
    },
    // 修改新闻
    modifyNews () {
      if (this.checkSelectRow()) {
        this.$router.push({path: '/mynews/mynews',
          query: {mode: 'modify', news: this.currentRow}})
      }
    },
    // 删除新闻
    deleteNews () {
      if (this.checkSelectRow()) {
        this.$router.push({path: '/mynews/mynews',
          query: {mode: 'detail', news: this.currentRow}})
      }
    },
    // 搜索按钮
    queryNews () {
      this.showSearchDialog = true
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
      mynewsApi.queryNewsPage(query).then(res => {
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
    // 搜索对话框，取消按钮
    cancelSearchDialog () {
      this.search = ''
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.query()
      this.search = ''
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
