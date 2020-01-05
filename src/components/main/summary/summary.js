export default {
  data () {
    return {
      calendar: new Date()
    }
  },
  methods: {
    openView (path) {
      this.$router.push({
        path: path,
        query: {}
      })
    }
  }
}
