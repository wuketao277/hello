import caseApi from '@/api/case'

export default {
  data () {
    return {
      caseList: [],
      currentRow: null,
      status: 'ALL'
    }
  },
  methods: {
    // 表格双击处理
    handleRowDblClick (row, column, event) {
      this.sureDialog()
    },
    // 处理选中行事件
    handleCurrentChange (val) {
      this.currentRow = val
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
      caseApi.queryAllCaseAttention2().then(res => {
        this.caseList = res.data
      })
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
