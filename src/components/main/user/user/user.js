import userApi from '@/api/user'
import commonJs from '@/common/common'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        company: '',
        realName: '',
        userName: '',
        password: '',
        jobType: 'FULLTIME',
        salarybase: 0,
        coverbase: false,
        enabled: false,
        checkKPI: true,
        roles: [],
        remainHolidayThing: 0,
        remainHolidayIll: 0
      },
      roleList: ['ADMIN', 'AM', 'RECRUITER', 'BD', 'ADMIN_COMPANY'],
      rules: {},
      // 工资卡银行
      banks: commonJs.banks,
      // 性别
      genders: commonJs.genders,
      companyList: commonJs.companyList
    }
  },
  methods: {
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.user
      } else {
        this.form.id = ''
        this.form.company = ''
        this.form.realname = ''
        this.form.username = ''
        this.form.password = ''
        this.form.jobType = 'FULLTIME'
        this.form.salarybase = 0
        this.form.coverbase = false
        this.form.enabled = false
        this.form.checkKPI = true
        this.form.roles = []
        this.form.remainHolidayThing = 0
        this.form.remainHolidayIll = 0
      }
    },
    // 保存
    save () {
      if (this.form.salarybase === '' || this.form.salarybase === null) {
        this.$message({
          message: '底薪不能为空！',
          type: 'warning',
          showClose: true
        })
        return
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          userApi.saveBaseInfo(this.form).then(
            res => {
              if (res.status === 200) {
                // 将从服务端获取的id赋值给前端显示
                this.form.id = res.data.id
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  showClose: true
                })
              }
            })
        } else {
          // 如果检查不通过就给出提示
          this.$message({
            message: '有错误，请检查！',
            type: 'warning',
            showClose: true
          })
        }
      })
    }
  },
  computed: {
    formatSalarybase: function () {
      if (this.form.salarybase !== '') {
        return this.form.salarybase / 1000 + 'k'
      }
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      this.form = this.$route.query.user
    }
  }
}
