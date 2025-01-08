import commentApi from '@/api/comment'
import commonJS from '@/common/common'
import userApi from '@/api/user'
import clientApi from '@/api/client'

export default {
  data () {
    return {
      table: {
        loading: true,
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: commonJS.getPageNumber('interviewlist.pageNumber'),
          pageSize: commonJS.getPageSize('interviewlist.pageSize')
        }
      },
      page: {
        pageSizes: [10, 30, 50, 100, 300]
      },
      currentRow: null,
      searchDialog: false,
      search: commonJS.getStorageContentObject('interviewlist.search'),
      roles: [],
      jobType: '',
      clientList: [],
      phaseOptions: commonJS.phaseOptions
    }
  },
  methods: {
    // 编辑职位
    editCase (index, row) {
      this.$router.push({
        path: '/background.html/case/case',
        query: {
          mode: 'modify',
          caseId: row.caseId
        }
      })
    },
    // 编辑客户
    editClient (index, row) {
      this.$router.push({
        path: '/background.html/client/client',
        query: {
          mode: 'modify',
          clientId: row.clientId
        }
      })
    },
    // 编辑候选人
    editCandidate (index, row) {
      this.$router.push({
        path: '/background.html/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    // 格式化时间
    formatTime (row, column, cellvalue, index) {
      return commonJS.formatTime(cellvalue)
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
      window.localStorage['interviewlist.search'] = JSON.stringify(typeof (this.search) === 'undefined' ? {} : this.search)
      window.localStorage['interviewlist.pageNumber'] = this.table.pageable.pageNumber
      window.localStorage['interviewlist.pageSize'] = this.table.pageable.pageSize
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'search': this.search
      }
      // 显示加载中
      this.table.loading = true
      commentApi.queryInterviewPage(query).then(res => {
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
          message: '查询完成！',
          duration: 800
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
          showClose: true,
          duration: 800
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
    switchSearchDialog () {
      this.$refs['search'].focus()
    },
    // 清空查询条件
    clearQueryCondition () {
      this.search = {}
      window.localStorage['interviewList.search'] = {}
    },
    // 搜索确认按钮
    sureSearchDialog () {
      this.searchDialog = false
      this.query()
    },
    // 下载按钮点击事件
    download () { }
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
    clientApi.findAll().then(res => {
      if (res.status === 200) {
        this.clientList = res.data
        this.clientList.push({
          'chineseName': '理想-集团'
        })
        this.clientList.push({
          'chineseName': '宝马-集团'
        })
        this.clientList.push({
          'chineseName': '一汽-集团'
        })
        this.clientList.push({
          'chineseName': '沃尔沃-集团'
        })
      }
    })
  }
}
