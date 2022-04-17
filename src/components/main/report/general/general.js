import report from '@/api/report'

export default {
  name: 'hello',
  data () {
    return {
      form: {
        startDate: null,
        endDate: null
      },
      offerDateBilling: 0,
      paymentDateBilling: 0
    }
  },
  mounted () {
    this.calcDate('month')
    this.drawChart()
  },
  methods: {
    // 计算开始日期和结束日期
    calcDate (type) {
      if (type === 'week') {
        let endDate = new Date()
        let startDate = new Date(endDate.getTime() - endDate.getDay() * 24 * 60 * 60 * 1000)
        this.form.startDate = startDate
        this.form.endDate = endDate
      } else if (type === 'month') {
        let endDate = new Date()
        let startDate = new Date(endDate.getTime() - (endDate.getDate() - 1) * 24 * 60 * 60 * 1000)
        this.form.startDate = startDate
        this.form.endDate = endDate
      } else if (type === 'season') {
        let endDate = new Date()
        let monthInt = endDate.getMonth()
        let monthStr = '01'
        if (monthInt > 2 && monthInt <= 5) {
          monthStr = '04'
        } else if (monthInt > 5 && monthInt <= 8) {
          monthStr = '07'
        } else if (monthInt > 8 && monthInt <= 11) {
          monthStr = '09'
        }
        let startDateStr = endDate.getFullYear() + '-' + monthStr + '-01'
        let startDate = new Date(Date.parse(startDateStr, 'yyyy-MM-dd'))
        this.form.startDate = startDate
        this.form.endDate = endDate
      } else if (type === 'year') {
        let endDate = new Date()
        let startDateStr = endDate.getFullYear() + '-01-01'
        let startDate = new Date(Date.parse(startDateStr, 'yyyy-MM-dd'))
        this.form.startDate = startDate
        this.form.endDate = endDate
      }
      // 绘制图表
      this.drawChart()
    },
    // 绘制图表
    drawChart () {
      report.queryGeneral(this.form).then(
        res => {
          if (res.status === 200) {
            debugger
            this.offerDateBilling = res.data.offerDateBilling
            this.paymentDateBilling = res.data.paymentDateBilling
            // 指定时间段内的offer signed数据
            let offerDateChart = this.$echarts.init(document.getElementById('offerDateChart'))
            offerDateChart.setOption({
              title: {
                text: 'offer signed',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [
                {
                  type: 'pie',
                  radius: '70%',
                  data: res.data.offerDateData,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                  label: {
                    normal: {
                      formatter: '{b} {c}'
                    }
                  }
                }
              ]
            })
            let paymentDateChart = this.$echarts.init(document.getElementById('paymentDateChart'))
            paymentDateChart.setOption({
              title: {
                text: 'payment',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [
                {
                  type: 'pie',
                  radius: '70%',
                  data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                  label: {
                    normal: {
                      formatter: '{b} {c}'
                    }
                  }
                }
              ]
            })
          }
        })
    }
  }
}
