<template>
  <echart :height="height" :option="statisticsOption"></echart>
</template>
<script>
  import echart from '@/components/common/echart'
  import Vuetypes from 'vue-types'
  const TEXT_COLOR = '#a3b0d6'
  export default {
    components: {
      echart
    },
    props: {
      height: Vuetypes.number.def(300),
      xAxisData: Vuetypes.array.def([]),
      interval: Vuetypes.number.def(0),
      dataSource: Vuetypes.array.def([]),
      grid: Vuetypes.object.def({
        top: '25',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      })
    },
    data() {
      return {
        statisticsOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 0.5
              }
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
                icon: 'circle'
              }
            }),
            bottom: 0,
            textStyle: {
              color: TEXT_COLOR
            }
          },
          grid: this.grid,
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData,
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
              interval: this.interval,
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
          yAxis: {
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
          },
          color: this.dataSource.map(item => {
            return item.lineColor
          }),
          series: this.dataSource.map(item => {
            return {
              name: item.name,
              type: 'line',
              smooth: true,
              label: {
                show: true,
                position: 'top',
                color: TEXT_COLOR,
                distance: 0
              },
              lineStyle: {
                color: item.lineColor,
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: item.offsetTopColor
                  }, {
                    offset: 1, color: 'rgba(0,0,0,0)'
                  }],
                  global: false
                }
              },
              data: item.data
            }
          }),
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
                type: 'line',
                smooth: true,
                label: {
                  show: true,
                  position: 'top',
                  color: TEXT_COLOR,
                  distance: 0
                },
                lineStyle: {
                  color: item.lineColor,
                  width: 1
                },
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: item.offsetTopColor
                    }, {
                      offset: 1, color: 'rgba(0,0,0,0)'
                    }],
                    global: false
                  }
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
                icon: 'circle'
              }
            })
          }
        }
      },
      xAxisData: function (val) {
        if (val && val.length > 0) {
          this.statisticsOption.xAxis.data = val
        }
      },
      interval: function (val) {
        if (val !== null) {
          this.statisticsOption.xAxis.axisLabel.interval = val
        }
      }
    }
  }
</script>
