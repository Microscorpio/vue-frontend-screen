<template>
  <echart :height="height" :option="chartOption"></echart>
</template>

<script>
  import Vuetypes from 'vue-types'
  import echart from '@/components/common/echart'
  export default {
    components: {
      echart
    },
    props: {
      height: Vuetypes.number.def(300),
      dataSource: Vuetypes.array.def([]),
      radiusSize: Vuetypes.array.def(['50%', '65%']),
      centerPos: Vuetypes.array.def(['50%', '50%']),
      showLine: Vuetypes.bool.def(false),
      borderWidth: Vuetypes.number.def(2),
      textColor: Vuetypes.string.def('#a3b0d6'),
      showCount: Vuetypes.bool.def(true),
      title: Vuetypes.string,
      showTextLabel: Vuetypes.bool.def(true),
      showTooltip: Vuetypes.bool.def(true),
      hoverAnimation: Vuetypes.bool.def(true)
    },
    data() {
      return {
        chartOption: {
          tooltip: {
            show: this.showTooltip,
            trigger: 'item',
            formatter: (data) => {
              return data.seriesName + '<br/>' + data.name + '：' + data.value + ' (' + data.data.rate + '%)'
            }
          },
          legend: {
            bottom: 0,
            data: this.dataSource.map(item => {
              return {
                name: item.name,
                icon: 'circle'
              }
            }),
            textStyle: {
              color: this.textColor
            }
          },
          series: [
            {
              name:this.title,
              type:'pie',
              center: this.centerPos,
              radius: this.radiusSize,
              avoidLabelOverlap: true,
              label: {
                show: this.showTextLabel,
                formatter: (data) => {
                  const strData = this.showCount ? data.data.rate + '%\n' + data.value : data.data.rate + '%'
                  return ['{text|'+strData+'}'].join('\n')
                },
                rich: {
                  text: {
                    lineHeight: 14,
                    color: this.textColor
                  }
                },
                position: this.showLine ? 'outside' : 'inside'
              },
              hoverAnimation: this.hoverAnimation,
              labelLine: {
                show: this.showLine
              },
              itemStyle: {
                normal: {
                  borderWidth: this.borderWidth,
                  borderColor: '#0B101E',
                }
              },
              data: this.dataSource.map(item => {
                return {
                  name: item.name,
                  value: item.value,
                  rate: item.rate,
                  itemStyle: {
                    color: item.color
                  }
                }
              })
            }
          ]
        }
      }
    },
    watch: {
      dataSource: {
        deep: true,
        handler: function (val) {
          if (val && val.length > 0) {
            this.chartOption.series[0].data = val.map(item => {
              return {
                name: item.name,
                value: item.value,
                rate: item.rate,
                itemStyle: {
                  color: item.color
                }
              }
            })
            this.chartOption.legend.data = val.map(item => {
              return {
                name: item.name,
                icon: 'circle'
              }
            })
          }
        }
      },
      title(newVal) {
        this.chartOption.series[0].name = newVal;
      }
    }
  }
</script>
