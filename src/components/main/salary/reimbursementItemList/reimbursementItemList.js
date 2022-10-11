import reimbursementApi from '@/api/reimbursement'
import commonJS from '@/common/common'

export default {
  data () {
    return {
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
      search: this.getSearchContent()
    }
  },
  methods: {
    getSearchContent () {
      if (typeof (window.localStorage['reimbursementItemList.search']) === 'undefined') {
        return ''
      } else {
        return window.localStorage['reimbursementItemList.search']
      }
    },
    getPageNumber () {
      if (typeof (window.localStorage['reimbursementItemList.pageNumber']) === 'undefined') {
        return 1
      } else {
        return window.localStorage['reimbursementItemList.pageNumber']
      }
    },
    getPageSize () {
      if (typeof (window.localStorage['reimbursementItemList.pageSize']) === 'undefined') {
        return 10
      } else {
        return window.localStorage['reimbursementItemList.pageSize']
      }
    },
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.detail()
    },
    // 显示控制
    showControl (key) {
      if (key === 'generateReimbursementSummary') {
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
    // 新增
    add () {
      this.$router.push('/salary/reimbursementItem')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/reimbursementItem',
          query: {
            mode: 'modify',
            reimbursementItem: this.currentRow
          }
        })
      }
    },
    // 删除选中记录
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除报销吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          reimbursementApi.deleteById(this.currentRow.id).then(
            res => {
              if (res.status === 200) {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true
                })
                this.query()
              } else {
                this.$message.error('删除失败！')
              }
            })
        })
      }
    },
    // 查看
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/reimbursementItem',
          query: {
            mode: 'detail',
            reimbursementItem: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['reimbursementItemList.search'] = this.search
      window.localStorage['reimbursementItemList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['reimbursementItemList.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      reimbursementApi.queryPage(query).then(res => {
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
      this.query()
    },
    // 发送地点转换器
    locationFormatter (row) {
      if (row.location === 'Shanghai') {
        return '上海'
      } else if (row.location === 'Beijing') {
        return '北京'
      } else if (row.location === 'Shenyang') {
        return '沈阳'
      } else if (row.location === 'Enshi') {
        return '恩施'
      }
    },
    // 公司转换器
    companyFormatter (row) {
      if (row.company === 'Shanghaihailuorencaifuwu') {
        return '上海海罗人才服务有限公司'
      } else if (row.company === 'Shanghaihailuorencaikeji') {
        return '上海海罗人才科技有限公司'
      } else if (row.company === 'Shenyanghailuorencaikeji') {
        return '沈阳海罗人才服务有限公司'
      }
    },
    // 是否报销转换器
    needPayFormatter (row) {
      if (row.needPay === 'YES') {
        return '是'
      } else if (row.needPay === 'NO') {
        return '否'
      }
    },
    // 报销类别转换器
    typeFormatter (row) {
      if (row.type === 'Transportation') {
        return '交通'
      } else if (row.type === 'Travel') {
        return '差旅'
      } else if (row.type === 'Communication') {
        return '通讯'
      } else if (row.type === 'Office') {
        return '办公'
      } else if (row.type === 'Service') {
        return '服务'
      } else if (row.type === 'Recruit') {
        return '招聘'
      } else if (row.type === 'Other') {
        return '其他'
      }
    },
    // 报销转换器
    kindFormatter (row) {
      if (row.kind === 'InternalAirTicket') {
        return '国内机票'
      } else if (row.kind === 'InternalTrainTicket') {
        return '国内高铁/火车'
      } else if (row.kind === 'TaxiSubway') {
        return '出租车/地铁/其他市内交通'
      } else if (row.kind === 'TravelHotel') {
        return '差旅住宿费'
      } else if (row.kind === 'TravelMeal') {
        return '差旅餐饭'
      } else if (row.kind === 'Communication') {
        return '通讯费'
      } else if (row.kind === 'Training') {
        return '培训费'
      } else if (row.kind === 'Print') {
        return '打印费'
      } else if (row.kind === 'Tool') {
        return '文具费'
      } else if (row.kind === 'Postage') {
        return '快递费'
      } else if (row.kind === 'Candidate') {
        return '候选人招待费'
      } else if (row.kind === 'Client') {
        return '客户招待费'
      } else if (row.kind === 'Employee') {
        return '员工内部招待费'
      } else if (row.kind === 'Consultant') {
        return '外包员工招待费'
      } else if (row.kind === 'BodyCheck') {
        return '体检费'
      } else if (row.kind === 'Recruit') {
        return '招聘费'
      } else if (row.kind === 'Other') {
        return '其他'
      }
    }
  },
  created () {
    this.query()
  }
}
