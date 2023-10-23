import reimbursementApi from '@/api/reimbursement'
import commonJS from '@/common/common'
import userApi from '@/api/user'

export default {
  data () {
    return {
      // 总报销金额
      reimbursementSum: 10,
      // 显示搜索结果
      showSearchResult: false,
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('reimbursementSummaryList.pageNumber'),
          pageSize: commonJS.getPageSize('reimbursementSummaryList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      companyList: commonJS.companyList,
      searchDialog: false,
      search: commonJS.getStorageContentObject('reimbursementSummaryList.search'),
      reimbursementMonth: commonJS.getYYYY_MM(new Date()), // 报销月份，默认是当月
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.$router.push({
        path: '/salary/reimbursementItemList',
        query: {
          mode: 'query',
          row: row
        }
      })
    },
    // 显示控制
    showControl (key) {
      if (key === 'generateReimbursementSummary' || key === 'edit' || key === 'statistics') {
        return commonJS.isAdminInArray(this.roles)
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 生成报销摘要
    generateReimbursementSummary () {
      if (this.reimbursementMonth === null || this.reimbursementMonth === '') {
        this.$message({
          message: '请选择月份',
          type: 'warning',
          showClose: true
        })
      } else {
        let msg = '确定要生成' + this.reimbursementMonth + '月的报销吗？'
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let request = {
            month: this.reimbursementMonth
          }
          reimbursementApi.generateReimbursementSummary(request).then(
            res => {
              if (res.status === 200) {
                this.$message({
                  message: '生成成功！',
                  type: 'success',
                  showClose: true
                })
                this.query()
              } else {
                this.$message.error('生成失败！')
              }
            })
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['reimbursementSummaryList.search'] = JSON.stringify((typeof (this.search) === 'undefined' || typeof (this.search) !== 'object') ? {} : this.search)
      window.localStorage['reimbursementSummaryList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['reimbursementSummaryList.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'company': this.search.company,
        'userName': this.search.userName,
        'paymentMonth': this.search.paymentMonth,
        'sum': this.search.sum
      }
      reimbursementApi.querySummaryPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data.page
        this.reimbursementSum = res.data.sum
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
      this.query()
    },
    // 清空查询条件
    clearQueryCondition () {
      this.search = {}
      window.localStorage['reimbursementSummaryList.search'] = {}
    },
    // 公司转换器
    companyFormatter (row) {
      for (let c of this.companyList) {
        if (c.code === row.company) {
          return c.name
        }
      }
    },
    // 设置行样式
    setRowClassName ({
      row,
      index
    }) {
      if (row.company === 'Shanghaihailuorencaikeji') {
        return 'row1'
      } else if (row.company === 'Shenyanghailuorencaifuwu') {
        return 'row2'
      } else if (row.company === 'Wuhanhailuorencaifuwu') {
        return 'row3'
      } else if (row.company === 'Nanjinghailuorencaifuwu') {
        return 'row4'
      }
    },
    // 下载报销项
    downloadReimbursementSummary () {
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'company': this.search.company,
        'userName': this.search.userName,
        'paymentMonth': this.search.paymentMonth,
        'sum': this.search.sum
      }
      reimbursementApi.downloadReimbursementSummary(query).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '下载成功！',
            type: 'success',
            showClose: true
          })
        }
      })
    }
  },
  created () {
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
