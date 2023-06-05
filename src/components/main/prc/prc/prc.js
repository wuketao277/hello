import candidateApi from '@/api/candidate'
import prcApi from '@/api/prc'
import uploadFileApi from '@/api/uploadFile'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'
import commonJS from '@/common/common'
import userApi from '@/api/user'

export default {
  components: {
    uploadFile,
    downloadFile
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        chineseName: '',
        englishName: '',
        age: 0,
        birthDay: '',
        phoneNo: '',
        email: '',
        companyName: '',
        title: '',
        schoolName: '',
        hometown: '',
        currentAddress: '',
        futureAddress: '',
        currentMoney: '',
        futureMoney: '',
        englishLevel: '',
        remark: ''
      },
      rules: {}, // 表单检查
      // 性别
      genders: commonJS.genders,
      showUploadFileDialog: false, // 上传文件对话框
      uploadFileData: null, // 上传文件附加数据
      uploadFiles: [], // 上传文件集合
      roles: [],
      jobType: '', // 工作类型
      allLabels: [] // 顾问的全部标签
    }
  },
  methods: {
    // 计算候选人年龄
    birthdayChange (val) {
      if (typeof (val) !== 'undefined') {
        candidateApi.calcAge(val).then(res => {
          if (res.status !== 200) {
            this.$message.error({
              message: '系统异常，请联系管理员！'
            })
          } else {
            this.form.age = res.data
          }
        })
      }
    },
    // 格式化时间
    formatTime (row, column, cellvalue, index) {
      return commonJS.formatTime(cellvalue)
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.candidate
      } else {
        this.form.id = ''
        this.form.chineseName = ''
        this.form.englishName = ''
        this.form.age = 0
        this.form.phoneNo = ''
        this.form.email = ''
        this.form.companyName = ''
        this.form.department = ''
        this.form.title = ''
        this.form.schoolName = ''
        this.form.currentAddress = ''
        this.form.futureAddress = ''
        this.form.currentMoney = ''
        this.form.futureMoney = ''
        this.form.englishLevel = ''
        this.form.remark = ''
      }
    },
    // 保存候选人
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 已存在的候选人，直接保存修改。
          prcApi.save(this.form).then(res => {
            if (res.status === 200) {
              // 保存成功
              this.$message({
                message: '保存成功！',
                type: 'success',
                showClose: true
              })
            } else {
              this.$message({
                message: '保存异常，请联系管理员！',
                type: 'warning',
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
    // 打开上传文件对话框
    openUploadFileDialog () {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存候选人信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.uploadFileData = {
          'tableId': this.form.id,
          'tableName': 'candidate'
        }
        this.showUploadFileDialog = true
      }
    },
    // 查询上传文件集合
    queryUploadFiles () {
      if (this.form.id !== null) {
        let params = {
          'relativeTableId': this.form.id,
          'relativeTableName': 'candidate'
        }
        uploadFileApi.findByRelativeTableIdAndRelativeTableName(params).then(res => {
          if (res.status === 200) {
            this.uploadFiles = res.data
          }
        })
      }
    },
    // 通过id删除PRC
    deleteById () {
      this.$confirm('确认要删除PRC ' + this.form.chineseName + ' 吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        prcApi.deleteById(this.form.id).then(res => {
          if (res.status === 200) {
            this.$router.push({
              path: '/prc/prclist'
            })
          } else {
            this.$message.error('删除失败！')
          }
        })
      })
    },
    // 标签变更事件
    handleLabelsChange () {
      this.save()
    }
  },
  computed: {},
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
      // 获取候选人数据
      // 如果没有候选人对象，就获取候选人id然后从数据库中查询候选人对象
      if (typeof (this.$route.query.prc) !== 'undefined') {
        this.form = this.$route.query.prc
      } else if (typeof (this.$route.query.prcId) !== 'undefined') {
        let params = {
          'id': this.$route.query.prcId
        }
        prcApi.findById(params).then(
          res => {
            if (res.status === 200) {
              this.form = res.data
            }
          })
      }
    }
  }
}
