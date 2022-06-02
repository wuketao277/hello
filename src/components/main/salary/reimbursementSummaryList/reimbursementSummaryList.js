import reimbursementApi from '@/api/reimbursement'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      // 当月总报销金额
      currentMonthSumReimbursement: 10,
      // 显示搜索结果
      showSearchResult: false,
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: 1,
          pageSize: 10
        }
      },
      page: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      currentRow: null,
      search: ''
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'generateReimbursementSummary' || key === 'edit' || key === 'statistics') {
        return commonJS.hasRole('admin')
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 生成报销摘要
    generateReimbursementSummary () {
      this.$confirm('确定要生成报销摘要吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        reimbursementApi.generateReimbursementSummary().then(
          res => {
            if (res.status === 200) {
              this.$message({
                message: '生成成功！',
                type: 'success',
                showClose: true
              })
              this.query()
              // 重新生成报销汇总后，再次查询当月总报销金额
              this.getCurrentMonthSumReimbursement()
            } else {
              this.$message.error('生成失败！')
            }
          })
      })
    },
    // 查询后台数据
    query () {
      if (this.search === '') {
        this.showSearchResult = false
      } else {
        this.showSearchResult = true
      }
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      reimbursementApi.querySummaryPage(query).then(res => {
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
    // 查询当月总报销金额
    getCurrentMonthSumReimbursement () {
      reimbursementApi.getCurrentMonthSumReimbursement().then(res => {
        if (res.status === 200) {
          this.currentMonthSumReimbursement = res.data
        }
      })
    }
  },
  created () {
    this.query()
    this.getCurrentMonthSumReimbursement()
  }
}
