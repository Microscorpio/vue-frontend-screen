<template>
  <div class="date-select">
    <span @click.stop="showDate = !showDate">
      <i class="iconfont iconrili"></i>
      <span class="ml10">{{showTxt}}</span>
      <i class="iconfont iconjiantouxia icon-arrow" :class="{'icon-arrow-up': showDate}"></i>
    </span>
    <ul
      :class="{show: showDate}"
      class="dropdown-list-wrap">
      <li
        @click.stop="handleClickItem(item)"
        :key="index"
        v-for="(item, index) in datelist"
        :class="{active: value === item.sysNo}"
        class="dropdown-list-item">
        {{item.scheduleDate}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "datePicker",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: Number,
      datelist: {
        type:Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        showDate: false
      }
    },
    methods: {
      handleClickItem(item) {
        this.showDate = false;
        this.$emit('change', item.sysNo)
      },
      hideList() {
        this.showDate = false;
      }
    },
    computed: {
      showTxt() {
        let item = this.datelist.find(item => item.sysNo === this.value) || {};
        return item.scheduleDate
      }
    },
    mounted() {
      this.hideList.apply(this);
      document.addEventListener('click', this.hideList, false);
    },
    destroyed() {
      document.removeEventListener('click', this.hideList, false);
    }
  }
</script>

<style lang="less" scoped>
  .date-select {
    position: absolute;
    right: 0;
    top: 15px;
    cursor: pointer;
    z-index: 10;
    .icon-arrow {
      font-size: 12px;
      margin-left: 10px;
      display: inline-block;
      transform: scale(0.6) translateZ(0);
      transition: all .3s;
      &.icon-arrow-up {
        transform:  scale(0.6) rotate(180deg) translateZ(0);
      }
    }
    .dropdown-list-wrap {
      width: 180px;
      margin-left: -90px;
      top: 30px;
    }
  }
</style>
