import caseApi from '@/api/case'
import clientApi from '@/api/client'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        clientId: '',
        title: '',
        status: '',
        description: ''
      },
      rules: {
        clientId: [{
          required: true,
          message: '客户必填',
          trigger: 'blur'
        }],
        title: [
          {
            required: true,
            message: '职位名称必填',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '职位名称长度不能大于200个字符',
            trigger: 'blur'
          }
        ],
        status: [{
          required: true,
          message: '职位状态必填',
          trigger: 'blur'
        }]
      },
      clients: []
    }
  },
  methods: {
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.client
      } else {
        this.form.id = ''
        this.form.clientId = ''
        this.form.clientName = ''
        this.form.title = ''
        this.form.status = ''
        this.form.description = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          caseApi.save(this.form).then(
            res => {
              if (res.status === 200) {
                // 将从服务端获取的id赋值给前端显示
                this.form.id = res.data.id
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  showClose: true
                })
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
      this.form = this.$route.query.case
    }
    clientApi.findAll().then(res => {
      if (res.status === 200) {
        this.clients = res.data
      }
    })
  }
}
