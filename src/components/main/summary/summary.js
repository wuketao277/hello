export default {
  data () {
    return {
      calendar: new Date()
    }
  },
  methods: {
    openView (path) {
      debugger
      this.$router.push({
        path: path,
        query: {}
      })
    }
  }
}
