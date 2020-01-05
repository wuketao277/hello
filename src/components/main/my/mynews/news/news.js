import mynews from '@/api/mynews'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        title: '',
        link: '',
        content: '',
        priority: '1', // 新闻优先级：1~5
        publish: true // 发布状态
      },
      rules: {
        title: [
          {required: true, message: '标题必填', trigger: 'blur'},
          {max: 200, message: '长度不能大于200个字符', trigger: 'blur'}
        ],
        link: [
          {max: 200, message: '长度不能大于200个字符', trigger: 'blur'}
        ],
        content: [
          {max: 2000, message: '长度不能大于2000个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 取消新闻
    cancel () {
      this.form.id = ''
      this.form.title = ''
      this.form.link = ''
      this.form.content = ''
      this.form.priority = '1'
      this.form.publish = true
    },
    // 保存新闻
    saveNews () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          mynews.saveNews(this.form).then(
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
  computed: {},
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      this.mode = this.$route.query.mode
      this.form = this.$route.query.news
    }
  }
}
