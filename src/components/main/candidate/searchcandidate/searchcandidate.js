import candidate from '@/api/candidate'
import commonJS from '@/common/common'
import userApi from '@/api/user'

export default {
  data () {
    return {
      searchDialog: false, // 搜索对话框
      table: {
        loading: false,
        content: []
      },
      currentRow: null,
      search: {
        keyWords: null,
        gender: null,
        schoolLevel: [],
        ageMin: null,
        ageMax: null,
        farthestPhase: '无',
        specialItem: [],
        userName: null
      },
      // 性别
      genders: commonJS.genders,
      // 用户列表
      userList: null
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
      if (typeof (this.search.keyWords) === 'undefined' || this.search.keyWords === '' || this.search.keyWords === null) {
        this.$message({
          type: 'warning',
          message: '请输入关键字'
        })
        return
      }
      // 关闭搜索对话框
      this.searchDialog = false
      // 保存搜索条件
      window.localStorage['searchcandidate.search'] = JSON.stringify(this.search)
      // 显示加载中
      this.table.loading = true
      candidate.searchCandidateList(this.search).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        // 隐藏加载中
        this.table.loading = false
        this.table.content = res.data
        // 自动将数据保存在本地
        window.localStorage['searchcandidate.data'] = JSON.stringify(this.table.content)
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
    // 清空查询条件
    clearQueryCondition () {
      this.search = {
        'keyWords': null,
        'gender': null,
        'schoolLevel': [],
        'ageMin': null,
        'ageMax': null,
        'farthestPhase': '无'
      }
      window.localStorage['searchcandidate.search'] = JSON.stringify(this.search)
    },
    // 修改候选人
    modifyCandidate () {
      if (this.checkSelectRow()) {
        this.$router.push({
          path: '/candidate/candidate',
          query: {
            mode: 'modify',
            candidate: this.currentRow
          }
        })
      }
    },
    handlePreview () {},
    handleRemove () {},
    beforeRemove () {}
  },
  computed: {},
  created () {
    // 如果本地存储中包含搜索条件，就将本地存储覆盖初始值
    if (typeof (window.localStorage['searchcandidate.search']) !== 'undefined') {
      this.search = commonJS.getStorageContentObject('searchcandidate.search')
    }
    // 如果本地存储中包含搜索结果，就将本地存储覆盖初始值
    if (typeof (window.localStorage['searchcandidate.data']) !== 'undefined') {
      this.table.content = commonJS.getStorageContentObject('searchcandidate.data')
    }
    userApi.findAllEnabled().then(res => {
      if (res.status === 200) {
        this.userList = res.data
      }
    })
  }
}
