<template>
  <stage>
    <stage-header></stage-header>
    <router-view></router-view>
  </stage>
</template>

<script>
import stage from '@/components/stage/stage'
import stageEvent, { EVENT_SCALE_CHANGE } from '@/components/stage/stageEvent'
import stageHeader from './header'
export default {
  components: {
    stage,
    stageHeader
  },
  created() {
    this.onScaleChange = (scale) => {
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
