export default {
  data () {
    return {
      search: {
        show: false,
        chinesename: '',
        englishname: ''
      },
      clientlist: [{
        chinesename: '宝马中国',
        englishname: 'MBW china',
        address: '北京'
      }, {
        chinesename: '华晨宝马',
        englishname: 'HuaChen MBW',
        address: '北京'
      }, {
        chinesename: '捷豹路虎',
        englishname: 'JLR',
        address: '上海'
      }, {
        chinesename: '沃尔沃',
        englishname: 'VOLVO',
        address: '上海'
      }]
    }
  },
  methods: {
    switchSearch () {
      if (this.$data.search.show) {
        this.$data.search.show = false
      } else {
        this.$data.search.show = true
      }
    },
    addClient () {
      this.$router.push('/client/addclient')
    }
  }
}
