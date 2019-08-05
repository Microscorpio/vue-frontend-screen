<template>
  <header class="screen-header">
    <div class="currentScale">当前缩放：{{scale}}</div>
    <div class="header-top">
      <div class="header-time">
        <dateTime />
      </div>
      <div class="header-name">
        <h1>智慧数据大屏</h1>
      </div>
      <div class="header-tool">
        <screenFull />
      </div>
    </div>
    <div class="header-nav">
      <ul>
        <li></li>
      </ul>
    </div>
  </header>
</template>

<script>
import dateTime from '@/components/common/dateTime'
import screenFull from '@/components/common/screenFull'
export default {
  components: {
    dateTime,
    screenFull
  },
  computed: {
    scale() {
      return this.$store.state.common.scale
    }
  }
}
</script>

<style lang="less" scoped>
  .currentScale{
    font-size: 14px;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .screen-header{
    width: 100%;
    height: 160px;
    .header-top{
      height: 86px;
      padding: 15px;
      padding-bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-image: url('../assets/image/head.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top center;
      .header-time,.header-tool{
        width: 300px;
        line-height: 30px;
      }
      .header-time{
        text-align: left;
      }
      .header-tool{
        text-align: right;
      }
      .header-name{
        h1{
          max-width: 400px;
          line-height: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
  }
</style>
