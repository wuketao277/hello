import reimbursementApi from '@/api/reimbursement'
import commonJS from '@/common/common'
import userApi from '@/api/user'

export default {
  data () {
    return {
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('reimbursementItemList.pageNumber'),
          pageSize: commonJS.getPageSize('reimbursementItemList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      companyList: commonJS.companyList,
      currentRow: null,
      searchDialog: false,
      search: commonJS.getStorageContentObject('reimbursementItemList.search'),
      needReimbursementSum: null,
      totalReimbursementSum: null,
      multipleSelection: [],
      reimbursementNeedPay: [{
        code: 'YES',
        name: '是'
      }, {
        code: 'NO',
        name: '否'
      }, {
        code: 'BANK',
        name: '银行'
      }],
      locationList: commonJS.locationList,
      approveStatusList: commonJS.approveStatusList,
      currentKindList: [],
      typeList: commonJS.typeList,
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'generateReimbursementSummary' || key === 'selectionColumn' || key === 'approveButton') {
        return commonJS.isAdminInArray(this.roles)
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
      window.localStorage['reimbursementItemList.search'] = JSON.stringify((typeof (this.search) === 'undefined' || typeof (this.search) !== 'object') ? {} : this.search)
      window.localStorage['reimbursementItemList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['reimbursementItemList.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'userName': this.search.userName,
        'approveStatus': this.search.approveStatus,
        'needPay': this.search.needPay,
        'date': this.search.date,
        'location': this.search.location,
        'company': this.search.company,
        'paymentMonth': this.search.paymentMonth,
        'type': this.search.type,
        'kind': this.search.kind,
        'invoiceNo': this.search.invoiceNo,
        'sum': this.search.sum,
        'description': this.search.description
      }
      reimbursementApi.queryPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data.page
        this.totalReimbursementSum = res.data.totalReimbursementSum
        this.needReimbursementSum = res.data.needReimbursementSum
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
        this.searchDialog = false
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
      } else if (row.location === 'Wuhan') {
        return '武汉'
      } else if (row.location === 'Nanjing') {
        return '南京'
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
      } else if (row.company === 'Shenyanghailuorencaifuwu') {
        return '沈阳海罗人才服务有限公司'
      }
    },
    // 是否报销转换器
    needPayFormatter (row) {
      if (row.needPay === 'YES') {
        return '是'
      } else if (row.needPay === 'NO') {
        return '否'
      } else if (row.needPay === 'BANK') {
        return '银行'
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
      if (row.kind === 'Parking') {
        return '停车费'
      } else if (row.kind === 'InternalAirTicket') {
        return '国内机票'
      } else if (row.kind === 'InternalTrainTicket') {
        return '国内高铁/火车'
      } else if (row.kind === 'TaxiSubway') {
        return '出租车/地铁/其他市内交通'
      } else if (row.kind === 'DriveTheFare') {
        return '自驾车费'
      } else if (row.kind === 'NationalAirTicket') {
        return '国际机票'
      } else if (row.kind === 'TravelHotel') {
        return '差旅住宿费'
      } else if (row.kind === 'TravelMeal') {
        return '差旅餐饭'
      } else if (row.kind === 'Communication') {
        return '通讯费'
      } else if (row.kind === 'OfficeRent') {
        return '办公室租金'
      } else if (row.kind === 'ITFee') {
        return 'IT费用'
      } else if (row.kind === 'Training') {
        return '培训费'
      } else if (row.kind === 'Print') {
        return '打印费'
      } else if (row.kind === 'Tool') {
        return '文具费'
      } else if (row.kind === 'Postage') {
        return '快递费'
      } else if (row.kind === 'Drug') {
        return '药品'
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
      } else if (row.kind === 'InsuranceAndHousefund') {
        return '五险一金'
      } else if (row.kind === 'Insurance') {
        return '各类保险'
      } else if (row.kind === 'Tax') {
        return '各类税收'
      } else if (row.kind === 'Other') {
        return '其他'
      }
    },
    // 处理行选择变更
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 选中项审批通过
    approveSelection () {
      if (this.multipleSelection.size === 0) {
        this.$message({
          message: '请先选择要审批的记录！',
          type: 'info',
          showClose: true
        })
      } else {
        this.$confirm('确认要审批通过选中项吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          reimbursementApi.approveSelection(this.multipleSelection).then(res => {
            if (res.status === 200) {
              // 刷新列表
              this.query()
              this.$message({
                message: '审批成功！',
                type: 'success',
                showClose: true
              })
            }
          })
        })
      }
    },
    // 清空查询条件
    clearQueryCondition () {
      this.search = {}
      window.localStorage['reimbursementItemList.search'] = {}
    },
    // 下载报销项
    downloadReimbursementItem () {
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'userName': this.search.userName,
        'approveStatus': this.search.approveStatus,
        'needPay': this.search.needPay,
        'date': this.search.date,
        'location': this.search.location,
        'company': this.search.company,
        'paymentMonth': this.search.paymentMonth,
        'type': this.search.type,
        'kind': this.search.kind,
        'invoiceNo': this.search.invoiceNo,
        'sum': this.search.sum,
        'description': this.search.description
      }
      reimbursementApi.downloadReimbursementItem(query).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '下载成功！',
            type: 'success',
            showClose: true
          })
        }
      })
    },
    // 类别变更事件
    typeChange (value) {
      this.search.kind = ''
      if (value === 'Transportation') {
        this.currentKindList = commonJS.transportationKindList
      } else if (value === 'Travel') {
        this.currentKindList = commonJS.travelKindList
      } else if (value === 'Communication') {
        this.currentKindList = commonJS.communicationKindList
      } else if (value === 'Office') {
        this.currentKindList = commonJS.officeKindList
      } else if (value === 'Service') {
        this.currentKindList = commonJS.serviceKindList
      } else if (value === 'Recruit') {
        this.currentKindList = commonJS.recruitKindList
      } else if (value === 'Other') {
        this.currentKindList = commonJS.otherKindList
      }
    }
  },
  created () {
    // 通过入参获取查询数据
    if (typeof (this.$route.query.mode) !== 'undefined' && this.$route.query.mode === 'query') {
      let params = this.$route.query.row
      this.search.userName = params.userName
      this.search.currentPage = 1
      this.search.pageSize = 10
      this.search.approveStatus = 'Approved'
      this.search.needPay = 'YES'
      this.search.paymentMonth = params.paymentMonth
      this.query()
    }
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
