import userApi from '@/api/user'

export default {
  data () {
    return {
      unSelected: [],
      selected: []
    }
  },
  methonds: {},
  created () {
    userApi.findAllEnabled().then(res => {
      if (res.status === 200) {
        this.unSelected = res.data
      }
    })
  }
}
