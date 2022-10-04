import caseApi from '@/api/case'
import clientApi from '@/api/client'
import commonJS from '@/common/common'
import candidateForCaseApi from '@/api/candidateForCase'
import selectCase from '@/components/main/dialog/selectCase/selectCase.vue'
import selectCandidate from '@/components/main/dialog/selectCandidate/selectCandidate.vue'
import selectUser from '@/components/main/dialog/selectUser/selectUser.vue'
import uploadFileApi from '@/api/uploadFile'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'

export default {
  components: {
    'selectCandidate': selectCandidate,
    'selectCase': selectCase,
    'uploadFile': uploadFile,
    'downloadFile': downloadFile,
    'selectUser': selectUser
  },
  data () {
    return {
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        clientId: '',
        title: '',
        level: '',
        department: '',
        lineManager: '',
        subordinates: '',
        english: '',
        age: '',
        experience: '',
        school: '',
        status: 'PREPARE',
        description: '',
        location: '',
        salaryScope: '',
        cwUserName: ''
      },
      attention: false,
      rules: {
        clientId: [{
          required: true,
          message: '客户必填',
          trigger: 'blur'
        }],
        title: [
          {
            required: true,
            message: '职位名称必填',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '职位名称长度不能大于200个字符',
            trigger: 'blur'
          }
        ],
        status: [{
          required: true,
          message: '职位状态必填',
          trigger: 'blur'
        }],
        level: [{
          max: 50,
          message: '职级长度不能大于25',
          trigger: 'blur'
        }],
        department: [{
          max: 50,
          message: '部门长度不能大于25',
          trigger: 'blur'
        }],
        lineManager: [{
          max: 50,
          message: '汇报对象长度不能大于25',
          trigger: 'blur'
        }],
        subordinates: [{
          max: 50,
          message: '是否带人长度不能大于25',
          trigger: 'blur'
        }],
        english: [{
          max: 50,
          message: '英语要求长度不能大于25',
          trigger: 'blur'
        }],
        age: [{
          max: 50,
          message: '年龄要求长度不能大于25',
          trigger: 'blur'
        }],
        school: [{
          max: 50,
          message: '学历要求长度不能大于25',
          trigger: 'blur'
        }],
        experience: [{
          max: 50,
          message: '经验要求长度不能大于25',
          trigger: 'blur'
        }],
        location: [{
          max: 200,
          message: '工作地点长度不能大于100',
          trigger: 'blur'
        }]
      },
      clients: [],
      // 职位候选人集合
      candidateForCaseList: [],
      // 当前选中职位对应候选人
      curCandidateForCase: null,
      // 选择候选人对话框是否显示
      selectCandidateDialogShow: false,
      // 选择职位对话框是否显示
      selectCaseDialogShow: false,
      showUploadFileDialog: false, // 上传文件对话框
      uploadFileData: null, // 上传文件附加数据
      uploadFiles: [], // 上传文件集合
      selectCWDialogShow: false
    }
  },
  methods: {
    openSelectCWDialog () {
      this.selectCWDialogShow = true
    },
    // 显示控制
    showControl (key) {
      if (key === 'deleteRecommend') {
        return commonJS.isAdmin()
      }
      // 没有特殊要求的不需要角色
      return true
    },
    // 是否关注
    isAttention (row) {
      return row.attention
    },
    // 更新候选人职位关注信息
    updateCandidateForCaseAttention (row, attention) {
      let params = {
        id: row.id,
        attention: attention
      }
      candidateForCaseApi.updateAttention(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '系统异常，请联系管理员！'
          })
        } else {
          this.$message({
            message: '更新成功！',
            type: 'success',
            showClose: true
          })
          // 刷新推荐列表
          this.queryCandidateForCaseList()
        }
      })
    },
    // 更新关注列表
    updateCaseAttention () {
      let params = {
        attention: this.attention,
        caseId: this.form.id
      }
      caseApi.updateCaseAttention(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '系统异常，请联系管理员！'
          })
        } else {
          this.$message({
            message: '更新成功！',
            type: 'success',
            showClose: true
          })
        }
      })
    },
    // 编辑候选人
    editCandidate (index, row) {
      this.$router.push({
        path: '/candidate/candidate',
        query: {
          mode: 'modify',
          candidateId: row.candidateId
        }
      })
    },
    // 删除推荐
    deleteRecommend (index, row) {
      this.$confirm('确认要删除推荐吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          candidateForCaseApi.deleteById(row.id).then(res => {
            if (res.status !== 200) {
              this.$message.error({
                message: '删除失败，请联系管理员！'
              })
            } else {
              this.$message({
                message: '删除成功！',
                type: 'success',
                showClose: true
              })
              this.queryCandidateForCaseList()
            }
          })
        })
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        if (typeof (this.$route.query.case) !== 'undefined') {
          this.form = this.$route.query.case
        }
      } else {
        this.form.id = ''
        this.form.clientId = ''
        this.form.clientName = ''
        this.form.title = ''
        this.form.level = ''
        this.form.department = ''
        this.form.lineManager = ''
        this.form.subordinates = ''
        this.form.english = ''
        this.form.age = ''
        this.form.experience = ''
        this.form.school = ''
        this.form.status = ''
        this.form.description = ''
        this.form.salaryScope = ''
        this.form.location = ''
        this.form.cwUserName = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          caseApi.save(this.form).then(
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
    // 为Case添加候选人
    addCandidateForCase () {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存职位信息！',
          type: 'warning',
          showClose: true
        })
      }
    },
    // 职位候选人变化
    rowChange (val) {
      this.curCandidateForCase = val
    },
    // “选择候选人”对话框返回
    sureSelectCandidateDialog (val) {
      // 首先关闭对话框
      this.selectCandidateDialogShow = false
      // 然后变量当前所有候选人id，判断新选中的候选人是否已经在当前职位的后续人列表中
      let include = false
      for (let index in this.candidateForCaseList) {
        if (this.candidateForCaseList[index].candidateId === val.id) {
          include = true
          break
        }
      }
      if (include) {
        // 如果选中的候选人重复，就给出提示
        this.$message({
          message: '该候选人已在该职位上！',
          type: 'warning',
          showClose: true
        })
      } else {
        // 添加候选人到职位
        let candidate = {'candidateId': val.id, 'caseId': this.form.id, 'clientId': this.form.clientId, 'title': this.form.title}
        candidateForCaseApi.save(candidate).then(res => {
          if (res.status === 200) {
            // 获取该职位所有候选人信息
            candidateForCaseApi.findByCaseId(this.form.id).then(res => {
              if (res.status === 200) {
                this.candidateForCaseList = res.data
              }
            })
          }
        })
      }
    },
    // “选择职位”对话框返回
    sureSelectCaseDialog (val) {
      // 首先关闭对话框
      this.selectCaseDialogShow = false
      // 添加候选人到职位
      let o = {'curCaseId': this.form.id, 'oldCaseId': val.id}
      candidateForCaseApi.copyFromOldCase(o).then(res => {
        if (res.status === 200) {
          // 获取该职位所有候选人信息
          candidateForCaseApi.findByCaseId(this.form.id).then(res => {
            if (res.status === 200) {
              this.candidateForCase = res.data
            }
          })
        }
      })
    },
    // 打开选择候选人对话框
    openSelectCandidateDialog () {
      if (this.form.id === null) {
        this.$message({
          message: '请先保存职位信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.selectCandidateDialogShow = true
      }
    },
    // 打开选择职位对话框
    openSelectCaseDialog () {
      if (this.form.id === null) {
        this.$message({
          message: '请先保存职位信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.selectCaseDialogShow = true
      }
    },
    // 打开上次文件对话框
    openUploadFileDialog () {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存职位信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.uploadFileData = {'tableId': this.form.id, 'tableName': 'case'}
        this.showUploadFileDialog = true
      }
    },
    // 查询上传文件集合
    queryUploadFiles () {
      if (this.form.id !== null) {
        let params = {'relativeTableId': this.form.id, 'relativeTableName': 'case'}
        uploadFileApi.findByRelativeTableIdAndRelativeTableName(params).then(res => {
          if (res.status === 200) {
            this.uploadFiles = res.data
          }
        })
      }
    },
    // 查询推荐候选人列表
    queryCandidateForCaseList () {
      // 获取该职位所有候选人信息
      if (this.form.id !== null) {
        candidateForCaseApi.findByCaseId(this.form.id).then(res => {
          if (res.status === 200) {
            this.candidateForCaseList = res.data
          }
        })
      }
    },
    // 查询其他数据
    queryOthers () {
      // 查询推荐候选人列表
      this.queryCandidateForCaseList()
    },
    // 查询职位关注情况
    queryCaseAttentionByCaseId () {
      if (this.form.id !== null) {
        caseApi.queryCaseAttentionByCaseId(this.form.id).then(res => {
          if (res.status === 200) {
            this.attention = res.data
          }
        })
      }
    },
    // “选择CW”对话框返回
    sureSelectCWDialog (val) {
      // 首先关闭对话框
      this.selectCWDialogShow = false
      this.form.cwUserName = val.username
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.case) !== 'undefined') {
        this.form = this.$route.query.case
        this.queryOthers()
        this.queryCaseAttentionByCaseId()
      } else if (typeof (this.$route.query.caseId) !== 'undefined') {
        let params = {
          'id': this.$route.query.caseId
        }
        caseApi.queryById(params).then(res => {
          if (res.status === 200) {
            this.form = res.data
            this.queryOthers()
            this.queryCaseAttentionByCaseId()
          }
        })
      }
    }
    // 获取所有“客户”信息
    clientApi.findAll().then(res => {
      if (res.status === 200) {
        this.clients = res.data
      }
    })
    // 查询上传文件
    this.queryUploadFiles()
  }
}
