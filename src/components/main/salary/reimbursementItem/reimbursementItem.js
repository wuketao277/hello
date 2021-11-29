import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import reimbursementApi from '@/api/reimbursement'
import commonJS from '@/common/common'

export default {
  components: {
    'selectUser': selectUser
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        userId: '', // 报销人id
        userName: '', // 报销人登录名
        realName: '', // 报销人真实姓名
        type: '', // 报销类型
        happenDate: '', // 发生日期
        sum: 0, // 报销金额
        description: '', // 说明
        paymentMonth: '', // 报销发放月份
        approveStatus: 'applied' // 审批状态
      },
      selectUserDialogShow: false,
      approveStatusList: [{'id': 'applied', 'name': '申请状态'}, {'id': 'approved', 'name': '审批通过'}, {'id': 'denied', 'name': '审批否决'}],
      typeList: [{'id': 'phone', 'name': '电话费'}, {'id': 'transport', 'name': '交通费'}, {'id': 'eat', 'name': '餐饮费'}, {'id': 'other', 'name': '其他'}]
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'approveStatus' || key === 'paymentMonth') {
        return commonJS.hasRole('admin')
      }
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.reimbursementItem
      } else {
        this.form.id = null
        this.form.userId = '' // 报销人id
        this.form.userName = '' // 报销人登录名
        this.form.realName = '' // 报销人真实姓名
        this.form.type = '' // 报销类型
        this.form.happenDate = '' // 发生日期
        this.form.sum = 0 // 报销金额
        this.form.description = '' // 说明
        this.paymentMonth = '' // 报销发放月份
        this.status = '' // 状态
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          reimbursementApi.save(this.form).then(
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
    },
    // 打开“选择报销人”对话框
    openSelectUserDialog () {
      this.selectUserDialogShow = true
    },
    // “选择报销人”对话框返回
    sureSelectUserDialog (val) {
      // 首先关闭对话框
      this.selectUserDialogShow = false
      this.form.userId = val.id
      this.form.userName = val.username
      this.form.realName = val.realname
    }
  },
  computed: {
    formatSum: function () {
      if (this.form.sum !== '') {
        return this.form.sum / 1000 + 'k'
      }
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.reimbursementItem) !== 'undefined') {
        this.form = this.$route.query.reimbursementItem
      }
    }
  }
}