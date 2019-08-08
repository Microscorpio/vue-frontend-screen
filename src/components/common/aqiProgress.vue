<template>
  <div class="aqi-progress-wrapper">
    <div class="aqi-progress-box"
        v-for="(item, index) in aqiDataList"
        :style="{height: height + 'px', marginTop: margin + 'px'}" :key="index">
      <p class="aqi-progress-title ft14">{{item.name}}</p>
      <div class="aqi-progress" :style="{paddingLeft: defaultWidth + 'px'}">
        <div class="aqi-progress-bar">
          <div class="aqi-progress-default"
              :style="{width: defaultWidth + 'px',left: -defaultWidth+1 + 'px',backgroundColor: item.color, borderRadius: height / 2 + 'px'}"></div>
          <div class="aqi-progress-active"
              :style="{width: (item.days / totalCount) * 100 + '%', minWidth:(height / 2) + 'px', backgroundColor: item.color, borderRadius: height / 2 + 'px'}">
            <span class="aqi-progress-data ft14">{{item.days}}{{item.unit}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'
export default {
  props: {
    aqiDataList: VueTypes.arrayOf(VueTypes.shape({
      name: VueTypes.string.def(''),
      days: VueTypes.number.def(0),
      color: VueTypes.string.def(''),
      unit: VueTypes.string.def('天')
    })),
    height: VueTypes.number.def(20),
    defaultWidth: VueTypes.number.def(50),
    totalCount: VueTypes.number.def(30),
    margin: VueTypes.number.def(20)
  }
}
</script>

<style lang="less" scoped>
  .aqi-progress-wrapper {
    display: flex;
    flex-direction: column;

    .aqi-progress-box {
      display: flex;
      flex-direction: row;
      &:first-child{
        margin-top: 0 !important;
      }

      .aqi-progress-title {
        display: flex;
        flex-shrink: 1;
        width: 80px;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
      }

      .aqi-progress {
        display: flex;
        flex: 1;
        height: 100%;
        margin-left: 10px;

        .aqi-progress-bar {
          position: relative;
          width: 100%;
          height: 100%;

          .aqi-progress-default {
            height: 100%;
            position: absolute;
            top: 0;
            z-index: 1;
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }

          .aqi-progress-active {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            transition: width 1s;
            z-index: 2;
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            max-width: 100%;

            .aqi-progress-data {
              position: absolute;
              height: 100%;
              display: flex;
              align-items: center;
              right: 5px;
              color: #fff;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
