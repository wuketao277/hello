import commonJS from '@/common/common'
import bigEventApi from '@/api/bigEvent'
import bigEvent from '@/api/bigEvent'

export default {
  data () {
    return {
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: 1,
          pageSize: 10
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJS.getStorageContent('bigEventList.search'),
      fileList: []
    }
  },
  methods: {
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
    // 新增任务
    add () {
      this.$router.push({
        path: '/background.html/bigEvent/bigEventInfo'
      })
    },
    // 修改任务
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/bigEvent/bigEventInfo',
          query: {
            mode: 'modify',
            bigEvent: this.currentRow
          }
        })
      }
    },
    // 查看任务
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/bigEvent/bigEventInfo',
          query: {
            mode: 'view',
            bigEvent: this.currentRow
          }
        })
      }
    },
    // 删除
    delete () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除该记录吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃'
        })
          .then(() => {
            bigEventApi.deleteById(this.currentRow.id).then(res => {
              if (res.status !== 200) {
                this.$message.error({
                  message: '删除失败，请联系管理员！'
                })
              } else {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true,
                  duration: 800
                })
                this.query()
              }
            })
          })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['bigEventList.search'] = this.search
      window.localStorage['bigEventList.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['bigEventList.pageSize'] = this.table.pageable.pageSize
      this.searchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      bigEventApi.query(query).then(res => {
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
    // 处理选中行时间
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handlePreview () { },
    handleRemove () { },
    beforeRemove () { },
    sizeChange (val) {
      this.table.pageable.pageSize = val
      this.query()
    },
    currentChange (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    prevClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    nextClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    switchSearchDialog () { },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.query()
    },
    // 清空查询条件
    clearQueryCondition () {
      this.search = {}
      window.localStorage['bigEventList.search'] = {}
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
