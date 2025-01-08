import mynews from '@/api/mynews'
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
        title: '',
        link: '',
        content: '',
        priority: '1', // 新闻优先级：1~5
        publish: true // 发布状态
      },
      rules: {
        title: [
          { required: true, message: '标题必填', trigger: 'blur' },
          { max: 200, message: '长度不能大于200个字符', trigger: 'blur' }
        ],
        link: [
          { max: 200, message: '长度不能大于200个字符', trigger: 'blur' }
        ],
        content: [
          { max: 2000, message: '长度不能大于2000个字符', trigger: 'blur' }
        ]
      },
      showUploadFileDialog: false, // 上传文件对话框
      uploadFileData: null, // 上传文件附加数据
      uploadFiles: [] // 上传文件集合
    }
  },
  methods: {
    // 取消新闻
    cancel () {
      this.form.id = ''
      this.form.title = ''
      this.form.link = ''
      this.form.content = ''
      this.form.priority = '1'
      this.form.publish = true
    },
    // 保存新闻
    saveNews () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          mynews.saveNews(this.form).then(
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
    // 打开上传文件对话框
    openUploadFileDialog () {
      if (this.form.id == null) {
        this.$message({
          message: '请先保存新闻信息！',
          type: 'warning',
          showClose: true
        })
      } else {
        this.uploadFileData = { 'tableId': this.form.id, 'tableName': 'mynews' }
        this.showUploadFileDialog = true
      }
    },
    // 查询上传文件集合
    queryUploadFiles () {
      if (this.form.id !== null) {
        let params = { 'relativeTableId': this.form.id, 'relativeTableName': 'mynews' }
        uploadFileApi.findByRelativeTableIdAndRelativeTableName(params).then(res => {
          if (res.status === 200) {
            this.uploadFiles = res.data
          }
        })
      }
    }
  },
  computed: {},
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      this.mode = this.$route.query.mode
      this.form = this.$route.query.news
    }
    // 查询上传文件
    this.queryUploadFiles()
  }
}
