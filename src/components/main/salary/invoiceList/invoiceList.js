import clientApi from '@/api/client'
import userApi from '@/api/user'
import invoiceApi from '@/api/invoice'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      types: [{code: 'Z3', name: '3%专票'},
        {code: 'Z6', name: '6%专票'},
        {code: 'P3', name: '3%普票'},
        {code: 'P6', name: '6%普票'}],
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('invoiceList.pageNumber'),
          pageSize: commonJS.getPageSize('invoiceList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      searchDialog: false,
      search: {clientId: null, userId: null, candidateId: null, type: null, status: true, createDateStart: null, createDateEnd: null},
      clients: [],
      consultants: []
    }
  },
  methods: {
    // 格式化开票类型
    formatType (row, column, cellvalue, index) {
      if (cellvalue === 'Z3') {
        return '3%专票'
      } else if (cellvalue === 'Z6') {
        return '6%专票'
      } else if (cellvalue === 'P3') {
        return '3%普票'
      } else if (cellvalue === 'P6') {
        return '6%普票'
      }
    },
    // 通过id发票信息
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除 ' + this.currentRow.clientChineseName + '-' + this.currentRow.candidateChineseName + '的发票信息吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          invoiceApi.deleteById(this.currentRow.id).then(res => {
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
    formatCancel (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined') {
        if (cellvalue === '1') {
          return '作废'
        }
      }
      return '正常'
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
      this.$router.push('/salary/invoice')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/invoice',
          query: {
            mode: 'modify',
            invoice: this.currentRow
          }
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/invoice',
          query: {
            mode: 'detail',
            invoice: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['invoiceList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['invoiceList.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      invoiceApi.queryPage(query).then(res => {
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
    // 获取所有“客户”信息
    clientApi.findAll().then(res => {
      if (res.status === 200) {
        this.clients = res.data
      }
    })
    userApi.findAllEnabled().then(res => {
      if (res.status === 200) {
        this.consultants = res.data
      }
    })
    this.query()
  }
}
