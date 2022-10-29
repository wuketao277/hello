import salarySpecialItemApi from '@/api/salarySpecialItem'
import commonJS from '@/common/common'

export default {
  data () {
    return {
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('salarySpecialItemList.pageNumber'),
          pageSize: commonJS.getPageSize('salarySpecialItemList.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJS.getSearchContent('salarySpecialItemList.search')
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
    // 显示控制
    showControl (key) {
      if (key === 'add' || key === 'edit' || key === 'search' || key === 'delete') {
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
      this.$router.push('/salary/salarySpecialItem')
    },
    // 修改
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/salary/salarySpecialItem',
          query: {
            mode: 'modify',
            salarySpecialItem: this.currentRow
          }
        })
      }
    },
    // 删除选中记录
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除工资特殊项吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          salarySpecialItemApi.deleteById(this.currentRow.id).then(
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
          path: '/salary/salarySpecialItem',
          query: {
            mode: 'detail',
            salarySpecialItem: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['salarySpecialItemList.search'] = this.search
      window.localStorage['salarySpecialItemList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['salarySpecialItemList.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      salarySpecialItemApi.queryPage(query).then(res => {
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
    this.query()
  }
}
