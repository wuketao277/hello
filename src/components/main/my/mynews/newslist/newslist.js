import mynewsApi from '@/api/mynews'

export default {
  data () {
    return {
      table: {
        content: [],
        pageable: {
          pageNumber: 1,
          pageSize: 10
        }
      },
      page: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      currentRow: null,
      search: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    // 添加新闻
    addNews () {
      this.$router.push({path: '/my/mynews/news'})
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
        this.$router.push({path: '/my/mynews/news',
          query: {mode: 'detail', news: this.currentRow}})
      }
    },
    // 修改新闻
    modifyNews () {
      if (this.checkSelectRow()) {
        this.$router.push({path: '/my/mynews/news',
          query: {mode: 'modify', news: this.currentRow}})
      }
    },
    // 删除新闻
    deleteNews () {
      if (this.checkSelectRow()) {
        this.$router.push({path: '/my/mynews/news',
          query: {mode: 'detail', news: this.currentRow}})
      }
    },
    // 查询后台数据
    query () {
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': ''
      }
      debugger
      mynewsApi.queryNewsPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        debugger
        this.table = res.data
      })
    },
    // 处理选中行时间
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
