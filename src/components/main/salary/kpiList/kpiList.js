import kpiApi from '@/api/kpi'
import commonJs from '@/common/common'
import userApi from '@/api/user'

export default {
  data() {
    return {
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJs.getPageNumber('kpiList.pageNumber'),
          pageSize: commonJs.getPageSize('kpiList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300, 1000, 10000]
      },
      currentRow: null,
      roles: [],
      search: null
    }
  },
  methods: {
    // 显示控制
    showControl(val) {
      return false
    },
    formatDate(row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined' && cellvalue !== null && cellvalue !== '') {
        return cellvalue.substr(0, 10)
      }
      return ''
    },
    // 检查是否选择了一条记录
    checkSelectRow() {
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
    // 双击
    dblclick() {
      if (commonJs.isAdminInArray(this.roles)) {
        this.modify()
      } else {
        this.detail()
      }
    },
    // 新增
    add() {
      this.$router.push('/background.html/salary/kpiworkdaysadjust')
    },
    // 修改
    modify() {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/salary/kpiworkdaysadjust',
          query: {
            mode: 'modify',
            kpiworkdaysadjust: this.currentRow
          }
        })
      }
    },
    // 查看
    detail() {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/salary/kpiworkdaysadjust',
          query: {
            mode: 'detail',
            kpiworkdaysadjust: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query() {
      window.localStorage['kpiList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['kpiList.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      kpiApi.queryKPIVOPage(query).then(res => {
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
    rowChange(val) {
      this.currentRow = val
    },
    // 页尺寸变化
    sizeChange(val) {
      this.table.pageable.pageSize = val
      this.query()
    },
    // 当前页变化
    currentChange(val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 上一页 点击
    prevClick(val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 下一页 点击
    nextClick(val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 搜索对话框，确定按钮
    sureSearchDialog() {
      this.table.pageable.pageNumber = 1
      this.table.pageable.pageSize = 10
      this.query()
    },
    formatBoolean(row) {
      if (row.checkKPI) {
        return '考核'
      }
      return '不考核'
    }
  },
  created() {
    // 获取当前用户的角色列表
    userApi.findSelf().then(res => {
      if (res.status === 200) {
        this.roles = res.data.roles
      }
    })
    this.query()
  }
}
