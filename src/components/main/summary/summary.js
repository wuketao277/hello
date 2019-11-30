export default {
  data () {
    return {
      today: new Date()
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
