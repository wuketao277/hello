import userApi from '@/api/user'
import commonJs from '@/common/common'

export default {
  data () {
    return {
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJs.getPageNumber('userlist.pageNumber'),
          pageSize: commonJs.getPageSize('userlist.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJs.getStorageContent('userlist.search'),
      fileList: []
    }
  },
  methods: {
    // 日期格式化
    formatDate (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined' && cellvalue !== null && cellvalue !== '') {
        return cellvalue.substr(0, 10)
      }
      return ''
    },
    // 添加用户
    add () {
      this.$router.push({
        path: '/background.html/user/user'
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
    // 查看用户
    detail () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/user/user',
          query: {
            mode: 'detail',
            user: this.currentRow
          }
        })
      }
    },
    // 修改用户
    modify () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/background.html/user/user',
          query: {
            mode: 'modify',
            user: this.currentRow
          }
        })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['userlist.search'] = this.search
      window.localStorage['userlist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['userlist.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      userApi.queryPage(query).then(res => {
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
    uploadFileSuccess (response, file, fileList) {
      if (response.flag) {
        this.$message({
          message: '文件' + file.name + '上传成功',
          type: 'success',
          showClose: true
        })
        // 刷新列表
        this.query()
      } else {
        this.$message({
          message: response.msg,
          showClose: true
        })
      }
    },
    handlePreview () {},
    handleRemove () {},
    beforeRemove () {},
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
    switchSearchDialog () {
      this.$refs['search'].focus()
    },
    // 搜索对话框，确定按钮
    sureSearchDialog () {
      this.table.pageable.pageNumber = 1
      this.table.pageable.pageSize = 10
      this.query()
      this.search = ''
    }
  },
  computed: {},
  created () {
    this.query()
  }
}
