<template>
  <div class='wrapper'
       :style="{
          width: radius * 2 + 'px',
          height: radius * 2 + 'px',
          borderColor: color,
          backgroundColor: bgColor
       }">
    <div class='pointer'
         :style="{
            transform: 'rotate('+ deg +'deg)',
            borderColor: color,
            backgroundColor: color,
            transition: 'transform ' + 'linear ' + time + 's'
         }">
      <div class="pointer-before"
           :style="{height: (radius - 5) + 'px', backgroundColor: color}"></div>
    </div>
    <div class="name word-nowrap"
         :style="{paddingTop: radius + 'px', color: color}">{{name}}</div>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  export default {
    props: {
      name: VueTypes.string.def(''),
      deg: VueTypes.number.def(0),
      radius: VueTypes.number.def(100),
      warning: VueTypes.bool.def(false),
      onlineStatus: VueTypes.bool.def(false),
      highlight: VueTypes.bool.def(false)
    },
    computed: {
      time () {
        return this.deg * 0.1
      },
      color: function () {
        if (this.onlineStatus) {
          if (this.warning) {
            return '#D84C77'
          }
          return '#B9E88B'
        } else {
          return '#ccc'
        }
      },
      bgColor: function () {
        if (this.onlineStatus) {
          if (this.warning) {
            if (this.highlight) {
              return 'rgba(216,76,119,0.5)'
            }
            return 'rgba(216,76,119,0.2)'
          } else {
            if (this.highlight) {
              return 'rgba(185,232,139,0.5)'
            }
            return 'rgba(185,232,139,0.2)'
          }
        } else {
          if (this.highlight) {
            return 'rgba(204,204,204,0.5)'
          }
          return 'rgba(204,204,204,0.2)'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pointer {
    width: 10px;
    height: 10px;
    border: 2px solid white;
    border-radius: 50%;
    position: relative;
    transform: rotate(0deg);
  }

  .pointer-before {
    display: flex;
    width: 2px;
    background: white;
    content: '';
    bottom: 100%;
    left: 50%;
    position: absolute;
    margin-left: -1px;
  }

  .name {
    display: flex;
    font-size: 14px;
    position: absolute;
    color: #B8E986;
    align-items: center;
    justify-content: center;
  }
</style>
