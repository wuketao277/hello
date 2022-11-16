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
      paymentDateBilling: 0,
      actualPaymentDateBilling: 0,
      unactualPaymentDateBilling: 0,
      invoiceDateBilling: 0
    }
  },
  mounted () {
    this.calcDate('month')
  },
  methods: {
    // 计算开始日期和结束日期
    calcDate (type) {
      if (type === 'week') {
        let now = new Date()
        let startDate
        if (now.getDay() === 0) {
          startDate = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000)
        } else {
          startDate = new Date(now.getTime() - (now.getDay() - 1) * 24 * 60 * 60 * 1000)
        }
        this.form.startDate = startDate
        this.form.endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000)
      } else if (type === 'month') {
        let month = new Date().getMonth() + 1
        this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-01', 'yyyy-MM-dd'))
        if (month === 2) {
          // 2 月
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-28', 'yyyy-MM-dd'))
        } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          // 1 3 5 7 8 10 12月
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-31', 'yyyy-MM-dd'))
        } else {
          // 4 6 9 11月
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-30', 'yyyy-MM-dd'))
        }
      } else if (type === 'nextmonth') {
        let month = new Date().getMonth() + 2
        let year = new Date().getFullYear()
        if (month === 13) {
          month = 1
          year = year + 1
        }
        this.form.startDate = new Date(Date.parse(year + '-' + month + '-01', 'yyyy-MM-dd'))
        if (month === 2) {
          // 2 月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-28', 'yyyy-MM-dd'))
        } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          // 1 3 5 7 8 10 12月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-31', 'yyyy-MM-dd'))
        } else {
          // 4 6 9 11月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-30', 'yyyy-MM-dd'))
        }
      } else if (type === 'season') {
        let month = new Date().getMonth() + 1
        if (month === 1 || month === 2 || month === 3) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-01-01', 'yyyy-MM-dd'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-03-31', 'yyyy-MM-dd'))
        } else if (month === 4 || month === 5 || month === 6) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-04-01', 'yyyy-MM-dd'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-06-30', 'yyyy-MM-dd'))
        } else if (month === 7 || month === 8 || month === 9) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-07-01', 'yyyy-MM-dd'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-09-30', 'yyyy-MM-dd'))
        } else if (month === 10 || month === 11 || month === 12) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-10-01', 'yyyy-MM-dd'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-12-31', 'yyyy-MM-dd'))
        }
      } else if (type === 'year') {
        this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-01-01', 'yyyy-MM-dd'))
        this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-12-31', 'yyyy-MM-dd'))
      } else if (type === 'tonow') {
        this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-01-01', 'yyyy-MM-dd'))
        this.form.endDate = new Date()
      }
      // 绘制图表
      this.drawChart()
    },
    // 绘制图表
    drawChart () {
      report.queryGeneral(this.form).then(
        res => {
          if (res.status === 200) {
            this.offerDateBilling = res.data.offerDateBilling
            this.paymentDateBilling = res.data.paymentDateBilling
            this.actualPaymentDateBilling = res.data.actualPaymentDateBilling
            this.unactualPaymentDateBilling = res.data.unactualPaymentDateBilling
            this.invoiceDateBilling = res.data.invoiceDateBilling
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
              series: [{
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
              }]
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
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.paymentDateData,
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
              }]
            })
            let actualPaymentDateChart = this.$echarts.init(document.getElementById('actualPaymentDateChart'))
            actualPaymentDateChart.setOption({
              title: {
                text: '已付款',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.actualPaymentDateData,
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
              }]
            })
            let unactualPaymentDateChart = this.$echarts.init(document.getElementById('unactualPaymentDateChart'))
            unactualPaymentDateChart.setOption({
              title: {
                text: '未付款',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.unactualPaymentDateData,
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
              }]
            })
            let personalOfferDataChart = this.$echarts.init(document.getElementById('personalOfferDataChart'))
            personalOfferDataChart.setOption({
              title: {
                text: 'personal offer data',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.personalOfferData,
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
              }]
            })
            let invoiceDateDataChart = this.$echarts.init(document.getElementById('invoiceDateDataChart'))
            invoiceDateDataChart.setOption({
              title: {
                text: 'invoice data',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.invoiceDateData,
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
              }]
            })
            let personalReceiveDataChart = this.$echarts.init(document.getElementById('personalReceiveDataChart'))
            personalReceiveDataChart.setOption({
              title: {
                text: 'personal receive data',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.personalReceiveData,
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
              }]
            })
          }
        })
    }
  }
}
