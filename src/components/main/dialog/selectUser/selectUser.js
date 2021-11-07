import userApi from '@/api/user'

export default {
  data () {
    return {
      userList: [],
      currentRow: null,
      search: ''
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
    // 查询后台数据
    query () {
      let query = {
        'search': this.search
      }
      userApi.query(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.userList = res.data
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
      this.search = ''
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.query()
      this.search = ''
    },
    // 点击“取消”按钮，触发自定义事件
    cancelDialog () {
      this.$emit('cancel-dialog')
    },
    // 点击“确定”按钮，触发自定义事件
    sureDialog () {
      if (this.checkSelectRow()) {
        this.$emit('sure-dialog', this.currentRow)
      }
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
