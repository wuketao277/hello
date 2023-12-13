import report from '@/api/report'
import commonJS from '@/common/common'

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
      invoiceDateBilling: 0,
      divClass: commonJS.getStorageContent('generalDivClass', 'divSmall'),
      chartClass: commonJS.getStorageContent('generalChartClass', 'chartSmall'),
      period: commonJS.getStorageContent('generalPeriod', 'month')
    }
  },
  mounted () {
    this.calcDate(this.period)
  },
  methods: {
    // 图表尺寸变更时间
    changeChartSize (size) {
      if (size === 'big') {
        this.divClass = 'divBig'
        this.chartClass = 'chartBig'
        window.localStorage['generalDivClass'] = 'divBig'
        window.localStorage['generalChartClass'] = 'chartBig'
      } else {
        this.divClass = 'divSmall'
        this.chartClass = 'chartSmall'
        window.localStorage['generalDivClass'] = 'divSmall'
        window.localStorage['generalChartClass'] = 'chartSmall'
      }
    },
    // 计算开始日期和结束日期
    calcDate (type) {
      window.localStorage['generalPeriod'] = type
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
      } else if (type === 'lastmonth') {
        let month = new Date().getMonth()
        let year = new Date().getFullYear()
        if (month === 0) {
          month = 12
          year = year - 1
        }
        this.form.startDate = new Date(Date.parse(year + '-' + month + '-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        if (month === 2) {
          // 2 月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-28 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          // 1 3 5 7 8 10 12月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else {
          // 4 6 9 11月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        }
      } else if (type === 'month') {
        let month = new Date().getMonth() + 1
        this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        console.info(this.form.startDate)
        if (month === 2) {
          // 2 月
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-28 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          // 1 3 5 7 8 10 12月
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else {
          // 4 6 9 11月
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-' + month + '-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        }
      } else if (type === 'nextmonth') {
        let month = new Date().getMonth() + 2
        let year = new Date().getFullYear()
        if (month === 13) {
          month = 1
          year = year + 1
        }
        this.form.startDate = new Date(Date.parse(year + '-' + month + '-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        if (month === 2) {
          // 2 月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-28 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          // 1 3 5 7 8 10 12月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else {
          // 4 6 9 11月
          this.form.endDate = new Date(Date.parse(year + '-' + month + '-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        }
      } else if (type === 'lastseason') {
        let month = new Date().getMonth() - 2
        let year = new Date().getFullYear()
        if (month < 0) {
          month = 10
          year = year - 1
        }
        if (month === 1 || month === 2 || month === 3) {
          this.form.startDate = new Date(Date.parse(year + '-01-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(year + '-03-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 4 || month === 5 || month === 6) {
          this.form.startDate = new Date(Date.parse(year + '-04-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(year + '-06-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 7 || month === 8 || month === 9) {
          this.form.startDate = new Date(Date.parse(year + '-07-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(year + '-09-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 10 || month === 11 || month === 12) {
          this.form.startDate = new Date(Date.parse(year + '-10-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(year + '-12-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        }
      } else if (type === 'season') {
        let month = new Date().getMonth() + 1
        if (month === 1 || month === 2 || month === 3) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-01-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-03-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 4 || month === 5 || month === 6) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-04-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-06-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 7 || month === 8 || month === 9) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-07-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-09-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 10 || month === 11 || month === 12) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-10-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-12-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        }
      } else if (type === 'nextseason') {
        let month = new Date().getMonth() + 1
        if (month === 1 || month === 2 || month === 3) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-04-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-06-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 4 || month === 5 || month === 6) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-07-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-09-30 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 7 || month === 8 || month === 9) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-10-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-12-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        } else if (month === 10 || month === 11 || month === 12) {
          this.form.startDate = new Date(Date.parse(new Date().getFullYear() + 1 + '-01-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
          this.form.endDate = new Date(Date.parse(new Date().getFullYear() + 1 + '-03-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        }
      } else if (type === 'year') {
        this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-01-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        this.form.endDate = new Date(Date.parse(new Date().getFullYear() + '-12-31 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
      } else if (type === 'tonow') {
        this.form.startDate = new Date(Date.parse('2019-01-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
        this.form.endDate = new Date()
      } else if (type === 'tonowyear') {
        this.form.startDate = new Date(Date.parse(new Date().getFullYear() + '-01-01 16:00:00', 'yyyy-MM-dd HH:mm:ss'))
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
                text: '',
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
                text: '',
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
                text: '',
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
                text: '',
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
                text: '',
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
                text: '',
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
                text: '',
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
            let recruiterOfferBillingDataChart = this.$echarts.init(document.getElementById('recruiterOfferBillingDataChart'))
            recruiterOfferBillingDataChart.setOption({
              title: {
                text: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.recruiterOfferBillingData,
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
            let recruiterMonthlyOfferBillingChart = this.$echarts.init(document.getElementById('recruiterMonthlyOfferBillingChart'))
            recruiterMonthlyOfferBillingChart.setOption({
              title: {
                text: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.recruiterMonthlyOfferBillingData,
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
            let teamOfferGPDataChart = this.$echarts.init(document.getElementById('teamOfferGPDataChart'))
            teamOfferGPDataChart.setOption({
              title: {
                text: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.teamOfferGPData,
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
            let avgOfferDataChart = this.$echarts.init(document.getElementById('avgOfferDataChart'))
            avgOfferDataChart.setOption({
              title: {
                text: '',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              series: [{
                type: 'pie',
                radius: '70%',
                data: res.data.avgOfferData,
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
