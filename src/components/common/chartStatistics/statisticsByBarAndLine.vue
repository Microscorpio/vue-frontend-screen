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
      xAxisData: Vuetypes.array.def([]),
      needRightY: Vuetypes.bool.def(false),
      rightYUnit: Vuetypes.string
    },
    data() {
      return {
        statisticsOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: (params) => {
              let str = ''
              if (params && params.length > 0) {
                str += params[0].name + '<br />'
                params.forEach((item) => {
                  const unit = item.data.unit || '个'
                  str += item.marker + item.seriesName + '：' + item.value + unit + '<br />'
                })
              }
              return str
            }
          },
          legend: {
            data: this.dataSource.map(item => {
              return {
                name: item.name,
                icon: item.type === 'bar' ? 'circle' : 'line'
              }
            }),
            bottom: 0,
            itemWidth: 15,
            textStyle: {
              color: TEXT_COLOR
            }
          },
          grid: {
            top: '25',
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xAxisData.map(item => {
              return item
            }),
            axisLine: {
              lineStyle: {
                color: '#687890'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: TEXT_COLOR,
              interval: 0,
              rotate: 35,
              formatter: function (params) {
                let newParamsName = '';// 最终拼接成的字符串
                let paramsNameNumber = params.length;// 实际标签的个数
                let provideNumber = 20;// 每行能显示的字的个数
                let rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (let p = 0; p < rowNumber; p++) {
                    let tempStr = '';// 表示每一次截取的字符串
                    let start = p * provideNumber;// 开始截取的位置
                    let end = start + provideNumber;// 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p === rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + '\n';
                    }
                    newParamsName += tempStr;// 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                // 将最终的字符串返回
                return ['{xTitle|' + newParamsName + '}'].join('\n')
              },
              rich: {
                xTitle: {
                  lineHeight: 14,
                  fontSize: 13,
                }
              }
            }
          },
          yAxis: [{
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: TEXT_COLOR,
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: '#627389',
                type: 'dashed'
              }
            }
          }, {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: TEXT_COLOR,
              fontSize: 14,
              formatter: (val) => {
                return val + this.rightYUnit;
              }
            },
            splitLine: {
              lineStyle: {
                color: '#627389',
                type: 'dashed'
              }
            }
          }],
          series: this.dataSource.map(item => {
            return {
              name: item.name,
              type: item.type,
              yAxisIndex: (item.type === 'line' && this.needRightY) ? 1 : 0,
              label: {
                show: true,
                position: 'top',
                color: TEXT_COLOR,
                distance: 0
              },
              smooth: item.type === 'line',
              barMaxWidth: item.type === 'bar' ? 12 : null,
              itemStyle: {
                color: item.type === 'bar' ? new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {
                      offset: 0,
                      color: item.offsetTopColor ? item.offsetTopColor : item.color
                    },
                    {
                      offset: 1,
                      color: item.offsetBottomColor ? item.offsetBottomColor : item.color
                    }
                  ]
                ) : item.color
              },
              lineStyle: {
                color:  item.color,
                width: 1
              },
              data: item.data
            }
          })
        }
      }
    },
    watch: {
      dataSource: {
        deep: true,
        handler: function (val) {
          if (val && val.length > 0) {
            this.statisticsOption.series = val.map(item => {
              return {
                name: item.name,
                type: item.type,
                yAxisIndex: (item.type === 'line' && this.needRightY) ? 1 : 0,
                label: {
                  show: true,
                  position: 'top',
                  color: TEXT_COLOR,
                  distance: 0
                },
                smooth: item.type === 'line',
                barMaxWidth: item.type === 'bar' ? 12 : null,
                itemStyle: {
                  color: item.type === 'bar' ? new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {
                        offset: 0,
                        color: item.offsetTopColor ? item.offsetTopColor : item.color
                      },
                      {
                        offset: 1,
                        color: item.offsetBottomColor ? item.offsetBottomColor : item.color
                      }
                    ]
                  ) : item.color
                },
                lineStyle: {
                  color:  item.color,
                  width: 1
                },
                data: item.data.map(val => {
                  return {
                    value: val,
                    unit: item.unit
                  }
                })
              }
            })
            this.statisticsOption.legend.data = val.map(item => {
              return {
                name: item.name,
                icon: item.type === 'bar' ? 'circle' : 'line'
              }
            })
          }
        }
      },
      xAxisData: function (val) {
        if (val && val.length > 0) {
          this.statisticsOption.xAxis.data = val
        }
      }
    }
  }
</script>

<style scoped>

</style>
