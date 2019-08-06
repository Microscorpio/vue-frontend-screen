<template>
  <span class="screen-full" @click="screenFull">
    <i class="iconfont ft14" :class="[isFullscreen?'icon-screen':'icon-screen-full']"></i>
    <span class="ft14">{{isFullscreen?'退出全屏':'全屏模式'}}</span>
  </span>
</template>
<script>
  import screenfull from 'screenfull'
  export default {
    data () {
      return {
        isFullscreen: false
      }
    },
    methods: {
      screenFull() {
        if (!screenfull.enabled) {
          console.log('Your browser does not support!')
          return false
        } else {
          screenfull.on('change', () => {
            if(screenfull.isFullscreen){
              this.isFullscreen = true;
            }else{
              this.isFullscreen = false;
            }
          })
        }
        screenfull.toggle();
      },
    }
  }
</script>

<style lang="less" scoped>
  .screen-full{
    display: inline-block;
    color: #5193FF;
    text-align: center;
    cursor: pointer;
    span{
      margin-left: 4px;
    }
  }
</style>
