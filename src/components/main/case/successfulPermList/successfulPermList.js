import successfulPermApi from '@/api/successfulPerm'
import clientApi from '@/api/client'
import userApi from '@/api/user'
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
      searchDialog: false,
      clients: [],
      consultants: [],
      bds: [],
      cws: [],
      approveStatusList: [{'id': 'applied', 'name': '申请状态'}, {'id': 'approved', 'name': '审批通过'}, {'id': 'denied', 'name': '审批否决'}],
      search: this.getSearchContent()
    }
  },
  methods: {
    // 通过id删除成功case
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除 ' + this.currentRow.title + '-' + this.currentRow.candidateChineseName + ' 成功职位吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          let params = {'id': this.currentRow.id}
          successfulPermApi.deleteById(params).then(res => {
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
    formatApproveStatus (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined') {
        if (cellvalue === 'approved') {
          return '审批通过'
        } else if (cellvalue === 'denied') {
          return '审批否决'
        }
      }
      return '申请状态'
    },
    formatDate (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined' && cellvalue !== null && cellvalue !== '') {
        return cellvalue.substr(0, 10)
      }
      return ''
    },
    // 显示控制
    showControl (key) {
      if (key === 'add' || key === 'edit' || key === 'delete') {
        return commonJS.hasRole('admin')
      }
      // 没有特殊要求的不需要角色
      return true
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
      this.$router.push('/case/successfulPerm')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/case/successfulPerm',
          query: {
            mode: 'modify',
            successfulPerm: this.currentRow
          }
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/case/successfulPerm',
          query: {
            mode: 'detail',
            successfulPerm: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['successfulPermList.search'] = JSON.stringify(this.search)
      window.localStorage['successfulPermList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['successfulPermList.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      successfulPermApi.queryPage(query).then(res => {
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
      if (typeof (window.localStorage['successfulPermList.search']) === 'undefined') {
        return {}
      } else {
        return JSON.parse(window.localStorage['successfulPermList.search'])
      }
    },
    getPageNumber () {
      if (typeof (window.localStorage['successfulPermList.pageNumber']) === 'undefined') {
        return 1
      } else {
        return window.localStorage['successfulPermList.pageNumber']
      }
    },
    getPageSize () {
      if (typeof (window.localStorage['successfulPermList.pageSize']) === 'undefined') {
        return 10
      } else {
        return window.localStorage['successfulPermList.pageSize']
      }
    }
  },
  created () {
    // 获取所有“客户”信息
    clientApi.findAll().then(res => {
      if (res.status === 200) {
        this.clients = res.data
      }
    })
    userApi.findAllEnabled().then(res => {
      if (res.status === 200) {
        this.consultants = res.data
        this.cws = res.data
        this.bds = res.data
      }
    })
    this.query()
  }
}
