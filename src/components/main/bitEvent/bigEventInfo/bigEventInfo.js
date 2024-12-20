import bigEventApi from '@/api/bigEvent'

export default {
  data () {
    return {
      isIndeterminate: true,
      mode: 'add', // 默认操作模式为新建
      saved: false, // 界面的数据是否保存过
      selectUsers: [], // 任务执行人集合
      users: [],
      form: {
        id: null,
        title: '',
        detail: '',
        createDateTime: null,
        createUserName: null
      },
      rules: {
      }
    }
  },
  methods: {
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.task
      } else {
        this.form.id = null
        this.form.title = ''
        this.form.detail = ''
        this.form.createDateTime = null
        this.form.createUserName = null
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          bigEventApi.save(this.form).then(
            res => {
              if (res.status === 200) {
                this.form = res.data
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
    },
  },
  computed: {},
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      this.form = this.$route.query.bigEvent
    }
  }
}
