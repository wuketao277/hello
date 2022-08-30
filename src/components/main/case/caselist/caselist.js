import caseApi from '@/api/case'
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
          pageNumber: this.getPageNumber(),
          pageSize: this.getPageSize()
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: this.getSearchContent(),
      searchStatus: this.getSearchStatusContent()
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'add' || key === 'edit' || key === 'delete') {
        return commonJS.hasRole('admin')
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 通过id删除成功case
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除 ' + this.currentRow.title + ' 职位吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          let params = {'id': this.currentRow.id}
          caseApi.deleteById(params).then(res => {
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
    // 获取状态名称
    getStatusName (row, column) {
      if (row.status === 'PREPARE') {
        return '准备'
      } else if (row.status === 'DOING') {
        return '进行中'
      } else if (row.status === 'FINISH') {
        return '完成'
      } else if (row.status === 'PAUSE') {
        return '暂停'
      } else if (row.status === 'CLOSE') {
        return '关闭'
      } else {
        return ''
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
      this.$router.push('/case/case')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/case/case',
          query: {
            mode: 'modify',
            case: this.currentRow
          }
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/case/case',
          query: {
            mode: 'detail',
            case: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['caselist.search'] = this.search
      window.localStorage['caselist.searchStatus'] = this.searchStatus
      window.localStorage['caselist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['caselist.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search,
        'searchStatus': this.searchStatus
      }
      caseApi.queryPage(query).then(res => {
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
    getSearchContent () {
      if (typeof (window.localStorage['caselist.search']) === 'undefined') {
        return ''
      } else {
        return window.localStorage['caselist.search']
      }
    },
    getSearchStatusContent () {
      if (typeof (window.localStorage['caselist.searchStatus']) === 'undefined') {
        return 'ALL'
      } else {
        return window.localStorage['caselist.searchStatus']
      }
    },
    getPageNumber () {
      if (typeof (window.localStorage['caselist.pageNumber']) === 'undefined') {
        return 1
      } else {
        return window.localStorage['caselist.pageNumber']
      }
    },
    getPageSize () {
      if (typeof (window.localStorage['caselist.pageSize']) === 'undefined') {
        return 10
      } else {
        return window.localStorage['caselist.pageSize']
      }
    }
  },
  created () {
    this.query()
  }
}
