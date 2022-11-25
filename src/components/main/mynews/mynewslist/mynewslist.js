import mynewsApi from '@/api/mynews'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      // 显示的是搜索结果
      showSearchResult: false,
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('mynewslist.pageNumber'),
          pageSize: commonJS.getPageSize('mynewslist.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJS.getStorageContent('mynewslist.search')
    }
  },
  methods: {
    // 显示控制
    showControl (url) {
      if (url === 'delete') {
        return commonJS.isAdmin()
      }
    },
    // 添加新闻
    addNews () {
      this.$router.push({
        path: '/mynews/mynews'
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
    // 查看新闻
    detailNews () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/mynews/mynews',
          query: {
            mode: 'detail',
            news: this.currentRow
          }
        })
      }
    },
    // 修改新闻
    modifyNews () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/mynews/mynews',
          query: {
            mode: 'modify',
            news: this.currentRow
          }
        })
      }
    },
    // 通过id删除新闻
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除新闻 ' + this.currentRow.title + ' 吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          mynewsApi.deleteById(this.currentRow.id).then(res => {
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
    // 搜索按钮
    queryNews () {
      this.showSearchDialog = true
    },
    // 查询后台数据
    query () {
      window.localStorage['mynewslist.search'] = this.search
      window.localStorage['mynewslist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['mynewslist.pageSize'] = this.table.pageable.pageSize
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
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.query()
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
