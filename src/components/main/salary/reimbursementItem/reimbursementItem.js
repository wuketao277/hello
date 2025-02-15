import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import reimbursementApi from '@/api/reimbursement'
import commonJS from '@/common/common'
import userApi from '@/api/user'

export default {
  components: {
    'selectUser': selectUser
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null, // 序号
        userId: '', // 报销人id
        userName: '', // 报销人登录名
        realName: '', // 报销人真实姓名
        approveStatus: 'Apply', // 审批状态
        needPay: 'NO', // 是否报销
        date: '', // 发生日期
        location: '', // 发生地点
        company: '', // 报销公司
        paymentMonth: '', // 报销发放月份
        type: '', // 报销类别
        kind: '', // 报销项目
        invoiceNo: '', // 发票号
        price: 0, // 单价
        count: 0, // 数量
        sum: 0, // 总金额
        description: '', // 备注
        createUser: '',
        createTime: ''
      },
      selectUserDialogShow: false,
      approveStatusList: commonJS.approveStatusList,
      typeList: commonJS.typeList,
      currentKindList: [],
      locationList: commonJS.locationList,
      companyList: commonJS.companyList,
      yesOrNoList: commonJS.yesOrNoList,
      reimbursementNeedPay: commonJS.reimbursementNeedPay,
      roles: [],
      jobType: ''
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'approveStatus' || key === 'paymentMonth' || key === 'needPay') {
        return commonJS.isAdminInArray(this.roles)
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
        this.form.approveStatus = 'Apply' // 审批状态
        this.form.needPay = 'NO' // 是否报销
        this.form.invoiceNo = '' // 发票号
        this.form.paymentMonth = '' // 报销发放月份
        this.form.date = '' // 发生日期
        this.form.location = '' // 发生地点
        this.form.company = '' // 报销公司
        this.form.type = '' // 报销类型
        this.form.kind = '' // 报销项目
        this.form.price = 0 // 单价
        this.form.sum = 0 // 报销金额
        this.form.count = 0 // 数量
        this.form.description = '' // 说明
        this.form.createUser = ''
        this.form.createTime = ''
      }
    },
    // 保存
    save () {
      if (this.form.userId === '' || this.form.userId === null) {
        this.$message.error('NAME 必选')
        return
      }
      if (this.form.date === '' || this.form.date === null) {
        this.$message.error('DATE 必选')
        return
      }
      if (this.form.location === '' || this.form.location === null) {
        this.$message.error('LOCATION 必选')
        return
      }
      if (this.form.companyCode === '' || this.form.location === null) {
        this.$message.error('COMPANY 必选')
        return
      }
      if (this.form.paymentMonth === '') {
        this.$message.error('MONTH 必选')
        return
      }
      if (this.form.type === '' || this.form.type === null) {
        this.$message.error('TYPE 必选')
        return
      }
      if (this.form.kind === '' || this.form.kind === null) {
        this.$message.error('KIND 必选')
        return
      }
      if (this.form.invoiceNo === '') {
        this.$message.error('INVOICE NO 必选')
        return
      }
      if (this.form.price === null || isNaN(this.form.price)) {
        this.$message.error('PRICE 必选，且必须是数字')
        return
      }
      if (this.form.count === null || isNaN(this.form.count)) {
        this.$message.error('COUNT 必选，且必须是数字')
        return
      }
      if (this.form.sum === null || isNaN(this.form.sum)) {
        this.$message.error('SUM 必选，且必须是数字')
        return
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          reimbursementApi.save(this.form).then(
            res => {
              if (res.status === 200) {
                // 将从服务端获取的id赋值给前端显示
                this.form = res.data
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
    },
    // 类别变更事件
    typeChange (value) {
      this.form.kind = ''
      if (value === 'Transportation') {
        this.currentKindList = commonJS.transportationKindList
      } else if (value === 'Travel') {
        this.currentKindList = commonJS.travelKindList
      } else if (value === 'Communication') {
        this.currentKindList = commonJS.communicationKindList
      } else if (value === 'Office') {
        this.currentKindList = commonJS.officeKindList
      } else if (value === 'Service') {
        this.currentKindList = commonJS.serviceKindList
      } else if (value === 'Recruit') {
        this.currentKindList = commonJS.recruitKindList
      } else if (value === 'Other') {
        this.currentKindList = commonJS.otherKindList
      }
    },
    // 格式化时间到字符串
    timeStrFormate1 (d) {
      return commonJS.timeStrFormate1(d)
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
    // 获取当前用户的角色列表
    userApi.findSelf().then(res => {
      if (res.status === 200) {
        this.roles = res.data.roles
        this.jobType = res.data.jobType
      }
    })
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.reimbursementItem) !== 'undefined') {
        // 先准备数据
        this.typeChange(this.$route.query.reimbursementItem.type)
        // 在给表单赋值
        this.form = this.$route.query.reimbursementItem
      }
    }
    if (this.mode === 'add') {
      let user = commonJS.getUser()
      this.form.userId = user.id
      this.form.userName = user.userName
      this.form.realName = user.realName
    }
  }
}
