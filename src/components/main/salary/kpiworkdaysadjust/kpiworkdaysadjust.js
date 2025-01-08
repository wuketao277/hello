import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import kpiworkdaysadjustApi from '@/api/kpiworkdaysadjust'

export default {
  components: {
    'selectUser': selectUser
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        adjustDays: null,
        adjustDate: null,
        userName: null,
        remark: null
      },
      selectUserDialogShow: false
    }
  },
  methods: {
    // 显示控制
    showControl (key) { },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.kpiworkdaysadjust
      } else {
        this.form.id = null
        this.form.adjustDays = null
        this.form.adjustDate = null
        this.form.userName = null
        this.form.remark = null
      }
    },
    // 保存
    save () {
      if (this.form.userName === '' || this.form.userName === null) {
        this.$message({
          message: '用户必选！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.form.adjustDate === '' || this.form.adjustDate === null) {
        this.$message({
          message: '调整日期必选！',
          type: 'warning',
          showClose: true
        })
        return
      }
      if (this.form.adjustDays === '' || this.form.adjustDays === null) {
        this.$message({
          message: '调整天数必选！',
          type: 'warning',
          showClose: true
        })
        return
      }
      // 如果校验通过就调用后端接口
      kpiworkdaysadjustApi.save(this.form).then(
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
          } else {
            this.$message.error('保存失败！')
          }
        })
    },
    // 打开“选择用户”对话框
    openSelectUserDialog () {
      this.selectUserDialogShow = true
    },
    // “选择用户”对话框返回
    sureSelectUserDialog (val) {
      // 首先关闭对话框
      this.selectUserDialogShow = false
      this.form.userName = val.username
    }
  },
  computed: {},
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.kpiworkdaysadjust) !== 'undefined') {
        this.form = this.$route.query.kpiworkdaysadjust
      }
    }
  }
}
