<template>
  <div class="panel-modal" v-if="visible" @click="handleClose($event)">
    <panel class="panel-dialog p20"
           :class="{show: visible}"
           :id="id"
           :width="width"
           :height="height"
           :position="position"
           :style="{top: top + 'px', left: left + 'px', zIndex: zIndex + 'px'}">
      <div class="panelDialog-head">
        <div class="title">{{title}}</div>
        <i class="iconfont iconx" @click.prevent.stop="close()"></i>
      </div>
      <div class="panelDialog-content">
        <slot></slot>
      </div>
    </panel>
  </div>
</template>

<script>
  import guid from 'guid'
  import VueTypes from 'vue-types'
  export default {
    props: {
      visible: VueTypes.bool.def(false),
      width: VueTypes.number.def(300),
      height: VueTypes.number.def(0),
      position: VueTypes.string.def('absolute'),
      top: VueTypes.number.def(10),
      left: VueTypes.number.def(400),
      zIndex: VueTypes.number.def(1),
      title: VueTypes.string.def('提示框')
    },
    methods: {
      handleClose(event) {
        if(!document.getElementById(this.id).contains(event.target)) {
          this.$emit('closePanelDialog')
        }
      },
      close() {
        // 强制关闭
        this.$emit('closePanelDialog')
      }
    },
    created() {
      this.id = `dialog-${guid.raw()}`;
    },
    beforeDestroy() {
      this.close()
    }
  }
</script>

<style lang="less" scoped>
  .panel-modal{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background-color: transparent;
  }
  .panel-dialog{
    opacity: 0;
    transition: opacity 1s;
    background:rgba(11,16,30,0.95);
    max-height: 890px;
    &.show{
      opacity: 1;
      animation: showDialog 0.2s;
    }
  }
  @keyframes showDialog {
    0% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .panelDialog-head{
    width: 100%;
    height: 25px;
    padding-right: 25px;
    position: relative;
    .title{
      width: 100%;
      line-height: 25px;
      font-size: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
      font-weight: 600;
      color: #C4D3FF;
    }
    .iconfont{
      position: absolute;
      top: 0;
      right: -5px;
      display: inline-block;
      vertical-align: top;
      width: 25px;
      height: 25px;
      font-size: 24px;
      line-height: 25px;
      text-align: right;
      color: #C4D3FF;
      cursor: pointer;
    }
  }
  .panelDialog-content{
    width: 100%;
    height: auto;
    padding-top: 20px;
    max-height: 823px;
    overflow-y: auto;
  }
</style>
