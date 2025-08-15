import successfulPermApi from '@/api/successfulPerm'
import clientApi from '@/api/client'
import userApi from '@/api/user'
import commonJS from '@/common/common'
import configApi from '@/api/config'
import clientlinkmanApi from '@/api/clientlinkman'

export default {
  data () {
    return {
      // 显示搜索结果
      showSearchResult: false,
      table: {
        loading: true,
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('successfulPermList.pageNumber'),
          pageSize: commonJS.getPageSize('successfulPermList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300, 1000, 10000]
      },
      currentRow: null,
      searchDialog: false,
      clients: [],
      hrs: [],
      consultants: [],
      bds: [],
      cws: [],
      leaders: [],
      approveStatusList: [{
        'id': 'applied',
        'name': '申请状态'
      }, {
        'id': 'approved',
        'name': '审批通过'
      }, {
        'id': 'denied',
        'name': '审批否决'
      }],
      search: commonJS.getStorageContentObject('successfulPermList.search'),
      billingSum: null,
      gpSum: null,
      billingAvg: null,
      gpAvg: null,
      typeList: [],
      roles: [],
      jobType: ''
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
          let params = {
            'id': this.currentRow.id
          }
          successfulPermApi.deleteById(params).then(res => {
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
      this.$router.push('/background.html/case/successfulPerm')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/case/successfulPerm',
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
          path: '/background.html/case/successfulPerm',
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
      // 显示加载中
      this.table.loading = true
      // 调用接口获取数据
      successfulPermApi.queryPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        // 显示加载中
        this.table.loading = false
        this.table = res.data
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
      })
      successfulPermApi.queryStatistics(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.billingSum = res.data.billingSum
        this.gpSum = res.data.gpSum
        this.billingAvg = res.data.billingAvg
        this.gpAvg = res.data.gpAvg
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
      this.search = {
        nonPayment: false,
        nonPaymentDue: false,
        nonPaymentDueExcludeYiQi: false,
        nonOnboard: false,
        guaranteePeriod: false,
        nonInvoice: false,
        invoicedAndNonPay: false
      }
      // 将分页改到10条/页
      this.table.pageable.pageSize = 10
      window.localStorage['successfulPermList.search'] = this.search
    },
    // 下载成功case
    downloadSuccessfulCase () {
      successfulPermApi.downloadSuccessfulCase().then(res => {
        if (res.status === 200) {
          this.$message({
            message: '下载成功！',
            type: 'success',
            showClose: true,
            duration: 800
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
    // 获取所有“客户”信息
    clientApi.findAllOrderByChineseName().then(res => {
      if (res.status === 200) {
        this.clients = res.data
        this.clients.push({
          'chineseName': '理想-集团'
        })
        this.clients.push({
          'chineseName': '宝马-集团'
        })
        this.clients.push({
          'chineseName': '一汽-集团'
        })
        this.clients.push({
          'chineseName': '沃尔沃-集团'
        })
      }
    })
    userApi.findAll().then(res => {
      if (res.status === 200) {
        this.consultants = res.data
        this.cws = res.data
        this.bds = res.data
        this.leaders = res.data
      }
    })
    clientlinkmanApi.queryAllForSimple().then(res => {
      if (res.status === 200) {
        this.hrs = res.data
      }
    })
    // 查询成功case类型列表
    configApi.findAllByCategory({
      category: 'SuccessfulCaseType'
    }).then(res => {
      if (res.status === 200) {
        this.typeList = res.data
      }
    })
    this.query()
  }
}
