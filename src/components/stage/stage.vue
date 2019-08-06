<template>
   <div
    ref="stage"
    class="stage"
    :class="{'transition': transition, 'no-scale': scaleControl}"
    :style="{
      width: width * defaultScale +'px',
      height: height * defaultScale +'px',
      marginLeft:-(width/2) * defaultScale +'px',
      marginTop:-(height/2) * defaultScale +'px'
    }">
    <slot></slot>
  </div>
</template>
<script>
  import stageEvent, {EVENT_SCALE_CHANGE} from './stageEvent'
  
  export default{
    props: {
      width: {
        type: Number,
        default: 1920
      },
      height: {
        type: Number,
        default: 1080
      }
    },
    data() {
      return {
        defaultScale: 1,
        scale: 1,
        scaleControl: false
      }
    },
    watch: {
      width: function (value, oldValue) {
        if (value !== oldValue) {
          this.onWindowResize();
        }
      },
      height: function (value, oldValue) {
        if (value !== oldValue) {
          this.onWindowResize();
        }
      }
    },
    methods: {
      onWindowResize(){
        function update() {
          this.scale = Math.min(document.documentElement.clientWidth / this.width, document.documentElement.clientHeight / this.height);
          this.$refs['stage'].style['webkitTransform'] = `scale(${this.scale})`;
          this.$refs['stage'].style['msTransform'] = `scale(${this.scale})`;
          this.$refs['stage'].style['transform'] = `scale(${this.scale})`;
          this.$refs['stage'].style['opacity'] = 1
          stageEvent.$emit(EVENT_SCALE_CHANGE, this.scale);
        }
        this.clearTimer();
        this.timer = setTimeout(update.bind(this), 100);
      },
      clearTimer(){
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      },
    },
    created(){
      this.timer = null;
      this.transition = false
      this.onWindowResize.apply(this);
      window.addEventListener('resize', () => {
        this.transition = true;
        this.onWindowResize();
      }, false);
    },
    beforeDestroy(){
      this.clearTimer();
      window.removeEventListener('resize', () => {
        this.transition = false;
        this.onWindowResize();
      }, false);
    }
  }
</script>

<style lang="less" scope>
.stage{
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    &.transition{
      transition: 0.5s all;
    }
    &.no-scale{
      margin-top: 0 !important;
      top: 0 !important;
      transform-origin: center top 0px;
    }
  }
</style>

