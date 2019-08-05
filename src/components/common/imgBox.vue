<template>
  <img :src="imgSrc" :class="{'defaultImg': isDefault || !src}" @error="imageError" />
</template>

<script>
  import VueTypes from 'vue-types'
  export default {
    props: {
      src: VueTypes.string.def('')
    },
    data() {
      return {
        isDefault: false,
        imgSrc: this.src ? this.src : require('@/assets/image/placeholder.png')
      }
    },
    methods: {
      imageError() {
        this.isDefault = true
        this.imgSrc = require('@/assets/image/placeholder.png')
      }
    },
    watch: {
      'src': function () {
        this.imgSrc = this.src
      }
    }
  }
</script>

<style lang="less" scoped>
  .defaultImg{
    width: auto !important;
  }
</style>
