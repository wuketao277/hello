import userApi from '@/api/user'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        realName: '',
        userName: '',
        password: '',
        salarybase: '',
        coverbase: false,
        enabled: false
      },
      rules: {}
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
        this.form.realname = ''
        this.form.username = ''
        this.form.password = ''
        this.form.salarybase = ''
        this.form.coverbase = false
        this.form.enabled = false
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          userApi.save(this.form).then(
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
