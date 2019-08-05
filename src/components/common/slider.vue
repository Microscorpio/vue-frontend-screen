<template>
  <div class="slider-wrapper" @mouseenter="clearInterval" @mouseleave="startInterval">
    <div class="slider-item"
         v-if="len > 0"
         :style="{
         width:len*100+'%',
         transform:`translate(-${activeIndex*100/len}%)`,
         transition:isResetIndex? '': `transform ${transitionInterval/1000}s`}">
      <div class="slider-item-content"
         v-if="listComputed.length > 0"
         v-for="(item,i) in listComputed"
         :key="i"
         @click="clickItem(item)"
         :style="{width:100/len+'%'}">
        <div class="item-box">
          <div class="item-img">
            <img-box :src="item.uri" />
          </div>
          <div class="item-data">
            <div class="data-title">{{item.title}}</div>
            <div class="data-desc" v-html="item.desc"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="prev" @click="prev" v-if="showPrevNextBtn"><i class="iconfont iconbannerjiantou"></i></div>
    <div class="next" @click="next" v-if="showPrevNextBtn"><i class="iconfont iconbannerjiantou"></i></div>
    <ul class="dots" v-if="showDots && listComputed.length > 0">
      <li class="dot" v-for="(n, i) in (listComputed.length-2)"
          :key="i"
          @click="activeDotFn(n)"
          :class="{'on': activeIndex === n}"></li>
    </ul>
  </div>
</template>
<script>
  import VueTypes from 'vue-types'
  export default {
    props: {
      dataSource: VueTypes.array,
      interval: VueTypes.number.def(3000),
      showDots: VueTypes.bool.def(true),
      showPrevNextBtn: VueTypes.bool.def(true)
    },
    data() {
      return {
        activeIndex: 1,
        timer: null,
        isTransitioning: false, // 是否处于过度动画执行期间
        transitionInterval: 500, // 过渡动画时长
        isResetIndex: false, // 是否为瞬间重置定位，在watch中初始化，重定位会取消transition动画,
        listComputed: [],
        len: 0
      }
    },
    methods: {
      clickItem(item) {
        this.$emit('clickItem', item)
      },
      activeDotFn(n) {
        this.activeIndex = n
      },
      prev() {
        if (this.isTransitioning) return
        this.activeIndex--
      },
      next() {
        if (this.isTransitioning) return
        this.activeIndex++
      },
      startInterval() {
        // 启动自动轮播函数
        this.timer = setInterval(() => {
          // 对activeIndex进行操作
          this.activeIndex++
        }, this.interval)
      },
      clearInterval() {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    },
    mounted() {
      this.startInterval()
    },
    watch: {
      dataSource: {
        deep: true,
        handler: function (val) {
          if (val && val.length > 0) {
            let firstItem = val[0];
            let lastItem = val[val.length - 1]
            this.listComputed = [lastItem].concat(val, [firstItem])
            this.len = this.listComputed.length
          }
        }
      },
      activeIndex(newActiveIndex, oldActiveIndex) {
        // 监听activeIndex的变化，当activeIndex到达边界的时候进行复位
        // if(是轮播图从最后一张切换到第一张 || 是轮播图从第一张切换到最后一张) 是属于瞬间归位，直接return，不执行以后所有函数
        if ((newActiveIndex === 1 && oldActiveIndex === (this.len - 1))
          || (oldActiveIndex === 0 && newActiveIndex === this.len - 2)) {
          this.isResetIndex = true
          return
        }
        this.isResetIndex = false
        // 为true时表示正在进行transition过渡中，不可以进行切换轮播
        this.isTransitioning = true

        setTimeout(() => {
          // 瞬间归位需要取消transition过渡
          // 以下两种情况是瞬间归位时activeIndex变化
          if (this.activeIndex === 0) {
            this.activeIndex = this.len - 2
          } else if (this.activeIndex === (this.len - 1)) {
            this.activeIndex = 1
          }
          // 为false时表示transition过渡结束，可以进行切换轮播
          this.isTransitioning = false
        }, this.transitionInterval)
      }
    }
  }
</script>

<style lang="less" scoped>
  .slider-wrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    &:hover {
      .prev,
      .next {
        opacity: 1;
      }
    }
    .slider-item {
      height: 100%;
      .slider-item-content {
        display: inline-block;
        width: 100%;
        height: 100%;
        .item-box{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          .item-img{
            width: 300px;
            height: 100%;
            display: flex;
            flex-shrink: 1;
            overflow: hidden;
            img{
              width: 100%;
              height: auto;
            }
          }
          .item-data{
            display: flex;
            flex: 1;
            flex-direction: column;
            padding-left: 20px;
            .data-title{
              font-size: 20px;
              line-height: 24px;
              margin-bottom: 10px;
              text-align: justify;
            }
            .data-desc{
              font-size: 14px;
              text-align: justify;
            }
          }
        }
      }
    }
    .prev,
    .next {
      opacity: 0;
      position: absolute;
      top: 50%;
      width: 40px;
      height: 40px;
      margin-top: -20px;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      i.iconfont{
        font-size: 20px;
        color: #ffffff;
      }
    }
    .prev {
      left: 4%;
    }
    .next {
      right: 4%;
      transform: rotate(-180deg);
    }
    .dots {
      display: table;
      margin: 0 auto;
      transform: translateY(-120%);
      .dot {
        display: inline-block;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        margin: 6px;
        border: 2px solid transparent;
        border-radius: 50%;
        background: rgba(0, 0, 0, .7);
        cursor: pointer;
        &.on {
          border: 2px solid #ffffff;
        }
      }
    }
  }
</style>
