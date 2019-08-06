<template>
  <stage>
    <stage-header></stage-header>
    <dashboard>
      <router-view></router-view>
    </dashboard>
  </stage>
</template>

<script>
import stage from '@/components/stage/stage'
import stageEvent, { EVENT_SCALE_CHANGE } from '@/components/stage/stageEvent'
import stageHeader from './header'
import dashboard from './dashboard'
export default {
  components: {
    stage,
    stageHeader,
    dashboard
  },
  created() {
    this.onScaleChange = (scale) => {
      // 保存&更新scale值的变化
      this.$store.commit('common/scale', scale);
    }
  },
  mounted() {
    stageEvent.$on(EVENT_SCALE_CHANGE, this.onScaleChange.bind(this))
  },
  beforeDestroy() {
    stageEvent.$off(EVENT_SCALE_CHANGE, this.onScaleChange)
  }
}
</script>
