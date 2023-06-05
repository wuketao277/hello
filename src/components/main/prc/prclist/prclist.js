import prcApi from '@/api/prc'
import commonJS from '@/common/common'
import userApi from '@/api/user'

export default {
  data () {
    return {
      table: {
        loading: true,
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('prclist.pageNumber'),
          pageSize: commonJS.getPageSize('prclist.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      search: commonJS.getStorageContent('prclist.search'),
      fileList: [],
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 通过id删除
    deleteById () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除PRC ' + this.currentRow.chineseName + ' 吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          prcApi.deleteById(this.currentRow.id).then(res => {
            if (res.status === 200) {
              if (res.data.length > 0) {
                this.$message.error(res.data)
              } else {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true
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
    // 添加PRC
    addPRC () {
      this.$router.push({
        path: '/prc/prc'
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
    // 查看PRC
    detailPRC () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/prc/prc',
          query: {
            mode: 'detail',
            prc: this.currentRow
          }
        })
      }
    },
    // 修改PRC
    modifyPRC () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/prc/prc',
          query: {
            mode: 'modify',
            prc: this.currentRow
          }
        })
      }
    },
    // 删除PRC
    deletePRC () {
      if (this.checkSelectRow()) {
        this.$confirm('确认要删除该记录吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃'
        })
          .then(() => {
            prcApi.deleteById(this.currentRow.id).then(res => {
              if (res.status !== 200) {
                this.$message.error({
                  message: '删除失败，请联系管理员！'
                })
              } else {
                this.$message({
                  message: '删除成功！',
                  type: 'success',
                  showClose: true
                })
                this.query()
              }
            })
          })
      }
    },
    // 查询后台数据
    query () {
      window.localStorage['prclist.search'] = this.search
      window.localStorage['prclist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['prclist.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      // 显示加载中
      this.table.loading = true
      prcApi.queryPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        // 隐藏加载中
        this.table.loading = false
        this.table = res.data
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
        this.$message({
          type: 'success',
          message: '查询完成！'
        })
      })
    },
    // 处理选中行
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 处理选中行
    handleCurrentChangeFromComment (val) {
      this.currentRow = val
    },
    uploadFileSuccess (response, file, fileList) {
      if (response.flag) {
        this.$message({
          message: '文件' + file.name + '上传成功',
          type: 'success',
          showClose: true
        })
      } else {
        this.$message({
          message: response.msg,
          type: 'error',
          showClose: true,
          duration: 0
        })
      }
      // 刷新列表
      this.query()
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
    // 按照条件搜索
    searchPRC () {
      this.table.pageable.pageNumber = 1
      this.query()
    }
  },
  computed: {},
  created () {
    // 获取当前用户的角色列表
    userApi.findSelf().then(res => {
      if (res.status === 200) {
        this.roles = res.data.roles
        this.jobType = res.data.jobType
      }
    })
    this.query()
  }
}
