import roleApi from '@/api/role'

export default {
  data () {
    return {
      table: {
        content: [],
        pageable: {
          pageNumber: 1,
          pageSize: 10
        }
      },
      page: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      currentRow: null,
      search: '',
      showSearchDialog: false
    }
  },
  methods: {
    // 添加角色
    addRole () {
      this.$router.push({
        path: '/role/role'
      })
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
    // 查看角色
    detailRole () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/role/role',
          query: {
            mode: 'detail',
            role: this.currentRow
          }
        })
      }
    },
    // 修改角色
    modifyRole () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/role/role',
          query: {
            mode: 'modify',
            role: this.currentRow
          }
        })
      }
    },
    // 删除角色
    deleteRole () {
      if (this.checkSelectRow()) {
        // 将从服务端删除id对应的角色
        let params = {
          'id': this.currentRow.id
        }
        roleApi.deleteRole(params).then(
          res => {
            if (res.status === 200 && res.data === true) {
              this.$message({
                message: '删除成功！',
                type: 'success',
                showClose: true
              })
              // 刷新页面
              this.query()
            } else {
              this.$message.error('删除失败！')
            }
          })
      }
    },
    switchSearchDialog () {
      this.showSearchDialog = !this.showSearchDialog
    },
    // 查询后台数据
    query () {
      this.showSearchDialog = false
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      roleApi.queryRolePage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data
      })
    },
    // 取消搜索
    cancelSearchDialog () {
      this.showSearchDialog = false
    },
    // 处理选中行时间
    handleCurrentChange (val) {
      this.currentRow = val
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
