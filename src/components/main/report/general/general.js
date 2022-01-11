import report from '@/api/report'

export default {
  name: 'hello',
  data () {
    return {
      yearlyGP: 1000,
      yearlyBilling: 1000,
      monthlyGP: 200,
      monthlyBilling: 200,
      // 多页签选择项
      tabsChoice4YTGP: '1',
      tabsChoice4YTB: '1',
      tabsChoice4MGP: '1',
      tabsChoice4MB: '1',
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
      // 年度总GP个人占比数据
      yearlyGPPersonalRateOptionData: [
        { value: 104, name: 'Leon' },
        { value: 735, name: 'Arran' },
        { value: 580, name: 'Ellen' },
        { value: 484, name: 'Daisy' },
        { value: 300, name: 'Jova' },
        { value: 300, name: 'Howard' }
      ],
      // 年度总GP个人占比
      yearlyGPPersonalRateOption: {
        title: {
          text: 'Personal Rate',
          left: 'center'
        },
        legend: {},
        series: [
          {
            name: 'Personal Rate',
            type: 'pie',
            radius: '60%',
            label: {},
            data: {},
            emphasis: {}
          }
        ]
      },
      // 年度总GP客户占比数据
      yearlyGPClientRateOptionData: [
        { value: 104, name: 'BBA' },
        { value: 735, name: 'SF' },
        { value: 580, name: 'VOLVO' }
      ],
      // 年度总GP客户占比
      yearlyGPClientRateOption: {
        title: {
          text: 'Client Rate',
          left: 'center'
        },
        legend: {},
        series: [
          {
            name: 'Client Rate',
            type: 'pie',
            radius: '60%',
            label: {},
            data: {},
            emphasis: {}
          }
        ]
      },
      // 年度总GP月占比数据
      yearlyGPMonthlyRateOptionData: [
        { value: 104, name: 'BBA' },
        { value: 735, name: 'SF' },
        { value: 580, name: 'VOLVO' }
      ],
      // 年度总GP月占比
      yearlyGPMonthlyRateOption: {
        title: {
          text: 'Monthly Rate',
          left: 'center'
        },
        legend: {},
        series: [
          {
            name: 'Monthly Rate',
            type: 'pie',
            radius: '60%',
            label: {},
            data: {},
            emphasis: {}
          }
        ]
      },
      // 月GP个人占比数据
      monthlyGPPersonalRateOptionData: [
        { value: 10, name: 'Leon' },
        { value: 75, name: 'Arran' },
        { value: 50, name: 'Ellen' },
        { value: 44, name: 'Daisy' },
        { value: 30, name: 'Jova' },
        { value: 30, name: 'Howard' }
      ],
      // 月GP个人占比
      monthlyGPPersonalRateOption: {
        title: {
          text: 'Personal Rate',
          left: 'center'
        },
        legend: {},
        series: [
          {
            name: 'Personal Rate',
            type: 'pie',
            radius: '60%',
            label: {},
            data: {},
            emphasis: {}
          }
        ]
      },
      // 月GP客户占比数据
      monthlyGPClientRateOptionData: [
        { value: 104, name: 'BBA' },
        { value: 735, name: 'SF' },
        { value: 580, name: 'VOLVO' }
      ],
      // 月GP客户占比
      monthlyGPClientRateOption: {
        title: {
          text: 'Client Rate',
          left: 'center'
        },
        legend: {},
        series: [
          {
            name: 'Client Rate',
            type: 'pie',
            radius: '60%',
            label: {},
            data: {},
            emphasis: {}
          }
        ]
      }
    }
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    // 绘制图表
    drawChart () {
      report.getGeneralReport().then(
        res => {
          if (res.status === 200) {
            this.yearlyGPPersonalRateOptionData = res.data.yearlyGPPersonalRateOptionData
            this.yearlyGPClientRateOptionData = res.data.yearlyGPClientRateOptionData
            this.yearlyGPMothlyRateOptionData = res.data.yearlyGPMothlyRateOptionData
            this.monthlyGPPersonalRateOptionData = res.data.monthlyGPPersonalRateOptionData
            this.monthlyGPClientRateOptionData = res.data.monthlyGPClientRateOptionData
          }
        })
      // 全年GP，每人占比
      let yearlyGPPersonalRate = this.$echarts.init(document.getElementById('yearlyGPPersonalRate'))
      this.yearlyGPPersonalRateOption.legend = this.chartCommon.legend
      this.yearlyGPPersonalRateOption.tooltip = this.chartCommon.tooltip
      this.yearlyGPPersonalRateOption.series[0].label = this.chartCommon.series.label
      this.yearlyGPPersonalRateOption.series[0].emphasis = this.chartCommon.series.emphasis
      this.yearlyGPPersonalRateOption.series[0].data = this.yearlyGPPersonalRateOptionData
      yearlyGPPersonalRate.setOption(this.yearlyGPPersonalRateOption)
      // 全年GP，每人占比
      let yearlyGPClientRate = this.$echarts.init(document.getElementById('yearlyGPClientRate'))
      this.yearlyGPClientRateOption.legend = this.chartCommon.legend
      this.yearlyGPClientRateOption.tooltip = this.chartCommon.tooltip
      this.yearlyGPClientRateOption.series[0].label = this.chartCommon.series.label
      this.yearlyGPClientRateOption.series[0].emphasis = this.chartCommon.series.emphasis
      this.yearlyGPClientRateOption.series[0].data = this.yearlyGPClientRateOptionData
      yearlyGPClientRate.setOption(this.yearlyGPClientRateOption)
      // 全年GP，月占比
      let yearlyGPMonthlyRate = this.$echarts.init(document.getElementById('yearlyGPMonthlyRate'))
      this.yearlyGPMonthlyRateOption.legend = this.chartCommon.legend
      this.yearlyGPMonthlyRateOption.tooltip = this.chartCommon.tooltip
      this.yearlyGPMonthlyRateOption.series[0].label = this.chartCommon.series.label
      this.yearlyGPMonthlyRateOption.series[0].emphasis = this.chartCommon.series.emphasis
      this.yearlyGPMonthlyRateOption.series[0].data = this.yearlyGPMonthlyRateOptionData
      yearlyGPMonthlyRate.setOption(this.yearlyGPMonthlyRateOption)
      // 全年GP，每人占比
      let monthlyGPPersonalRate = this.$echarts.init(document.getElementById('monthlyGPPersonalRate'))
      this.monthlyGPPersonalRateOption.legend = this.chartCommon.legend
      this.monthlyGPPersonalRateOption.tooltip = this.chartCommon.tooltip
      this.monthlyGPPersonalRateOption.series[0].label = this.chartCommon.series.label
      this.monthlyGPPersonalRateOption.series[0].emphasis = this.chartCommon.series.emphasis
      this.monthlyGPPersonalRateOption.series[0].data = this.monthlyGPPersonalRateOptionData
      monthlyGPPersonalRate.setOption(this.monthlyGPPersonalRateOption)
      // 全年GP，每人占比
      let monthlyGPClientRate = this.$echarts.init(document.getElementById('monthlyGPClientRate'))
      this.monthlyGPClientRateOption.legend = this.chartCommon.legend
      this.monthlyGPClientRateOption.tooltip = this.chartCommon.tooltip
      this.monthlyGPClientRateOption.series[0].label = this.chartCommon.series.label
      this.monthlyGPClientRateOption.series[0].emphasis = this.chartCommon.series.emphasis
      this.monthlyGPClientRateOption.series[0].data = this.monthlyGPClientRateOptionData
      monthlyGPClientRate.setOption(this.monthlyGPClientRateOption)
    }
  }
}
