import salaryApi from '@/api/salary'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      curMonthPreTaxSum: 0,
      curMonthAfterTaxSum: 0,
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('salaryList.pageNumber'),
          pageSize: commonJS.getPageSize('salaryList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJS.getSearchContent('salaryList.search'),
      showWorkingDays: true,
      showHistoryDebt: !commonJS.isConsultantJobType(),
      showLoginName: true,
      salaryMonth: commonJS.getYYYY_MM(new Date()) // 工资月份，默认是当月
    }
  },
  methods: {
    // 行双击
    rowDblClick () {
      if (commonJS.isAdmin()) {
        this.modify()
      } else {
        this.detail()
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/salary',
          query: {
            mode: 'detail',
            salary: this.currentRow
          }
        })
      }
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/salary',
          query: {
            mode: 'modify',
            salary: this.currentRow
          }
        })
      }
    },
    // 显示控制
    showControl (key) {
      if (key === 'generateSalary' || key === 'search' ||
        key === 'modifySalary' || key === 'statistics' ||
        key === 'loginName' || key === 'workingDays' || key === 'historyDebt') {
        return commonJS.isAdmin()
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
    // 生成工资
    generateSalary () {
      if (this.salaryMonth === null || this.salaryMonth === '') {
        this.$message({
          message: '请选择月份',
          type: 'warning',
          showClose: true
        })
      } else {
        let msg = '确定要生成' + this.salaryMonth + '月的工资吗？'
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let request = {
            month: this.salaryMonth
          }
          salaryApi.generateSalary(request).then(
            res => {
              if (res.status === 200) {
                this.$message({
                  message: '生成成功！',
                  type: 'success',
                  showClose: true
                })
                this.query()
                this.getSalaryStatisticsInfo()
              } else {
                this.$message.error('生成失败！')
              }
            })
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['salaryList.search'] = this.search
      window.localStorage['salaryList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['salaryList.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      salaryApi.queryPage(query).then(res => {
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
    // 获取薪资统计信息
    getSalaryStatisticsInfo () {
      window.localStorage['salaryList.search'] = this.search
      window.localStorage['salaryList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['salaryList.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      salaryApi.getSalaryStatisticsInfo(query).then(res => {
        if (res.status === 200) {
          this.curMonthAfterTaxSum = res.data.curMonthAfterTaxSum
          this.curMonthPreTaxSum = res.data.curMonthPreTaxSum
        }
      })
    },
    // 下载薪资
    downloadSalary () {
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      salaryApi.downloadSalary(query).then(res => {
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
    this.query()
    this.getSalaryStatisticsInfo()
  }
}
