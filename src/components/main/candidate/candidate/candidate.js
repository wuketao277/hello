import candidateApi from '@/api/candidate'
import commentApi from '@/api/comment'
import myTaskApi from '@/api/myTask'
import uploadFileApi from '@/api/uploadFile'
import uploadFile from '@/components/main/dialog/uploadFile/uploadFile.vue'
import downloadFile from '@/components/main/dialog/downloadFile/downloadFile.vue'

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
        date: '',
        chineseName: '',
        englishName: '',
        age: 0,
        phoneNo: '',
        email: '',
        companyName: '',
        department: '',
        title: '',
        schoolName: '',
        currentAddress: '',
        futureAddress: '',
        currentMoney: '',
        futureMoney: '',
        remark: ''
      },
      phaseOptions: [
        {value: 'list', lable: 'list'},
        {value: '猎聘', lable: '猎聘'},
        {value: '智联', lable: '智联'},
        {value: '其他', lable: '其他'}
      ],
      // 新评论
      newComment: {
        phase: 'list',
        content: ''
      },
      // 历史评论
      comments: [],
      rules: {
        chineseName: [
          {
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
      },
      // 任务集合
      tasks: [],
      // 新任务
      newTask: {
        executeDate: null,
        taskTitle: '',
        taskContent: '',
        relativeCandidateId: null
      },
      rulesTask: {
        executeDateTime: {
          required: true,
          message: '执行时间必填',
          trigger: 'blur'
        },
        taskTitle: [{
          required: true,
          message: '任务标题必填',
          trigger: 'blur'
        },
        {
          max: 200,
          message: '任务标题长度不能大于200个字符',
          trigger: 'blur'
        }],
        taskContent: [{
          required: true,
          message: '任务内容必填',
          trigger: 'blur'
        },
        {
          max: 2000,
          message: '任务内容长度不能大于2000个字符',
          trigger: 'blur'
        }]
      },
      showUploadFileDialog: false, // 上传文件对话框
      uploadFileData: null, // 上传文件附加数据
      uploadFiles: [] // 上传文件集合
    }
  },
  methods: {
    // 保存 新评论
    saveComment () {
      if (this.newComment.content.length !== 0) {
        // 组装数据
        let comment = this.newComment
        comment['candidateId'] = this.form.id
        // 调用接口
        commentApi.save(comment).then(res => {
          if (res.status === 200) {
            // 保存成功
            this.$message({
              message: '保存成功！',
              type: 'success',
              showClose: true
            })
            // 重新查询全部评论
            this.queryComment()
          } else {
            this.$message({
              message: '保存异常，请联系管理员！',
              type: 'warning',
              showClose: true
            })
          }
        })
      } else {
        this.$message({
          message: '请填写评论内容',
          type: 'warning',
          showClose: true
        })
      }
    },
    // 查询所有评论
    queryComment () {
      if (this.form.id !== null) {
        commentApi.findAllByCandidateId({
          'candidateId': this.form.id
        }).then(res => {
          if (res.status === 200) {
            this.comments = res.data
          }
        })
      }
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.candidate
      } else {
        this.form.id = ''
        this.form.date = ''
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
        this.form.remark = ''
      }
    },
    // 保存新闻
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          candidateApi.save(this.form).then(
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
    // 查询当前候选人相关的任务
    queryTask () {
      if (this.form.id !== null) {
        myTaskApi.findByRelativeCandidateId(this.form.id).then(res => {
          if (res.status === 200) {
            this.tasks = res.data
          }
        })
      }
    },
    // 保存任务
    saveTask () {
      this.newTask.relativeCandidateId = this.form.id
      myTaskApi.saveTaskToSelf(this.newTask).then(
        res => {
          if (res.status === 200) {
            // 重新获取任务列表
            this.queryTask()
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
        this.uploadFileData = {'tableId': this.form.id, 'tableName': 'candidate'}
        this.showUploadFileDialog = true
      }
    },
    // 查询上传文件集合
    queryUploadFiles () {
      if (this.form.id !== null) {
        let params = {'relativeTableId': this.form.id, 'relativeTableName': 'candidate'}
        uploadFileApi.findByRelativeTableIdAndRelativeTableName(params).then(res => {
          if (res.status === 200) {
            this.uploadFiles = res.data
          }
        })
      }
    },
    queryOthers () {
      // 查询comment
      this.queryComment()
      // 查询任务
      this.queryTask()
      // 查询上传文件
      this.queryUploadFiles()
    }
  },
  computed: {},
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      // 获取候选人数据
      // 如果没有候选人对象，就获取候选人id然后从数据库中查询候选人对象
      if (typeof (this.$route.query.candidate) === 'undefined') {
        let params = {
          'id': this.$route.query.candidateId
        }
        candidateApi.findById(params).then(
          res => {
            if (res.status === 200) {
              this.form = res.data
              this.queryOthers()
            }
          })
      } else {
        this.form = this.$route.query.candidate
        this.queryOthers()
      }
    }
  }
}
