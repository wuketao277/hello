import clientlinkmanApi from '@/api/clientlinkman'

export default {
  data () {
    return {
      hrList: [],
      hrListBackup: [],
      currentRow: null,
      search: ''
    }
  },
  methods: {
    // 搜索内容变更
    searchChange (v) {
      this.hrList = []
      for (let m in this.hrListBackup) {
        let hr = this.hrListBackup[m]
        if (hr['clientName'].indexOf(v) !== -1 || hr['chineseName'].indexOf(v) !== -1 ||
          hr['englishName'].indexOf(v) !== -1) {
          this.hrList.push(hr)
        }
      }
    },
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.sureDialog()
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
    query () {
      clientlinkmanApi.queryAll().then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.hrList = res.data
        this.hrListBackup = res.data
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
