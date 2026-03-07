import costInvoiceApi from '@/api/costInvoice'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      types: commonJS.invoiceTypeList,// 发票类型
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('costInvoiceList.pageNumber'),
          pageSize: commonJS.getPageSize('costInvoiceList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300, 1000, 10000]
      },
      currentRow: null,
      searchDialog: false,
      search: {
        consultantUserName: null,
        invoiceDate: null,
        submitDate: null,
        invoiceNumber: null,
        sum: null,
        kind: null,
        remark: null,
        approveStatus: null
      },
      consultants: [],
      availableAmount: 0, // 成本发票剩余金额
      dialogAllConsultantAvailableAmountShowControl: false, // 所有顾问剩余金额显示控制
      allConsultantAvailableAmount: [], // 所有顾问剩余金额
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'calcAllConsultantAvailableAmount' || key === 'search.consultantUserName') {
        return commonJS.isAdmin()
      }
      return false
    },
    // 清空搜索条件
    clearQueryCondition () {
      this.search = {
        consultantUserName: null,
        invoiceDate: null,
        submitDate: null,
        invoiceNumber: null,
        sum: null,
        kind: null,
        remark: null,
        approveStatus: null
      }
    },
    // 格式化开票类型
    formatType (row, column, cellvalue, index) {
      // 根据发票类型 code 获取 name
      for (let item of this.types) {
        if (item.code === cellvalue) {
          return item.name
        }
      }
      return ''
    },
    // 通过id发票信息
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除编号:' + this.currentRow.invoiceNumber + ' 金额:' + this.currentRow.sum + '的发票信息吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          costInvoiceApi.deleteById(this.currentRow.id).then(res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                this.$message.error(res.data)
              } else {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true,
                  duration: 800
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
      return commonJS.formatDate(cellvalue)
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
      this.$router.push('/background.html/salary/costInvoice')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/salary/costInvoice',
          query: {
            mode: 'modify',
            costInvoice: this.currentRow
          }
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/salary/costInvoice',
          query: {
            mode: 'detail',
            costInvoice: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['costInvoiceList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['costInvoiceList.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      costInvoiceApi.queryPage(query).then(res => {
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
    // 转换审批状态
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
    // 查询所有顾问的剩余金额
    calcAllConsultantAvailableAmount () {
      costInvoiceApi.calcAllConsultantAvailableAmount().then(res => {
        if (res.status === 200) {
          this.allConsultantAvailableAmount = res.data
          this.dialogAllConsultantAvailableAmountShowControl = true
        }
      })
    }
  },
  created () {
    // 查询剩余金额
    costInvoiceApi.calcAvailableAmount().then(res => {
      if (res.status === 200) {
        this.availableAmount = res.data
      }
    })
    // 查询列表数据
    this.query()
  }
}
