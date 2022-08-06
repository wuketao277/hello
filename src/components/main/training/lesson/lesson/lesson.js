import trainingApi from '@/api/training'
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
      signInStatus: false, // 签到状态
      finishStatus: false, // 课程完成状态
      mode: 'add', // 默认操作模式为新建
      form: {
        id: null,
        lessonName: '',
        lessonContent: '',
        teacherId: null,
        teacherUserName: '',
        teacherRealName: ''
      },
      rules: {
        lessonName: [
          {
            required: true,
            message: '课程名称必填',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '课程名称长度不能大于200个字符',
            trigger: 'blur'
          }
        ]
      },
      lessonQuestionForm: {
        id: null,
        lessonId: null,
        lessonName: null,
        lessonQuestionContent: null
      },
      table: {
        content: [],
        totalElements: 0,
        pageable: {
          pageNumber: 1,
          pageSize: 10
        }
      },
      page: {
        pageSizes: [10, 20, 30, 40, 50]
      },
      currentRow: null,
      showUploadFileDialog: false, // 上传文件对话框
      uploadFileData: null, // 上传文件附加数据
      uploadFiles: [] // 上传文件集合
    }
  },
  methods: {
    // 签到
    signIn () {
      let params = {
        'lessonId': this.form.id
      }
      trainingApi.signInForLessonStudyRecord(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '操作失败，请联系管理员！'
          })
          return
        }
        // 签到后重新查询
        this.queryLessonStudyRecord()
      })
    },
    // 点击完成
    finishStudy () {
      let params = {
        'lessonId': this.form.id
      }
      trainingApi.finishForLessonStudyRecord(params).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '操作失败，请联系管理员！'
          })
          return
        }
        // 完成后重新查询
        this.queryLessonStudyRecord()
      })
    },
    // 查询课程学习记录
    queryLessonStudyRecord () {
      if (this.form.id !== null) {
        let params = {
          'lessonId': this.form.id
        }
        // 查询签到状态
        trainingApi.isSignInForLessonStudyRecord(params).then(res => {
          if (res.status !== 200) {
            this.$message.error({
              message: '查询失败，请联系管理员！'
            })
            return
          }
          this.signInStatus = res.data
        })
        // 查询完成状态
        trainingApi.isFinishForLessonStudyRecord(params).then(res => {
          if (res.status !== 200) {
            this.$message.error({
              message: '查询失败，请联系管理员！'
            })
            return
          }
          this.finishStatus = res.data
        })
      }
    },
    // 检查是否选择了一条记录
    checkSelectRow () {
      if (this.currentRow === null) {
        this.$message({
          message: '请选择一条记录！',
          type: 'info',
          showClose: true
        })
        return false
      }
      return true
    },
    // 通过id删除课程问题
    deleteLessonQuestionById () {
      if (this.checkSelectRow()) {
        trainingApi.deleteLessonQuestionById(this.currentRow.id).then(res => {
          if (res.status !== 200) {
            this.$message.error({
              message: '查询失败，请联系管理员！'
            })
            return
          }
          // 获取最新数据
          this.queryLessonQuestionList()
        })
      }
    },
    // 查询课程问题列表
    queryLessonQuestionList () {
      let query = {
        'currentPage': this.table.pageable.pageNumber,
        'pageSize': this.table.pageable.pageSize,
        'lessonId': this.form.id
      }
      trainingApi.queryLessonQuestionByPage(query).then(res => {
        if (res.status !== 200) {
          this.$message.error({
            message: '查询失败，请联系管理员！'
          })
          return
        }
        this.table = res.data
        this.table.pageable.pageNumber = this.table.pageable.pageNumber + 1
      })
    },
    // 行变化
    rowChange (val) {
      this.currentRow = val
    },
    // 页尺寸变化
    sizeChange (val) {
      this.table.pageable.pageSize = val
      this.query()
    },
    // 当前页变化
    currentChange (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 上一页 点击
    prevClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 下一页 点击
    nextClick (val) {
      this.table.pageable.pageNumber = val
      this.query()
    },
    // 保存课程问题
    saveLessonQuestion () {
      if (this.checkId()) {
        // 检查内容是否填写
        if (this.lessonQuestionForm.lessonQuestionContent === '' || this.lessonQuestionForm.lessonQuestionContent === null) {
          this.$message({
            message: '请填写问题内容',
            type: 'warning',
            showClose: true
          })
          return
        }
        // 同步课程信息
        this.lessonQuestionForm.lessonId = this.form.id
        this.lessonQuestionForm.lessonName = this.form.lessonName
        // 调用接口，保存数据
        trainingApi.saveLessonQuestion(this.lessonQuestionForm).then(
          res => {
            if (res.status === 200) {
              // 将从服务端获取的id赋值给前端显示
              this.lessonQuestionForm.id = res.data.id
              this.$message({
                message: '保存成功！',
                type: 'success',
                showClose: true
              })
              // 获取最新数据
              this.queryLessonQuestionList()
            } else {
              this.$message({
                message: '有错误，请检查！',
                type: 'warning',
                showClose: true
              })
            }
          })
      }
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.client
      } else {
        this.form.id = null
        this.form.lessonName = ''
        this.form.lessonContent = ''
        this.form.teacherId = null
        this.form.teacherUserName = ''
        this.form.teacherRealName = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          trainingApi.saveLesson(this.form).then(
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
                this.$message({
                  message: '有错误，请检查！',
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
    // 检查id
    checkId () {
      if (typeof (this.form.id) !== 'undefined' && this.form.id !== null) {
        return true
      } else {
        this.$message({
          message: '请先保存课程信息',
          type: 'warning'
        })
        return false
      }
    },
    // 打开上次文件对话框
    openUploadFileDialog () {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存课程信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.uploadFileData = {'tableId': this.form.id, 'tableName': 'client'}
        this.showUploadFileDialog = true
      }
    },
    // 查询上传文件集合
    queryUploadFiles () {
      if (this.form.id !== null) {
        let params = {'relativeTableId': this.form.id, 'relativeTableName': 'client'}
        uploadFileApi.findByRelativeTableIdAndRelativeTableName(params).then(res => {
          if (res.status === 200) {
            this.uploadFiles = res.data
          }
        })
      }
    }
  },
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      if (typeof (this.$route.query.lesson) !== 'undefined') {
        this.form = this.$route.query.lesson
        // 查询上传文件
        this.queryUploadFiles()
        this.queryLessonQuestionList()
      } else if (typeof (this.$route.query.id) !== 'undefined') {
        trainingApi.queryLessonById(this.$route.query.id).then(res => {
          if (res.status === 200) {
            this.form = res.data
            // 查询上传文件
            this.queryUploadFiles()
            this.queryLessonQuestionList()
          }
        })
      }
      if (this.mode === 'study') {
        // 如果是学习模式，需要查询课程学习状态
        this.queryLessonStudyRecord()
      }
    }
  }
}
