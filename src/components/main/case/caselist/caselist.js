import caseApi from '@/api/case'
import userApi from '@/api/user'
import commonJS from '@/common/common'
import clientApi from '@/api/client'
import clientlinkmanApi from '@/api/clientlinkman'

export default {
  data () {
    return {
      // 显示搜索结果
      showSearchResult: false,
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('caselist.pageNumber'),
          pageSize: commonJS.getPageSize('caselist.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      searchDialog: false,
      search: commonJS.getStorageContentObject('caselist.search'),
      clients: [],
      hrs: [],
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'add' || key === 'edit' || key === 'delete') {
        return commonJS.isAdminInArray(this.roles)
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
          let params = {
            'id': this.currentRow.id
          }
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
      window.localStorage['caselist.search'] = JSON.stringify(this.search)
      window.localStorage['caselist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['caselist.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
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
    // 清空查询条件
    clearQueryCondition () {
      this.search = {}
      window.localStorage['caselist.search'] = {}
    }
  },
  created () {
    // 获取所有“客户”信息
    clientApi.findAllOrderByChineseName().then(res => {
      if (res.status === 200) {
        this.clients = res.data
      }
    })
    clientlinkmanApi.queryAllForSimple().then(res => {
      if (res.status === 200) {
        this.hrs = res.data
      }
    })
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
