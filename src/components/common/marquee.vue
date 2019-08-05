<template>
  <div class="wrapper-box"
       @mouseenter="onMouseEnterWithContainer"
       @mouseleave="onMouseLeaveWithContainer"
       ref="root">
    <div class="container"
         ref="container"
         :style="containerStyle">
      <div class="default-content" ref="defaultContent">
        <slot></slot>
      </div>
      <div class="copy-content" ref="copyContent" style="visibility: hidden">
        <slot name="copy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      /**
       * 滚动的速度
       * 默认10px/s
       * */
      speed: VueTypes.number.def(10)
    },
    data: function () {
      return {
        containerStyle: {}
      };
    },
    created() {
    },
    methods: {
      onMouseEnterWithContainer: function () {
        this.pause();
      },
      onMouseLeaveWithContainer: function () {
        this.replay();
      },
      getContainerHeight() {
        const {root} = this.$refs;
        if (root) {
          let computedStyle = window.getComputedStyle(root)
          return parseFloat(computedStyle.height)
        }
        return 0
      },
      getContentHeight() {
        const {defaultContent} = this.$refs;
        if (defaultContent) {
          let computedStyle = window.getComputedStyle(defaultContent)
          return parseFloat(computedStyle.height)
        }
        return 0
      },
      reset() {
        this.containerStyle = {
          WebkitTransition: 'none',
          transition: 'none',
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)',
        };
      },
      getContainerTranslateY: function () {
        const {container} = this.$refs;
        if (container) {
          const transform = window.getComputedStyle(container).transform;

          const index = transform.indexOf('(');
          const last = transform.lastIndexOf(')');
          const values = transform.substring(index + 1, last).split(',');
          if (values.length === 16) {
            return parseFloat(values[values.length - 3]);
          }
          return parseFloat(values[values.length - 1]);
        }
        return 0;
      },
      pause: function () {
        const y = this.getContainerTranslateY()
        this.containerStyle = {
          WebkitTransform: `translate3d(0,${y}px,0)`,
          transform: `translate3d(0,${y}px,0)`,
        };

      },
      replay: function () {
        const containerHeight = this.getContainerHeight();
        const contentHeight = this.getContentHeight();
        if (contentHeight > containerHeight) {
          const y = this.getContainerTranslateY();
          const time = ((contentHeight + y) / this.speed) * 1000;
          const transitionStr = `all ${time}ms linear`;
          const transformStr = `translate3d(0,-${contentHeight}px,0)`;
          this.containerStyle = {
            WebkitTransition: transitionStr,
            transition: transitionStr,
            WebkitTransform: transformStr,
            transform: transformStr,
          };
        }
      },
      start() {
        const contentHeight = this.getContentHeight();
        const time = (contentHeight / this.speed) * 1000;
        const transitionStr = `all ${time}ms linear`;
        const transformStr = `translate3d(0,-${contentHeight}px,0)`;
        this.containerStyle = {
          WebkitTransition: transitionStr,
          transition: transitionStr,
          WebkitTransform: transformStr,
          transform: transformStr,
        };
      },
      restart: function () {
        this.reset();
        if (this.$refs.copyContent.style.visibility === 'hidden') return
        this.$nextTick(() => {
          this.start();
        })
      },
      copyContent() {
        const {copyContent, defaultContent} = this.$refs;
        if (!this.$slots.copy) {
          if (defaultContent.childNodes.length > 0) {
            let i = 0;
            const len = defaultContent.childNodes.length;
            for (; i < len; i++) {
              copyContent.appendChild(defaultContent.childNodes[i].cloneNode(true));
            }
          }
        }
        copyContent.style.visibility = 'visible';
      },
      resetCopyContent: function () {
        const {copyContent} = this.$refs;
        if (copyContent) {
          copyContent.style.visibility = 'hidden';
          if (!this.$slots.copy) {
            for (let i = 0; i < copyContent.childNodes.length; i++) {
              copyContent.removeChild(copyContent.childNodes[i]);
            }
          }
        }
      },
      play() {
        this.reset();
        this.$nextTick(() => {
          this.resetCopyContent();
          const containerHeight = this.getContainerHeight();
          let contentHeight = this.getContentHeight();
          if (contentHeight > containerHeight) {
            this.copyContent();
            this.start()
          }
        })
      },
      onTransitionEnd: function () {
        this.restart();
      }
    },
    mounted() {
      const {container} = this.$refs;
      container.addEventListener('webkitTransitionEnd', this.onTransitionEnd, false);
      this.play()
    },
    beforeDestroy() {
      const {container} = this.$refs;
      container.removeEventListener('webkitTransitionEnd', this.onTransitionEnd, false);
    }
  }
</script>
<style lang="less" scoped>
  .wrapper-box {
    overflow: hidden;
    height: 100%;
  }
</style>
