import myTaskApi from '@/api/myTask'
import userApi from '@/api/user'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      selectUsers: [], // 任务执行人集合
      users: [],
      form: {
        id: null,
        taskTitle: '',
        executeDate: '',
        taskContent: '',
        executeUserName: '',
        executeRealName: ''
      },
      rules: {
        taskTitle: [
          {
            required: true,
            message: '任务标题必填',
            trigger: 'blur'
          },
          {
            max: 100,
            message: '任务标题长度不能大于100个字符',
            trigger: 'blur'
          }
        ],
        taskContent: [
          {
            required: true,
            message: '任务内容必填',
            trigger: 'blur'
          },
          {
            max: 2000,
            message: '任务内容长度不能大于2000个字符',
            trigger: 'blur'
          }
        ]
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
        this.form.taskTitle = ''
        this.form.executeDate = ''
        this.form.taskContent = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          myTaskApi.save(this.form).then(
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
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      this.form = this.$route.query.task
    }
    userApi.findAllEnabled().then(res => {
      if (res.status === 200) {
        this.users = res.data
      }
    })
  }
}
