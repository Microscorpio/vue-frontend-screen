<template>
  <div class="radiusProgress" :style="{width: size + 'px', height: size + 'px'}">
    <canvas class="radius-canvas"
            :id="id"
            :width="size * 2" :height="size * 2"
            :style="{'marginLeft': -size + 'px', 'marginTop': -size + 'px'}"></canvas>
  </div>
</template>

<script>
  import guid from 'guid'
  import VueTypes from 'vue-types'
  import DrawRadiusProgress from './DrawRadiusProgress.js'
  export default {
    props: {
      name: VueTypes.string.def('AQI'),
      size: VueTypes.number.def(200),
      total: VueTypes.number.def(500),
      percent: VueTypes.number.def(40),
      color: VueTypes.string.def('#3ee19a')
    },
    data() {
      return {
        radiusProgress: null,
        percentVal: this.percent
      }
    },
    created() {
      this.id = `id-${guid.raw()}`;
    },
    methods: {
      init() {
        const self = this
        self.radiusProgress = new DrawRadiusProgress(this.id, {
          name: self.name,
          size: self.size,
          lineWidth: 12,
          textSize: 12,
          percent: self.percentVal,
          activeColor: self.color
        })
        self.radiusProgress.init()
      },
      refresh() {
        if (self.radiusProgress) {
          self.radiusProgress.clear()
        }
        self.radiusProgress = null
        this.init()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
    },
    watch: {
      percent: function(val) {
        console.log('percentVal', val)
        if (val) {
          this.percentVal = val
          this.refresh()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .radiusProgress{
    position: relative;
    .radius-canvas{
      transform: scale(0.5);
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
</style>
