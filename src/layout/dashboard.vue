<template>
  <section class="section">
    <pointsWaves color="#278db3"></pointsWaves>
    <slot></slot>
  </section>
</template>

<script>
import pointsWaves from '@/components/common/pointsWaves/index'
export default {
  components: {
    pointsWaves
  }
}
</script>

<style lang="less" scoped>
  .section{
    margin-top: 20px;
  }
</style>

