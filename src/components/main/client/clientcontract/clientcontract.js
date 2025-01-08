import clientApi from '@/api/client'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
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
        clientId: null,
        clientChineseName: null,
        clientEnglishName: null,
        category: null,
        effectiveDate: null,
        expireDate: null,
        industry: null,
        type: null,
        feeRate: null,
        guaranteePeriod: null,
        paymentPeriod: null,
        bdId: null,
        bdUserName: null,
        bdRealName: null,
        location: null,
        note: null,
        comments: null,
        forbid: null,
        receiveDate: null,
        containTax: null,
        company: null
      },
      categoryList: ['Perm', 'Contracting'],
      industryList: [{
        code: 'Automotive',
        name: 'Automotive'
      }, {
        code: 'AutoParts',
        name: 'Auto Parts'
      },
      {
        code: 'Internet',
        name: 'Internet'
      }, {
        code: 'Other',
        name: 'Other'
      }
      ],
      typeList: [],
      permTypeList: [{
        code: 'TOB',
        name: 'TOB'
      }, {
        code: 'OneOff',
        name: 'One Off'
      }],
      contractingTypeList: [{
        code: 'MSA',
        name: 'MSA'
      }, {
        code: 'SOW',
        name: 'SOW'
      },
      {
        code: 'PO',
        name: 'PO'
      }, {
        code: 'CO',
        name: 'CO'
      }
      ],
      selectBDDialogShow: false,
      companyList: commonJS.companyList
    }
  },
  methods: {
    // 合同类别变更
    categoryChange () {
      this.form.type = null
      if (this.form.category === 'Perm') {
        this.typeList = this.permTypeList
      } else {
        this.typeList = this.contractingTypeList
      }
    },
    // 打开“选择BD”对话框
    openSelectBDDialog () {
      this.selectBDDialogShow = true
    },
    // “选择BD”对话框返回
    sureSelectBDDialog (val) {
      // 首先关闭对话框
      this.selectBDDialogShow = false
      this.form.bdId = val.id
      this.form.bdUserName = val.username
      this.form.bdRealName = val.realname
    },
    // 取消
    cancel () {
      if (this.$route.query.mode === 'modify' || this.$route.query.mode === 'detail') {
        this.form = this.$route.query.clientContract
      } else {
        this.form.id = null
        this.form.clientId = null
        this.form.clientChineseName = null
        this.form.clientEnglishName = null
        this.form.category = null
        this.form.effectiveDate = null
        this.form.expireDate = null
        this.form.industry = null
        this.form.type = null
        this.form.feeRate = null
        this.form.guaranteePeriod = null
        this.form.paymentPeriod = null
        this.form.bdId = null
        this.form.bdUserName = null
        this.form.bdRealName = null
        this.form.location = null
        this.form.note = null
        this.form.comments = null
        this.form.forbid = null
        this.form.receiveDate = null
        this.form.containTax = null
        this.form.company = null
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          clientApi.saveContract(this.form).then(
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
        this.form.clientChineseName = this.$route.query.clientChineseName
        this.form.clientEnglishName = this.$route.query.clientEnglishName
      } else if (this.$route.query.mode === 'modify' || this.$route.query.mode === 'detail') {
        this.form = this.$route.query.clientContract
      }
    }
  }
}
