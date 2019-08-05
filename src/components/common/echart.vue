<template>
  <div class="box-sizing"
       :style="{height: height ? height + 'px' : '100%',
        width: width ? width +'px' : '100%',
        position: 'relative'}">
    <div class="echart box-sizing" :id="id"
         :style="{height:  height ? height +'px' : '100%', width: width ? width +'px' : '100%'}"></div>
    <div v-if="isEmpty" class="empty-text flex center module">
      <span class="fc_999 ft14">{{noDataText}}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .empty-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    span {
      color: #999999;
    }
  }
</style>

<script>
  import guid from 'guid'
  import VueTypes from 'vue-types'
  import echarts from 'echarts'

  export default {
    props: {
      width: VueTypes.number,
      height: VueTypes.number,
      /**
       * 静态的echart option数据配置
       * */
      option: VueTypes.object.def({}),
      /**
       * ajax轮训的时间间隔,0:表示不轮训,单位秒
       * */
      interval: VueTypes.number.def(0),
      hasClick: {
        type: Boolean,
        required: false,
        default: false
      },
      notMerge: VueTypes.bool.def(false)
    },
    data: function () {
      return {
        isEmpty: true,
        noDataText: '暂无数据',
        option_: this.option
      };
    },
    watch: {
      width: function () {
        this.$nextTick(() => {
          this.resize();
        })
      },
      height: function () {
        this.$nextTick(() => {
          this.resize();
        })
      },
      option: {
        deep: true,
        handler: function (value) {
          this.$nextTick(() => {
            this.setOptions(value);
            this.resize();
          })
        }
      },
    },
    methods: {
      /**
       * resize chart
       * */
      resize: function () {
        if (this.chartInstance) {
          this.chartInstance.resize()
        }
      },
      /**
       * update chart option
       * */
      setOptions: function (value) {
        if (value) {
          if (this.chartInstance) {
            if (value.series && value.series.length > 0) {
              value.series.forEach(aSeries => {
                this.isEmpty = !(aSeries.data && aSeries.data.length > 0)
              })
            }
            this.chartInstance.setOption(value, this.notMerge);
          }
        }
      },
    },
    created() {
      this.id = `id-${guid.raw()}`;
    },
    mounted: async function () {
      this.chartInstance = echarts.init(document.getElementById(this.id));
      this.chartInstance._dom.childNodes[0].style.width = '100%'
      this.chartInstance.resize()
      let self = this;
      self.setOptions(self.option_)
      if (self.hasClick) {
        self.chartInstance.on('click', function (params) {
          self.$emit('clickBack', params.data);
        });
      }
    },
    beforeDestroy() {
      /**
       * destroy chart instance
       * */
      if (this.chartInstance) {
        this.chartInstance.clear()
        this.chartInstance.dispose()
        this.chartInstance = null
      }
    }
  }
</script>
