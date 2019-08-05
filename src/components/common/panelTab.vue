<template>
  <div class="panel-tab flex flex-row">
    <ul>
      <li v-for="(item, index) in tabList"
          :class="{'active': activeIndex === index}"
          @click="handleClickTab(index, item)"
          :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeIndex: this.currentIndex
    }
  },
  methods: {
    handleClickTab(index, item) {
      this.activeIndex = index
      this.$emit('handleClickTab', item)
    }
  }
}
</script>

<style lang="less" scoped>
  .panel-tab{
    position: relative;
    z-index: 1;
    ul{
      display: flex;
      flex-direction: row;
      li{
        width: 97px;
        height: 30px;
        border: 1px solid #006DFF;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #C4D3FF;
        background-color: transparent;
        margin-left: 4px;
        cursor: pointer;
        &:first-child{
          margin-left: 0;
        }
        &.active{
          background-color: #006DFF;
        }
      }
    }
  }
</style>
