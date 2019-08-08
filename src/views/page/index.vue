<template>
  <section class="container">
    <panel :width="950" :height="590" position="absolute" :top="0" :left="0" class="p20">
      <p class="panel-title">横道图</p>
      <gantt-chart 
        :progressDataSource="progressDataSource" 
        :minDate="minDate" 
        :maxDate="maxDate"></gantt-chart>
    </panel>

    <panel :width="950" :height="590" position="absolute" :top="0" :left="970" class="p20">
      <p class="panel-title">banner滚动(图片+视频)</p>
      <gallery-box :dataSource="dataSource" :height="505"></gallery-box>
    </panel>

    <panel :width="626" :height="290" position="absolute" :top="610" :left="0" class="p20">
      <p class="panel-title">echart图表</p>
      <statistics-by-line :height="200" :xAxisData="xAxisData" :dataSource="dataSourceByChart"></statistics-by-line>
    </panel>

    <panel :width="626" :height="290" position="absolute" :top="610" :left="646" class="p20">
      <p class="panel-title">echart图表</p>
      <statistics-by-bar :height="200" :xAxisData="xAxisData" :dataSource="dataSourceByChart"></statistics-by-bar>
    </panel>

    <panel :width="628" :height="290" position="absolute" :top="610" :left="1292" class="p20">
      <p class="panel-title">echart图表</p>
      <statistics-by-bar-and-line :height="200" :xAxisData="xAxisData" :dataSource="dataSourceByChart2"></statistics-by-bar-and-line>
    </panel>
  </section>
</template>

<script>
import ganttChart from '@/components/common/ganttChart'
import galleryBox from '@/components/common/galleryBox'
import statisticsByLine from '@/components/common/chartStatistics/statisticsByLine'
import statisticsByBar from '@/components/common/chartStatistics/statisticsByBar'
import statisticsByBarAndLine from '@/components/common/chartStatistics/statisticsByBarAndLine'
import { randomChartList, randomArray } from '@/common/utils'
import { progressDataSource, imgListDataSource } from '@/common/mockData'
export default {
  components: {
    ganttChart,
    galleryBox,
    statisticsByLine,
    statisticsByBar,
    statisticsByBarAndLine
  },
  data() {
    return {
      minDate: '2018-02-15',
      maxDate: '2020-05-11',
      progressDataSource: [...progressDataSource],
      dataSource: [...imgListDataSource],
      xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      dataSourceByChart: [
        {
          name: '项目进度',
          lineColor: '#2E76D6',
          offsetTopColor: 'rgba(46,118,214,0.7)',
          offsetBottomColor: 'rgba(46,118,214,1)',
          data: randomChartList(12, '%')
        },
        {
          name: '项目进度2',
          lineColor: '#02c8dc',
          offsetTopColor: 'rgba(2,200,220,0.7)',
          offsetBottomColor: 'rgba(2,200,220,1)',
          data: randomChartList(12, '%')
        }
      ],
      dataSourceByChart2: [
        {
          type: 'bar',
          name: '项目进度',
          color: '#2E76D6',
          offsetTopColor: 'rgba(46,118,214,0.7)',
          offsetBottomColor: 'rgba(46,118,214,1)',
          data: randomArray(12)
        },
        {
          type: 'line',
          name: '项目进度2',
          color: '#02c8dc',
          offsetTopColor: 'rgba(2,200,220,0.7)',
          offsetBottomColor: 'rgba(2,200,220,1)',
          data: randomArray(12)
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>

