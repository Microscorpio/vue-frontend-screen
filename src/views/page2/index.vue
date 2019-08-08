<template>
  <section class="container">
    <panel :width="950" :height="590" position="absolute" :top="0" :left="0" class="p20">
      <p class="panel-title">容器无缝滚动</p>
      <div class="marquee-box">
        <marquee :speed="20">
          <gantt-chart 
            :progressDataSource="progressDataSource" 
            :minDate="minDate" 
            :maxDate="maxDate"></gantt-chart>
          <!-- 可以手动指定“copy”插槽 -->
          <!-- <div slot="copy">
            <gantt-chart 
            :progressDataSource="progressDataSource" 
            :minDate="minDate" 
            :maxDate="maxDate"></gantt-chart>
          </div> -->
        </marquee>
      </div>
    </panel>

    <panel :width="950" :height="590" position="absolute" :top="0" :left="970" class="p20">
      <p class="panel-title">环境数据展示</p>
      <div class="flex flex-row mb20">
        <div class="aqi-data-box">
          <aqi-progress :aqiDataList="aqiDataList" :margin="20"></aqi-progress>
        </div>
        <div class="aqi-data-box radius">
          <p class="aqi-data-title">今日空气污染指数</p>
          <div class="aqi-data">
            <radius-progress 
              :size="220"
              :color="renderColor(airVal)" 
              :percent="Math.round((airVal / airTotalVal) * 100)" 
              :total="airTotalVal"></radius-progress>
            <div class="aqi-data-info">
              <p class="info-data">{{airVal}}</p>
              <p class="info-type" :style="{color: renderColor(airVal)}">{{renderType(airVal)}}</p>
            </div>
          </div>
        </div>
      </div>
      <p class="panel-title">环境图片展示(无限左滚)</p>
      <div class="carousel-box">
        <carousel-infinite :dataSource="dataSource" :width="285" :height="200"></carousel-infinite>
      </div>
    </panel>

    <panel :width="1920" :height="290" position="absolute" :top="610" :left="0" class="p20">
      <p class="panel-title">echart</p>
      <div class="flex flex-row">
        <div class="chart-box">
          <statistics-by-pie :height="200" 
            :dataSource="dataSourceByPie" 
            :showLine="true" 
            :borderWidth="0"
            title="环境监控"
            textColor="#ffffff"></statistics-by-pie>
        </div>

        <div class="chart-box">
          <statistics-by-pie :height="200" 
            :dataSource="dataSourceByPie" 
            :borderWidth="0"
            :showCount="false"
            title="环境监控"
            textColor="#ffffff"></statistics-by-pie>
        </div>

        <div class="chart-box">
          <echart-liquid-fill :height="160" title="水球图" :percent="percentVal"></echart-liquid-fill>
        </div>

        <div class="chart-box">
          <echart-liquid-fill :height="160" 
            title="水球图" 
            borderColor="#6739ee"
            :linearColor="['#5e4ce7', '#5556e8']"
            :percent="percentVal2"></echart-liquid-fill>
        </div>
      </div>
    </panel>
  </section>
</template>

<script>
import marquee from '@/components/common/marquee'
import ganttChart from '@/components/common/ganttChart'
import aqiProgress from '@/components/common/aqiProgress'
import carouselInfinite from '@/components/common/carouselInfinite'
import radiusProgress from '@/components/common/radiusProgress/radiusProgress'
import statisticsByPie from '@/components/common/chartStatistics/statisticsByPie'
import echartLiquidFill from '@/components/common/chartStatistics/echartLiquidFill'
import { progressDataSource, imgDataSource } from '@/common/mockData'
import { airColor, airType, randomNum, aqiDataColorList, aqiDataTypeList } from '@/common/utils'
export default {
  components: {
    marquee,
    ganttChart,
    aqiProgress,
    radiusProgress,
    carouselInfinite,
    statisticsByPie,
    echartLiquidFill
  },
  data() {
    return {
      minDate: '2018-02-15',
      maxDate: '2020-05-11',
      progressDataSource: [...progressDataSource],
      aqiDataList: [
        {
          name: '优',
          days: 10,
          color: '#37dd8f',
          unit: '天'
        },
        {
          name: '良',
          days: 15,
          color: '#fea714',
          unit: '天'
        },
        {
          name: '轻度污染',
          days: 3,
          color: '#ee5b3a',
          unit: '天'
        },
        {
          name: '中度污染',
          days: 0,
          color: '#ca011a',
          unit: '天'
        },
        {
          name: '重度污染',
          days: 2,
          color: '#6008c5',
          unit: '天'
        },
        {
          name: '严重污染',
          days: 1,
          color: '#621d0a',
          unit: '天'
        }
      ],
      airTotalVal: 500,
      airVal: randomNum(500),
      percentVal: +Math.random().toFixed(2),
      percentVal2: +Math.random().toFixed(2),
      dataSource: imgDataSource,
      dataSourceByPie: [
        {
          name: aqiDataTypeList[0],
          value: 30,
          rate: 30,
          color: aqiDataColorList[0]
        },
        {
          name: aqiDataTypeList[1],
          value: 25,
          rate: 25,
          color: aqiDataColorList[1]
        },
        {
          name: aqiDataTypeList[2],
          value: 20,
          rate: 20,
          color: aqiDataColorList[2]
        },{
          name: aqiDataTypeList[3],
          value: 15,
          rate: 15,
          color: aqiDataColorList[3]
        },
        {
          name: aqiDataTypeList[4],
          value: 5,
          rate: 5,
          color: aqiDataColorList[4]
        },
        {
          name: aqiDataTypeList[5],
          value: 10,
          rate: 10,
          color: aqiDataColorList[5]
        }
      ]
    }
  },
  methods: {
    renderColor(data) {
      return airColor(data)
    },
    renderType(data) {
      return airType(data)
    }
  }
}
</script>

<style lang="less" scoped>
  .marquee-box{
    width: 100%;
    height: 500px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
  .aqi-data-box{
    width: 50%;
    height: auto;
    &.radius{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .aqi-data-title{
      text-align: center;
      font-size: 16px;
      margin-bottom: 8px;
    }
    .aqi-data{
      width: 220px;
      height: 220px;
      position: relative;
      .aqi-data-info{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .info-data{
          font-size: 40px;
          font-weight: bold;
        }
        .info-type{
          font-size: 20px;
          margin-top: 10px;
          font-weight: bold;
        }
      }
    }
  }
  .carousel-box{
    height: 180px;
  }
  .chart-box{
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
