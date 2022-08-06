import trainingApi from '@/api/training'

export default {
  data () {
    return {
      mode: 'add',
      form: {
        id: null,
        lessonId: null,
        lessonName: '',
        username: '',
        realname: '',
        signInTime: null,
        finishTime: null,
        hours: null,
        score: null
      }
    }
  },
  methods: {
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 如果校验通过就调用后端接口
          let params = {
            id: this.form.id,
            score: this.form.score
          }
          trainingApi.saveStudyRecordScore(params).then(
            res => {
              if (res.status === 200) {
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
    }
  },
  computed: {},
  created () {
    this.mode = this.$route.query.mode
    this.form = this.$route.query.studyrecord
  }
}
