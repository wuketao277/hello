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
      period: commonJS.getStorageContent('generalPeriod', 'month')
    }
  },
  mounted () {
    let dateArray = commonJS.calcDate(this.period)
    this.form.startDate = dateArray[0]
    this.form.endDate = dateArray[1]
    this.drawChart()
  },
  methods: {
    // 图表尺寸变更时间
    changeChartSize (size) {
      if (size === 'big') {
        window.localStorage['generalDivClass'] = 'divBig'
        window.localStorage['generalChartClass'] = 'chartBig'
      } else {
        window.localStorage['generalDivClass'] = 'divSmall'
        window.localStorage['generalChartClass'] = 'chartSmall'
      }
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
            let offerDateChart = this.$echarts.init(document.getElementById('offerDateChart1'))
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
          }
        })
    }
  }
}
