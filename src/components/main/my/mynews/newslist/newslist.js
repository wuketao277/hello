export default {
  data () {
    return {
      newslist: [],
      search: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    addNews () {
      this.$router.push({path: '/my/mynews/news'})
    }
  },
  computed: {}
}
