import clientApi from '@/api/client'
import commonJs from '@/common/common'
import userApi from '@/api/user'

export default {
  data() {
    return {
      // 显示搜索对话框
      showSearchDialog: false,
      // 显示搜索结果
      showSearchResult: false,
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJs.getPageNumber('clientlist.pageNumber'),
          pageSize: commonJs.getPageSize('clientlist.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJs.getStorageContent('clientlist.search'),
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 处理列表双击事件
    handleDBClick() {
      if (this.jobType === 'FULLTIME' && (commonJs.isAdmin() || commonJs.isAdminCompany())) {
        // 管理员可以修改
        this.modify()
      } else {
        // 非管理员只读
        this.detail()
      }
    },
    // 显示控制
    showControl(val) {
      if (val === 'addClient' || val === 'modifyClient') {
        return this.jobType === 'FULLTIME' && (commonJs.isAdmin() || commonJs.isAdminCompany())
      }
      return false
    },
    rowStyle(row, rowIndex) {
      if (this.currentRow === null) {
        return 'unselectedRow'
      }
      if (this.currentRow['chineseName'] === row['row']['chineseName']) {
        // alert('selectedRow')
        return 'selectedRow'
      }
    },
    switchSearch() {
      this.showSearchDialog = !this.showSearchDialog
    },
    // 检查是否选择了一条记录
    checkSelectRow() {
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
    add() {
      this.$router.push('/background.html/client/client')
    },
    // 修改
    modify() {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/client/client',
          query: {
            mode: 'modify',
            client: this.currentRow
          }
        })
      }
    },
    // 查看
    detail() {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/client/client',
          query: {
            mode: 'detail',
            client: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query() {
      window.localStorage['clientlist.search'] = this.search
      window.localStorage['clientlist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['clientlist.pageSize'] = this.table.pageable.pageSize
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
    rowChange(val) {
      this.currentRow = val
    },
    // 页尺寸变化
    sizeChange(val) {
      this.table.pageable.pageSize = val
      this.query()
    },
    // 当前页变化
    currentChange(val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 上一页 点击
    prevClick(val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 下一页 点击
    nextClick(val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 搜索对话框，确定按钮
    sureSearchDialog() {
      this.table.pageable.pageNumber = 1
      this.query()
    }
  },
  created() {
    // 获取当前用户的角色列表
    userApi.findSelf().then(res => {
      if (res.status === 200) {
        this.roles = res.data.roles
        this.jobType = res.data.jobType
      }
    })
    this.query()
  }
}
