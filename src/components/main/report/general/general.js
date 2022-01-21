import report from '@/api/report'

export default {
  name: 'hello',
  data () {
    return {
      form: {
        startDate: null,
        endDate: null
      },
      GP: 1001,
      Billing: 1000,
      chartCommon: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: {
          label: {
            normal: {
              formatter: '{b}:{d}%'
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      },
      // GP个人占比数据
      personalRateOptionDataX: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      personalRateOptionDataY: [120, 150, 80, 70, 110, 132],
      // GP个人占比
      personalRateOption: {
        title: {
          text: 'PERSONAL RATE'
        },
        xAxis: {
          type: 'category',
          data: {}
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            label: {
              show: true,
              position: 'top'
            },
            data: {},
            type: 'bar'
          }
        ]
      },
      // GP客户占比数据
      clientRateOptionDataX: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      clientRateOptionDataY: [120, 150, 80, 70, 110, 132],
      // GP客户占比
      clientRateOption: {
        title: {
          text: 'CLIENT RATE'
        },
        xAxis: {
          type: 'category',
          data: {}
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            label: {
              show: true,
              position: 'top'
            },
            data: {},
            type: 'bar'
          }
        ]
      }
    }
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    // 计算开始日期和结束日期
    calcDate (type) {
      if (type === 'week') {
        let endDate = new Date()
        let startDate = new Date(endDate.getTime() - (endDate.getDay() - 1) * 24 * 60 * 60 * 1000)
        this.form.startDate = startDate
        this.form.endDate = endDate
      } else if (type === 'month') {
        let endDate = new Date()
        let startDate = new Date(endDate.getTime() - (endDate.getDate() - 1) * 24 * 60 * 60 * 1000)
        this.form.startDate = startDate
        this.form.endDate = endDate
      } else if (type === 'season') {
        debugger
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
            this.personalRateOptionDataX = res.data.personalRateOptionDataX
            this.personalRateOptionDataY = res.data.personalRateOptionDataY
            this.clientRateOptionDataX = res.data.clientRateOptionDataX
            this.clientRateOptionDataY = res.data.clientRateOptionDataY
            // 全年GP，每人占比
            let personalRate = this.$echarts.init(document.getElementById('personalRate'))
            this.personalRateOption.xAxis.data = this.personalRateOptionDataX
            this.personalRateOption.series[0].data = this.personalRateOptionDataY
            personalRate.setOption(this.personalRateOption)
            // 全年GP，每人占比
            let clientRate = this.$echarts.init(document.getElementById('clientRate'))
            this.clientRateOption.xAxis.data = this.clientRateOptionDataX
            this.clientRateOption.series[0].data = this.clientRateOptionDataY
            clientRate.setOption(this.clientRateOption)
          }
        })
    }
  }
}
