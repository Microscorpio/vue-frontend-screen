<template>
  <span class="timeBox">
    {{dateTime}}
  </span>
</template>
<script>
  import dateFormat from 'dateformat'
  export default {
    data () {
      return {
        dateTime: ''
      }
    },
    methods: {
      dateTimeFormat: function () {
        this.dateTime = dateFormat(new Date(), 'yyyy年mm月dd日 HH:MM:ss')
        this.refreshTime()
      },
      clearTimer: function () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
      },
      refreshTime: function () {
        this.clearTimer()
        this.timer = setTimeout(this.dateTimeFormat.bind(this), 1000)
      },
    },
    mounted () {
      this.dateTimeFormat()
    },
    beforeDestroy () {
      this.clearTimer()
    }
  }
</script>
<style lang="less" scoped>
</style>
