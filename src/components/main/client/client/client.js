import clientApi from '@/api/client'

export default {
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        chineseName: '',
        englishName: ''
      },
      rules: {
        chineseName: [
          {
            required: true,
            message: '中文名必填',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '中文名长度不能大于200个字符',
            trigger: 'blur'
          }
        ],
        englishName: [{
          max: 200,
          message: '英文名长度不能大于200个字符',
          trigger: 'blur'
        }]
      },
      // 联系人表格
      clientLinkManTable: [],
      // 联系人表格 当前行
      clientLinkManTableCurRow: null
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
        this.form.chineseName = ''
        this.form.englishName = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          clientApi.save(this.form).then(
            res => {
              debugger
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
    },
    // 联系人表格行变化
    rowChange (val) {
      this.clientLinkManTableCurRow = val
    },
    // 添加联系人
    addLinkMan () {
      this.$router.push({
        path: '/client/clientlinkman',
        query: {
          mode: 'add',
          clientid: this.form.id
        }
      })
    },
    // 修改联系人
    modifyLinkMan () {
      this.$router.push({
        path: '/client/clientlinkman',
        query: {
          mode: 'modify',
          clientlinkman: this.clientLinkManTableCurRow
        }
      })
    },
    // 查看联系人
    detailLinkMan () {
      this.$router.push({
        path: '/client/clientlinkman',
        query: {
          mode: 'detail',
          clientlinkman: this.clientLinkManTableCurRow
        }
      })
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      this.form = this.$route.query.client
    }
  }
}
