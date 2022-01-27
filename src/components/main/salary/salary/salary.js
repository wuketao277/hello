import salaryApi from '@/api/salary'

export default {
  data () {
    return {
      mode: 'detail', // 默认操作模式为查看
      form: {
        id: '',
        consultantUserName: '',
        consultantRealName: '',
        month: '',
        historyDebt: '',
        sum: '',
        personalTax: '',
        insurance: '',
        gongjijin: '',
        description: ''
      }
    }
  },
  methods: {
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.salary
      } else {
        this.form.id = ''
        this.form.consultantUserName = ''
        this.form.consultantRealName = ''
        this.form.month = ''
        this.form.historyDebt = ''
        this.form.sum = ''
        this.form.personalTax = ''
        this.form.insurance = ''
        this.form.gongjijin = ''
        this.form.description = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          salaryApi.update(this.form).then(
            res => {
              if (res.status === 200) {
                debugger
                // 将从服务端获取的id赋值给前端显示
                if (res.data) {
                  this.$message({
                    message: '保存成功！',
                    type: 'success',
                    showClose: true
                  })
                } else {
                  this.$message.error('保存失败！')
                }
              } else {
                this.$message.error('保存失败！')
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
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.salary) !== 'undefined') {
        this.form = this.$route.query.salary
      }
    }
  }
}
