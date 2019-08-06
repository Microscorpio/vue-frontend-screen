<template>
  <div class="empty-box" :style="{height: height + 'px'}">
    <span>{{text}}</span>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  export default {
    props: {
      text: VueTypes.string.def('暂无数据'),
      height: VueTypes.number.def(200)
    }
  }
</script>

<style lang="less" scoped>
.empty-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    font-size: 14px;
    color: #999;
  }
}
</style>

