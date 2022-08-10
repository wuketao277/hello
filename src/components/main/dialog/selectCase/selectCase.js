import caseApi from '@/api/case'

export default {
  data () {
    return {
      showSearchDialog: false,
      caseList: [],
      currentRow: null,
      search: '',
      status: 'DOING'
    }
  },
  methods: {
    // 获取状态名称
    getStatusName (row, column) {
      if (row.status === 'PREPARE') {
        return '准备'
      } else if (row.status === 'DOING') {
        return '进行中'
      } else if (row.status === 'FINISH') {
        return '完成'
      } else if (row.status === 'PAUSE') {
        return '暂停'
      } else if (row.status === 'CLOSE') {
        return '关闭'
      } else {
        return ''
      }
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
    // 查询后台数据
    query (showDialog = false) {
      if (this.search.length === 0) {
        this.$message({
          message: '请输入搜索条件！',
          type: 'warning',
          showClose: true
        })
        return
      }
      let query = {
        'search': this.search,
        'status': this.status
      }
      caseApi.query(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.caseList = res.data
        if (showDialog) {
          this.$message({
            message: '查询完成！',
            type: 'success',
            showClose: true
          })
        }
      })
    },
    // 处理选中行时间
    handleCurrentChange (val) {
      this.currentRow = val
    },
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
    // 搜索对话框，取消按钮
    cancelSearchDialog () {
      this.showSearchDialog = false
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.showSearchDialog = false
      this.query()
    },
    // 点击“取消”按钮，触发自定义事件
    cancelDialog () {
      this.search = ''
      this.$emit('cancel-dialog')
    },
    // 点击“确定”按钮，触发自定义事件
    sureDialog () {
      this.search = ''
      if (this.checkSelectRow()) {
        this.$emit('sure-dialog', this.currentRow)
      }
    }
  },
  computed: {},
  created () {
    // this.query()
  }
}
