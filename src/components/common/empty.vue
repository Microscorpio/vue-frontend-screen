<template>
  <div class="flex align-center justify-center" :style="{height: height + 'px'}">
    <span class="ft14 fc_999">{{text}}</span>
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
