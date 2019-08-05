<template>
  <div class="carousel-wrapper" @mouseenter="clearTimer" @mouseleave="slideImage">
    <ul v-if="dataSource.length > 0" 
      :style="{transform:`translate(-${activeIndex*(width + 20)}px)`,transition: noTransform ? '': `transform 0.5s`}">
      <li v-for="(item, index) in dataSource"
          :style="{width: width + 20 +'px'}"
          @click="clickItem(item)"
          :key="index">
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
  },
  data() {
    return {
      activeIndex: 0,
      timer: null,
      noTransform: false
    }
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    next() {
      this.clearTimer()
      if (this.dataSource && this.dataSource.length > 0) {
        if (this.dataSource.length <= 4) return;
        this.noTransform = false
        this.activeIndex++
        if (this.activeIndex === this.dataSource.length - 3) {
          this.activeIndex = 0
        }
        this.slideImage()
      }
    },
    slideImage() {
      const self = this
      self.clearTimer()
      self.timer = setTimeout(() => {
        self.next()
      }, 1500)
    },
  },
  mounted() {
    this.slideImage()
  }
}
</script>

<style lang="less" scoped>
.carousel-wrapper{
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
}

</style>
