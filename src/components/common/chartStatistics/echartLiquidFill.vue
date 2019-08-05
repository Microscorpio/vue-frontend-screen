<template>
  <echart :height="height" :option="option"></echart>
</template>

<script>
  import echart from '@/components/common/echart';
  import echarts from 'echarts'
  import Vuetypes from 'vue-types'
  export default {
    components: {
      echart
    },
    props: {
      percent: Vuetypes.number.def(0),
      height: Vuetypes.number.def(300),
      title: Vuetypes.string.def('--'),
      showTitle: Vuetypes.bool.def(true),
      linearColor: Vuetypes.array.def(['#02b0db', '#046af6']),
      borderColor: Vuetypes.string.def('#056af8'),
      fontSize: Vuetypes.number.def(40)
    },
    data() {
      return {
        option: {
          series: [{
            type: 'liquidFill',
            radius: "90%",
            amplitude: '3%',
            waveLength: '70%',
            backgroundStyle: {
              color: "rgba(0,0,0,0)"
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: this.linearColor[0]},
                  {offset: 1, color: this.linearColor[1]}
                ]
              )
            },
            data: [this.percent, this.percent],
            label: {
              color: "white",
              insideColor: "white",
              formatter: (data) => {
                const str = data.value >= 0 ? (data.value * 100).toFixed() + '%' : '--%'
                if (this.showTitle) {
                  return ['{value|'+str+'}','{title|'+this.title+'}'].join('\n')
                } else {
                  return ['{value|'+str+'}'].join('\n')
                }
              },
              rich: {
                value: {
                  fontSize: this.fontSize,
                  lineHeight: 40
                },
                title: {
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: 300
                }
              }
            },
            outline: {
              itemStyle: {
                borderColor: this.borderColor,
                borderWidth: 1.5
              }
            }
          }]
        }
      }
    },
    watch: {
      percent: function (val) {
        this.option.series[0].data = [val, val]
      }
    }
  }
</script>

<style scoped>

</style>
