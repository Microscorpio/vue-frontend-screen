<template>
  <echart :height="height" :option="statisticsOption"></echart>
</template>
<script>
  import echart from '@/components/common/echart'
  import echarts from 'echarts'
  import Vuetypes from 'vue-types'
  const TEXT_COLOR = '#a3b0d6'
  export default {
    components: {
      echart
    },
    props: {
      height: Vuetypes.number.def(200),
      dataSource: Vuetypes.array.def([]),
      yAxisData: Vuetypes.array.def([])
    },
    data() {
      return {
        statisticsOption: {
          tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false
          },
          grid: {
            top: '10px',
            left: '3%',
            right: '4%',
            bottom: '10px',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: this.yAxisData.map(item => {
              return item
            }),
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: TEXT_COLOR,
              fontSize: 12,
              fontWeight: 300,
              interval: 0
            }
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              barMaxWidth: 12,
              label: {
                show: true,
                position: 'right',
                color: TEXT_COLOR,
                fontWeight: 300
              },
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 1, 1, 1,
                  [
                    {
                      offset: 0,
                      color: '#006fff'
                    },
                    {
                      offset: 1,
                      color: '#06c7dd'
                    }
                  ]
                )
              },
              data: this.dataSource.map(item => {
                return item
              })
            }
          ]
        }
      }
    },
    watch: {
      dataSource: function (val) {
        if (val && val.length > 0) {
          this.statisticsOption.series[0].data = val.map(item => {
            return item
          })
        }
      },
      yAxisData: function (val) {
        if (val && val.length > 0) {
          this.statisticsOption.yAxis.data = val.map(item => {
            return item
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
