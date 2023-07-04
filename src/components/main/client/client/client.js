import clientApi from '@/api/client'
import clientLinkManApi from '@/api/clientlinkman'
import uploadFileApi from '@/api/uploadFile'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'
import commonJs from '@/common/common'
import userApi from '@/api/user'

export default {
  components: {
    'uploadFile': uploadFile,
    'downloadFile': downloadFile
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        chineseName: '',
        englishName: '',
        address: '',
        information: '',
        recommendationProcess: '',
        duplicateCheck: '',
        resumeStandard: '',
        salaryStructure: '',
        recommendationReason: '',
        interviewPrepare: '',
        sellingPoint: '',
        remark: ''
      },
      rules: {
        chineseName: [{
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
      clientLinkManTableCurRow: null,
      showUploadFileDialog: false, // 上传文件对话框
      uploadFileData: null, // 上传文件附加数据
      uploadFiles: [], // 上传文件集合
      clientContractTable: [], // 客户合同列表
      // 客户合同表格 当前行
      clientContractTableCurRow: null,
      roles: [],
      jobType: '',
      companyList: commonJs.companyList
    }
  },
  methods: {
    // 显示控制
    showControl (url) {
      if (url === 'clientContract') {
        // 客户合同列表，只有Admin，BD角色展示
        return commonJs.isAdminInArray(this.roles) || commonJs.isBDInArray(this.roles)
      }
      return false
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.client
      } else {
        this.form.id = ''
        this.form.chineseName = ''
        this.form.englishName = ''
        this.form.address = ''
        this.form.information = ''
        this.form.recommendationProcess = ''
        this.form.duplicateCheck = ''
        this.form.resumeStandard = ''
        this.form.salaryStructure = ''
        this.form.recommendationReason = ''
        this.form.interviewPrepare = ''
        this.form.sellingPoint = ''
        this.form.rules = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          clientApi.save(this.form).then(
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
    },
    // 联系人表格行变化
    linkManRowChange (val) {
      this.clientLinkManTableCurRow = val
    },
    // 检查id
    checkId () {
      if (typeof (this.form.id) !== 'undefined' && this.form.id !== null) {
        return true
      } else {
        this.$message({
          message: '请先保存客户信息',
          type: 'warning'
        })
        return false
      }
    },
    // 添加联系人
    addLinkMan () {
      if (this.checkId()) {
        this.$router.push({
          path: '/client/clientlinkman',
          query: {
            mode: 'add',
            clientId: this.form.id,
            clientName: this.form.chineseName
          }
        })
      }
    },
    // 联系人列表双击
    handleLinkManDBClick () {
      if (this.jobType === 'FULLTIME' && commonJs.isAdminInArray(this.roles)) {
        // 管理员可以修改
        this.modifyLinkMan()
      } else {
        // 非管理员只读
        this.detailLinkMan()
      }
    },
    // 修改联系人
    modifyLinkMan () {
      if (this.checkId()) {
        this.$router.push({
          path: '/client/clientlinkman',
          query: {
            mode: 'modify',
            clientLinkMan: this.clientLinkManTableCurRow,
            clientName: this.form.chineseName
          }
        })
      }
    },
    // 查看联系人
    detailLinkMan () {
      if (this.checkId()) {
        this.$router.push({
          path: '/client/clientlinkman',
          query: {
            mode: 'detail',
            clientLinkMan: this.clientLinkManTableCurRow,
            clientName: this.form.chineseName
          }
        })
      }
    },
    // 查询联系人信息
    queryLinkMan () {
      let params = {
        'clientId': this.form.id
      }
      clientLinkManApi.queryByClientId(params).then(
        res => {
          if (res.status === 200) {
            this.clientLinkManTable = res.data
          }
        })
    },
    // 打开上次文件对话框
    openUploadFileDialog () {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存客户信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.uploadFileData = {
          'tableId': this.form.id,
          'tableName': 'client'
        }
        this.showUploadFileDialog = true
      }
    },
    // 查询上传文件集合
    queryUploadFiles () {
      if (this.form.id !== null) {
        let params = {
          'relativeTableId': this.form.id,
          'relativeTableName': 'client'
        }
        uploadFileApi.findByRelativeTableIdAndRelativeTableName(params).then(res => {
          if (res.status === 200) {
            this.uploadFiles = res.data
          }
        })
      }
    },
    // 客户合同表格行变化
    clientContractTableRowChange (val) {
      this.clientContractTableCurRow = val
    },
    // 添加客户合同
    addClientContract () {
      if (this.checkId()) {
        this.$router.push({
          path: '/client/clientContract',
          query: {
            mode: 'add',
            clientId: this.form.id,
            clientChineseName: this.form.chineseName,
            clientEnglishName: this.form.englishName
          }
        })
      }
    },
    // 修改客户合同
    modifyClientContract () {
      this.$router.push({
        path: '/client/clientContract',
        query: {
          mode: 'modify',
          clientContract: this.clientContractTableCurRow
        }
      })
    },
    // 查看客户合同
    detailClientContract () {
      this.$router.push({
        path: '/client/clientContract',
        query: {
          mode: 'detail',
          clientContract: this.clientContractTableCurRow
        }
      })
    },
    // 查询客户合同
    queryClientContract () {
      clientApi.findContractByClientId(this.form.id).then(
        res => {
          if (res.status === 200) {
            this.clientContractTable = res.data
          }
        })
    },
    formatDate (row, column, cellvalue, index) {
      if (typeof (cellvalue) !== 'undefined' && cellvalue !== null && cellvalue !== '') {
        return cellvalue.substr(0, 10)
      }
      return ''
    },
    // 公司转换器
    formatCompany (row, column, cellvalue, index) {
      for (let c of this.companyList) {
        if (c.code === cellvalue) {
          return c.name
        }
      }
    },
    // 转换器
    formatContainTax (row, column, cellvalue, index) {
      if (cellvalue) {
        return '含税'
      } else {
        return '未税'
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
      if (typeof (this.$route.query.client) !== 'undefined') {
        this.form = this.$route.query.client
        // 对于非新增操作，需要在创建时查询“联系人”信息
        this.queryLinkMan()
        // 查询上传文件
        this.queryUploadFiles()
        // 查询客户合同
        this.queryClientContract()
      } else if (typeof (this.$route.query.clientId) !== 'undefined') {
        clientApi.queryById(this.$route.query.clientId).then(res => {
          if (res.status === 200) {
            this.form = res.data
            // 对于非新增操作，需要在创建时查询“联系人”信息
            this.queryLinkMan()
            // 查询上传文件
            this.queryUploadFiles()
            // 查询客户合同
            this.queryClientContract()
          }
        })
      }
    }
  }
}
