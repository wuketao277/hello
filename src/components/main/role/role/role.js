import roleApi from '@/api/role'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称必填', trigger: 'blur' },
          { max: 200, message: '长度不能大于200个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { max: 200, message: '长度不能大于200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 取消角色
    cancel () {
      this.form.id = ''
      this.form.roleName = ''
      this.form.roleDesc = ''
    },
    // 保存角色
    saveRole () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          roleApi.saveRole(this.form).then(
            res => {
              if (res.status === 200) {
                // 将从服务端获取的id赋值给前端显示
                this.form.id = res.data.id
                this.$message({
                  message: '保存成功！',
                  type: 'success',
                  showClose: true,
                  duration: 800
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
      this.form = this.$route.query.role
    }
  }
}
