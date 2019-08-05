<template>
  <div class="gallery-box"
       :style="{height:  height ? height +'px' : '100%', width: width ? width +'px' : '100%'}">
    <div class="gallery-box-content"
         @mouseenter="clearTimer"
         @mouseleave="playLoop">
      <div :class="active===index?'active':''"
           class="gallery-box-item"
           v-for="(item,index) in dataSource"
           :key="index">
        <img v-if="item.type==='img'"
             :src="item.uri"/>
        <div class="video-box" v-if="item.type==='video'">
          <div class="btn-play" @click="playVideo($event)">
            <i class="iconfont" :class="videoClassName"></i>
          </div>
          <video type="video/mp4"
                 :src="active===index?item.uri:''"
                 :poster="item.poster"
                 v-on:canplay="videoCanplay"
                 v-on:ended="videoEnded"
                 v-on:error="videoError"></video>
        </div>
      </div>
      <div class="gallery-box-info" v-if="showInfo">
        <a href="javascript:;" class="info-btn info-btn-prev" @click="prev"><i class="iconfont iconbannerjiantou"></i></a>
        <a href="javascript:;" class="info-btn info-btn-next" @click="next"><i class="iconfont iconbannerjiantou"></i></a>
        <div class="box-info" v-for="(item, index) in dataSource" v-if="active===index"
             :key="index">
          <div class="flex flex-row">
            <div class="info-detail flex flex-1">
              <h2 class="box-info-title ft18">{{item.title}}</h2>
              <p class="box-info-desc ft16" v-html="item.desc"></p>
            </div>
            <div class="page-info ml30">
              {{active+1}}/{{total}}
            </div>
          </div>
        </div>
      </div>
      <div class="gallery-box-dot" v-if="showDot">
        <div class="box-info" v-for="(item, index) in dataSource" v-if="active===index"
             :key="index">
          <div class="flex flex-row">
            <div class="info-detail flex flex-1">
              <h2 class="box-info-title" :title="item.title">{{item.title}}</h2>
              <p class="box-info-desc" :title="item.desc" v-html="item.desc"></p>
            </div>
          </div>
        </div>
        <ul>
          <li v-for="(dot, i) in dataSource"
              :key="i"
              @click="handleDotClick(i)"
              :class="{'active': i === active}"></li>
        </ul>
      </div>
      <div class="gallery-box-button gallery-box-button-prev" v-if="!showInfo">
        <a href="javascript:;" @click="prev"><i class="iconfont iconbannerjiantou"></i></a>
      </div>
      <div class="gallery-box-button gallery-box-button-next" v-if="!showInfo">
        <a href="javascript:;" @click="next"><i class="iconfont iconbannerjiantou"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'
  export default {
    props: {
      dataSource: VueTypes.arrayOf(VueTypes.shape({
        type: VueTypes.oneOf(['img', 'video']),
        uri: VueTypes.string,
        poster: VueTypes.string,
        title: VueTypes.string,
        desc: VueTypes.string
      })),
      showInfo: VueTypes.bool.def(false),
      showDot: VueTypes.bool.def(false),
      onChange: VueTypes.func.def(() => null),
      delay: VueTypes.number.def(5),
      width: VueTypes.number,
      height: VueTypes.number,
      activeIndex: VueTypes.number.def(0)
    },
    computed: {
      videoClassName: function () {
        if (this.videoPlaying) {
          return 'iconzanting';
        } else {
          return 'iconbofang1';
        }
      }
    },
    data: function () {
      return {
        active: this.activeIndex,
        total: 0,
        videoPlaying: false,
        loop: true,
      };
    },
    methods: {
      playLoop() {
        this.total = this.dataSource.length
        const source = this.dataSource[this.active]
        this.onChange(this.active)
        this.slideImage()
        if (source && source.type === 'video') {
          // 当循环到视频 暂停轮播
          this.clearTimer()
          this.videoPlaying = true
        }
      },
      clearTimer() {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
      },
      next() {
        this.clearTimer()
        this.active += 1
        if (this.active >= this.total) {
          this.active = 0
        }
        this.playLoop()
      },
      slideImage() {
        const self = this
        self.clearTimer()
        // 当需要循环播放的时候自动执行next
        if (self.loop) {
          self.timer = setTimeout(() => {
            self.next()
          }, self.delay * 1000)
        }
      },
      prev() {
        this.active -= 1
        if (this.active < 0) {
          this.active = this.total - 1
        }
        this.playLoop()
      },

      playVideo(event) {
        const video = event.target.parentNode.parentNode.querySelector('video');
        if (this.videoPlaying) {
          video.pause();
          this.videoPlaying = false;
          if (event.target.getAttribute('class') === 'btn-play') {
            event.target.style.display = 'flex'
          } else if (event.target.getAttribute('class') === 'iconfont iconzanting') {
            event.target.parentNode.style.display = 'flex'
          }
        } else {
          video.play();
          this.videoPlaying = true;
          if (event.target.getAttribute('class') === 'btn-play') {
            event.target.style.display = 'none'
          } else if (event.target.getAttribute('class') === 'iconfont iconbofang1') {
            event.target.parentNode.style.display = 'none'
          }
        }
      },
      videoCanplay(event) {
        event.target.play()
        if (this.videoPlaying && document.querySelector('.btn-play')) {
          document.querySelector('.btn-play').style.display = 'none'
        }
      },
      videoError(event) {
        if (event && event.returnValue) {
          this.slideImage()
        }
      },
      videoEnded(event) {
        this.videoPlaying = false
        event.target.parentNode.querySelector('.btn-play').style.display = 'flex'
        const video = event.target.parentNode.parentNode.querySelector('video')
        video.pause()
        this.slideImage()
      },
      handleDotClick(i) {
        this.active = i
      }
    },
    mounted() {
      this.playLoop()
    },
    watch: {
      dataSource: {
        deep: true,
        handler: function () {
          this.active = 0
          this.playLoop()
        }
      },
      activeIndex: function (index) {
        this.active = index
      }
    },
    beforeDestroy() {
      this.clearTimer()
    }
  }
</script>
<style lang="less" scoped>
  .gallery-box {
    display: flex;
    .gallery-box-content {
      flex: 1;
      position: relative;
      .gallery-box-item {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        transition: all 0.5s;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          opacity: 1;
          z-index: 2;
        }
        img, video {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .video-box {
        position: relative;
        text-align: center;
        video {
          background-color: #000;
        }
        &:hover {
          .btn-play {
            display: flex !important;
          }
        }
        .btn-play {
          width: 80px;
          height: 80px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          cursor: pointer;
          z-index: 2;
          background-color: rgba(255, 255, 255, .2);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      }
      .gallery-box-dot{
        width: 100%;
        min-height: 66px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        .box-info{
          width: 100%;
          height: 100%;
          .info-detail{
            overflow: hidden;
            padding: 0 20px;
            .box-info-title,.box-info-desc{
              line-height: 20px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .box-info-title{
              font-size: 16px;
              color: #ffffff;
              line-height: 22px;
              margin-bottom: 4px;
            }
            .box-info-desc{
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
        ul{
          position: absolute;
          z-index: 10;
          bottom: 15px;
          width: 100%;
          height: 4px;
          padding-right: 20px;
          font-size: 0;
          text-align: right;
          li{
            display: inline-block;
            vertical-align: top;
            width: 4px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);
            margin-left: 8px;
            cursor: pointer;
            &.active{
              width: 12px;
              transition: all 0.3s;
              background-color: rgba(255, 255, 255);
            }
          }
        }
      }
      .gallery-box-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-top: -20px;
        background-color: rgba(0,0,0,0.4);
        position: absolute;
        z-index: 99;
        a{
          text-align: center;
          line-height: 40px;
          text-decoration: none;
          display: block;
          color: #ffffff;
        }
      }
      .gallery-box-button-prev {
        top: 50%;
        left: 20px;
      }
      .gallery-box-button-next {
        top: 50%;
        right: 20px;
        a{
          transform: rotate(-180deg);
        }
      }

      .gallery-box-info{
        position: absolute;
        width: 100%;
        height: 60px;
        overflow: hidden;
        background-color: rgba(0,0,0,0.2);
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        padding: 0 50px;
        .info-btn{
          display: block;
          width: 50px;
          position: absolute;
          line-height: 60px;
          text-align: center;
          top: 0;
          color: #ffffff;
          text-decoration: none;
          &.info-btn-prev{
            left: 0;
          }
          &.info-btn-next{
            transform: rotate(-180deg);
            right: 0;
          }
        }
        .box-info{
          width: 100%;
          height: 100%;
          .info-detail{
            overflow: hidden;
            .box-info-title,.box-info-desc{
              line-height: 30px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .page-info{
          white-space: nowrap;
          line-height: 60px;
        }
      }
    }
  }
</style>
