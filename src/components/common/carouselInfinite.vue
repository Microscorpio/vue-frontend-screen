<template>
  <div
    @mouseenter="clearTimer"
    @mouseleave="play"
    class="carousel-infinite">
    <ul v-if="dataSource.length > 0" 
      :style="{transform: 'translate3d( -'+ (activeIndex * (width + 20)) +'px, 0, 0)'}"
      :class="{'transition': transition }">
      <li v-for="(item, index) in dataList"
          @click="clickItem(item)"
          :style="{width: width + 20 +'px'}"
          :key="index"
          >
        <div :style="{width: width+'px', height: height+'px'}">
          <img
            class="carousel-img"
            v-if="item.uri"
            :src="item.uri" />
          <div v-else class="default-img-wrap">
            <img
              class="default-img"
              src="../../assets/image/defaultCarouselImg.png" alt="">
          </div>
        </div>
        <p class="carousel-title text-overflow" :title="item.title">{{item.title}}</p>
        <p class="carousel-date">{{item.date}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
  import VueTypes from 'vue-types'
  export default {
    props: {
      clickItem: VueTypes.func.def(() => null),
      showCount: VueTypes.number.def(2),
      width: VueTypes.number.def(235),
      height: VueTypes.number.def(154),
      dataSource: VueTypes.arrayOf(VueTypes.shape({
        uri: VueTypes.string,
        title: VueTypes.string,
        date: VueTypes.string,
        childFiles:VueTypes.array,
        content:VueTypes.string
      })),
      delay: VueTypes.number.def(4),
    },
    watch: {
      dataSource(newVal) {
        if(newVal && newVal.length > this.showCount) {
          this.dataList = [...this.dataSource, ...this.dataSource]
        }
      }
    },
    data() {
      return {
        dataList: [],
        activeIndex: 0,
        transition: true,
        timer: null,
        transitionTimer: null
      }
    },
    methods: {
      clearTimer() {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
      },
      play() {
        if (this.timer) {
          clearInterval(this.timer)
        } else {
          this.timer = setInterval(() => {
            this.next()
          }, this.delay * 1000)
        }
      },
      next() {
        this.activeIndex++
        if (this.transitionTimer) {
          clearTimeout(this.transitionTimer)
        }
        if (this.activeIndex === this.dataSource.length){
          this.transitionTimer = setTimeout(() => {
            this.activeIndex = 0
            this.transition = false
          }, 500);
        }
        this.transition = true
      }
    },
    mounted() {
      this.play()
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      if (this.transitionTimer) {
        clearTimeout(this.transitionTimer)
      }
    }
  }
</script>
<style lang="less" scoped>
  .carousel-infinite{
    width: 100%;
    height: 100%;
    overflow: hidden;
    ul{
      font-size: 0;
      white-space: nowrap;
      li{
        cursor: pointer;
        display: inline-block;
        vertical-align: top;
        padding: 10px;
        .carousel-img{
          height: 100%;
          width: 100%;
        }
        .default-img-wrap {
          width: 100%;
          height: 100%;
          background-color: #BFCADC;
          display: flex;
          align-items: center;
          justify-content: center;
          .default-img {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
    .carousel-title {
      font-weight: bold;
      line-height: 20px;
      margin-top: 5px;
      color: #C4D3FF;
      text-align: center;
      font-size: 14px;
    }
    .carousel-date {
      font-size: 12px;
      font-weight: 300;
      color: #AEB8D4;
      line-height: 17px;
      text-align: center;
      margin-top: 5px;
    }
    .transition {
      transition: all 0.5s;
    }
  }
</style>
