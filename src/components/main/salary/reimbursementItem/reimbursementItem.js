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
        description: '' // 备注
      },
      selectUserDialogShow: false,
      approveStatusList: [{
        code: 'Apply',
        name: 'Apply'
      }, {
        code: 'Approved',
        name: 'Approved'
      }, {
        code: 'Denied',
        name: 'Denied'}],
      typeList: [{
        code: 'Transportation',
        name: '交通'
      }, {
        code: 'Travel',
        name: '差旅'
      }, {
        code: 'Communication',
        name: '通讯'
      }, {
        code: 'Office',
        name: '办公'
      }, {
        code: 'Service',
        name: '服务'
      }, {
        code: 'Recruit',
        name: '招聘'
      }, {
        code: 'Other',
        name: '其他'
      }],
      transportationKindList: [{code: 'InternalAirTicket', name: '国内机票'},
        {code: 'InternalTrainTicket', name: '国内高铁/火车'},
        {code: 'TaxiSubway', name: '出租车/地铁/其他市内交通'}],
      travelKindList: [{code: 'TravelHotel', name: '差旅住宿费'},
        {code: 'TravelMeal', name: '差旅餐饭'}],
      communicationKindList: [{code: 'Communication', name: '通讯费'}],
      officeKindList: [{code: 'Training', name: '培训费'}, {code: 'Print', name: '打印费'},
        {code: 'Tool', name: '文具费'}, {code: 'Postage', name: '快递费'}],
      serviceKindList: [{code: 'Candidate', name: '候选人招待费'}, {code: 'Client', name: '客户招待费'},
        {code: 'Employee', name: '员工内部招待费'}, {code: 'Consultant', name: '外包员工招待费'},
        {code: 'BodyCheck', name: '体检费'}],
      recruitKindList: [{code: 'Recruit', name: '招聘费'}],
      otherKindList: [{code: 'Other', name: '其他'}],
      currentKindList: [],
      locationList: [{code: 'Shanghai', name: '上海'},
        {code: 'Beijing', name: '北京'},
        {code: 'Shenyang', name: '沈阳'},
        {code: 'Enshi', name: '恩施'}],
      companyList: [{code: 'Shanghaihailuorencaifuwu', name: '上海海罗人才服务有限公司'},
        {code: 'Shanghaihailuorencaikeji', name: '上海海罗人才科技有限公司'},
        {code: 'Shenyanghailuorencaifuwu', name: '沈阳海罗人才服务有限公司'}],
      yesOrNoList: commonJS.yesOrNoList
    }
  },
  methods: {
    // 显示控制
    showControl (key) {
      if (key === 'approveStatus' || key === 'paymentMonth' || key === 'needPay') {
        return commonJS.isAdmin()
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
    },
    // 类别变更事件
    typeChange (value) {
      this.form.kind = ''
      if (value === 'Transportation') {
        this.currentKindList = this.transportationKindList
      } else if (value === 'Travel') {
        this.currentKindList = this.travelKindList
      } else if (value === 'Communication') {
        this.currentKindList = this.communicationKindList
      } else if (value === 'Office') {
        this.currentKindList = this.officeKindList
      } else if (value === 'Service') {
        this.currentKindList = this.serviceKindList
      } else if (value === 'Recruit') {
        this.currentKindList = this.recruitKindList
      } else if (value === 'Other') {
        this.currentKindList = this.otherKindList
      }
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
        debugger
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
