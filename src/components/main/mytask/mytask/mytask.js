import myTaskApi from '@/api/myTask'
import userApi from '@/api/user'

export default {
  data () {
    return {
      isIndeterminate: true,
      mode: 'add', // 默认操作模式为新建
      saved: false, // 界面的数据是否保存过
      selectUsers: [], // 任务执行人集合
      users: [],
      form: {
        id: null,
        taskTitle: '',
        taskContent: '',
        executeDate: '',
        executeUserName: '',
        executeRealName: '',
        finished: false,
        executeResult: ''
      },
      rules: {
        taskTitle: [
          {
            required: true,
            message: '任务标题必填',
            trigger: 'blur'
          },
          {
            max: 100,
            message: '任务标题长度不能大于100个字符',
            trigger: 'blur'
          }
        ],
        taskContent: [
          {
            required: true,
            message: '任务内容必填',
            trigger: 'blur'
          },
          {
            max: 2000,
            message: '任务内容长度不能大于2000个字符',
            trigger: 'blur'
          }
        ],
        executeDate: [{
          required: true,
          message: '执行日期必填',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 处理全选事件
    handleCheckAllChange (val) {
      this.selectUsers = val ? this.users : []
      this.isIndeterminate = false
    },
    // 取消
    cancel () {
      if (typeof (this.$route.query.mode) !== 'undefined') {
        this.mode = this.$route.query.mode
        this.form = this.$route.query.task
      } else {
        this.form.id = null
        this.form.taskTitle = ''
        this.form.executeDate = ''
        this.form.taskContent = ''
      }
    },
    // 保存
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.selectUsers.length === 0) {
            this.$message({
              message: '请选择任务执行人！',
              type: 'warning',
              showClose: true
            })
            return
          }
          // 如果校验通过就调用后端接口
          for (let index in this.selectUsers) {
            let task = JSON.parse(JSON.stringify(this.form))
            task.executeUserName = this.selectUsers[index]['username']
            task.executeRealName = this.selectUsers[index]['realname']
            myTaskApi.save(task).then(
              res => {
                if (res.status === 200) {
                  this.$message({
                    message: '保存成功！',
                    type: 'success',
                    showClose: true
                  })
                }
              })
          }
          // 修改保证状态标志
          this.saved = true
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
    // 更新
    update () {
      if (this.form.executeResult === '') {
        this.$message({
          message: '请输入执行结果！',
          type: 'warning',
          showClose: true
        })
        return
      }
      let task = {'id': this.form.id, 'finished': this.form.finished, 'executeResult': this.form.executeResult}
      myTaskApi.update(task).then(
        res => {
          if (res.status === 200) {
            this.$message({
              message: '保存成功！',
              type: 'success',
              showClose: true
            })
          }
        })
    }
  },
  computed: {},
  created () {
    // 通过入参获取当前操作模式
    if (typeof (this.$route.query.mode) !== 'undefined') {
      // 接收list传入的参数
      this.mode = this.$route.query.mode
      this.form = this.$route.query.task
    }
    userApi.findAllEnabled().then(res => {
      if (res.status === 200) {
        this.users = res.data
      }
    })
  }
}
