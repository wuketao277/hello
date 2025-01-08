import clientLinkManApi from '@/api/clientlinkman'
import clientApi from '@/api/client'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        clientId: '',
        clientName: '',
        chineseName: '',
        englishName: '',
        address: '',
        phoneNo: '',
        mobileNo: '',
        email: '',
        comments: ''
      },
      rules: {
        chineseName: [{
          required: true,
          message: '中文名必填',
          trigger: 'blur'
        },
        {
          max: 25,
          message: '中文名长度不能大于25个字符',
          trigger: 'blur'
        }
        ],
        englishName: [{
          max: 100,
          message: '英文名长度不能大于100个字符',
          trigger: 'blur'
        }],
        age: [{
          max: 2,
          message: '年龄不正确',
          trigger: 'blur'
        }],
        phoneNo: [{
          max: 20,
          message: '电话号码长度不能大于20个字符',
          trigger: 'blur'
        }],
        email: [{
          max: 200,
          message: '邮箱长度不能大于200个字符',
          trigger: 'blur'
        }],
        companyName: [{
          max: 200,
          message: '公司名称长度不能大于200个字符',
          trigger: 'blur'
        }],
        department: [{
          max: 200,
          message: '部门名称长度不能大于200个字符',
          trigger: 'blur'
        }],
        title: [{
          max: 200,
          message: '职位名称长度不能大于200个字符',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 取消
    cancel () {
      if (this.$route.query.mode === 'modify' || this.$route.query.mode === 'detail') {
        this.form = this.$route.query.clientLinkMan
      } else {
        this.form.id = ''
        this.form.chineseName = ''
        this.form.englishName = ''
        this.form.address = ''
        this.form.phoneNo = ''
        this.form.mobileNo = ''
        this.form.email = ''
        this.form.comments = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          clientLinkManApi.save(this.form).then(
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
    },
    // 返回客户详情页
    returnClient () {
      let params = {
        id: this.form.clientId
      }
      clientApi.queryById(params).then(
        res => {
          if (res.status === 200) {
            let client = res.data
            this.$router.push({
              path: '/background.html/client/client',
              query: {
                mode: 'modify',
                client: client
              }
            })
          }
        }
      )
    }
  },
  computed: {},
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      this.mode = this.$route.query.mode
      if (this.$route.query.mode === 'add') {
        this.form.clientId = this.$route.query.clientId
        this.form.clientName = this.$route.query.clientName
      } else if (this.$route.query.mode === 'modify' || this.$route.query.mode === 'detail') {
        this.form = this.$route.query.clientLinkMan
        this.form.clientName = this.$route.query.clientName
      }
    }
  }
}
