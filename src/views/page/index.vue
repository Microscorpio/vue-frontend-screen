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
      <p class="panel-title">echart图标</p>
      <statistics-by-line :height="200" :xAxisData="xAxisData" :dataSource="dataSourceByChart"></statistics-by-line>
    </panel>

    <panel :width="626" :height="290" position="absolute" :top="610" :left="646" class="p20">
      <p class="panel-title">echart图标</p>
      <statistics-by-bar :height="200" :xAxisData="xAxisData" :dataSource="dataSourceByChart"></statistics-by-bar>
    </panel>

    <panel :width="628" :height="290" position="absolute" :top="610" :left="1292" class="p20">
      <p class="panel-title">echart图标</p>
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
      progressDataSource: [
        {
          projectSysNo: 1,
          projectSysName: '项目1',
          processPlanName: '节点1',
          actualEndTime: '2019-04-02',
          actualStartTime: '2018-02-15',
          actuallyFinishTime: null,
          description: '提前结束',
          name: '项目节点1',
          planEndTime: '2019-05-15',
          planFinishDays: 100,
          planStartTime: '2018-02-15',
          status: 2,
          delayDays: 0
        },
        {
          projectSysNo: 1,
          projectSysName: '项目1',
          processPlanName: '节点2',
          actualEndTime: '2019-04-02',
          actualStartTime: '2018-10-10',
          actuallyFinishTime: null,
          description: '提前结束',
          name: '项目节点2',
          planEndTime: '2019-05-15',
          planFinishDays: 100,
          planStartTime: '2018-09-15',
          status: 2,
          delayDays: 0
        },
        {
          projectSysNo: 1,
          projectSysName: '项目1',
          processPlanName: '节点2',
          actualEndTime: null,
          actualStartTime: '2018-10-10',
          actuallyFinishTime: null,
          description: '进行中已延期',
          name: '项目节点3',
          planEndTime: '2019-05-15',
          planFinishDays: 100,
          planStartTime: '2018-04-15',
          status: 1,
          delayDays: 30
        },
        {
          projectSysNo: 1,
          projectSysName: '项目1',
          processPlanName: '节点2',
          actualEndTime: null,
          actualStartTime: '2018-12-10',
          actuallyFinishTime: null,
          description: '提前开始进行中',
          name: '项目节点4',
          planEndTime: '2019-8-15',
          planFinishDays: 100,
          planStartTime: '2018-12-15',
          status: 1,
          delayDays: 0
        },
        {
          projectSysNo: 1,
          projectSysName: '项目1',
          processPlanName: '节点5',
          actualEndTime: null,
          actualStartTime: '2018-10-10',
          actuallyFinishTime: null,
          description: '进行中',
          name: '项目节点5',
          planEndTime: '2019-9-15',
          planFinishDays: 100,
          planStartTime: '2018-03-15',
          status: 1,
          delayDays: 0
        },
        {
          projectSysNo: 1,
          projectSysName: '项目1',
          processPlanName: '节点5',
          actualEndTime: null,
          actualStartTime: null,
          actuallyFinishTime: null,
          description: '已延期',
          name: '项目节点5',
          planEndTime: '2019-10-15',
          planFinishDays: 100,
          planStartTime: '2018-07-15',
          status: 0,
          delayDays: 40
        },
        {
          projectSysNo: 2,
          projectSysName: '项目2',
          processPlanName: '节点1',
          actualEndTime: '2019-04-02',
          actualStartTime: '2018-02-15',
          actuallyFinishTime: null,
          description: '提前结束',
          name: '项目2节点1',
          planEndTime: '2019-05-15',
          planFinishDays: 100,
          planStartTime: '2018-02-15',
          status: 2
        },
        {
          projectSysNo: 2,
          projectSysName: '项目2',
          processPlanName: '节点2',
          actualEndTime: null,
          actualStartTime: '2018-10-10',
          actuallyFinishTime: null,
          description: '进行中',
          name: '项目2节点2',
          planEndTime: '2019-10-15',
          planFinishDays: 100,
          planStartTime: '2018-03-15',
          status: 1,
          delayDays: 0
        },
        {
          projectSysNo: 2,
          projectSysName: '项目2',
          processPlanName: '节点3',
          actualEndTime: null,
          actualStartTime: '2018-12-10',
          actuallyFinishTime: null,
          description: '提前开始已延期',
          name: '项目2节点3',
          planEndTime: '2019-6-15',
          planFinishDays: 100,
          planStartTime: '2019-03-15',
          status: 1,
          delayDays: 20
        },
        {
          projectSysNo: 2,
          projectSysName: '项目2',
          processPlanName: '节点3',
          actualEndTime: null,
          actualStartTime: '2018-10-10',
          actuallyFinishTime: null,
          description: '进行中',
          name: '项目2节点4',
          planEndTime: '2019-10-15',
          planFinishDays: 100,
          planStartTime: '2018-09-15',
          status: 1,
          delayDays: 0
        },
      ],
      dataSource: [
        {
          type: 'img',
          uri: require('@/assets/image/bg.jpg'),
          poster: '',
          title: '',
          desc: ''
        },
        {
          type: 'img',
          uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565084670719&di=f3ed73d3eb1a811e95eb6fb2779a6eb7&imgtype=0&src=http%3A%2F%2Fimg.smzy.com%2FSoft%2FUploadPic%2F2015-9%2F20159816584522855.jpg',
          poster: '',
          title: '',
          desc: ''
        },
        {
          type: 'img',
          uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565084670847&di=a41be477467105bc7f37abbe83e440df&imgtype=0&src=http%3A%2F%2Fpic61.nipic.com%2Ffile%2F20150228%2F6116345_172034157715_2.jpg',
          poster: '',
          title: '',
          desc: ''
        },
        {
          type: 'img',
          uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565084671012&di=669a2d0e38e4263864989f95d64927a1&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F140925%2F330751-1409250T02556.jpg',
          poster: '',
          title: '',
          desc: ''
        },
        {
          type: 'video',
          uri: 'https://vdn.vzuu.com/SD/27f0b226-b686-11e9-9ef9-0a580a45c66b.mp4?disable_local_cache=1&bu=com&expiration=1565078609&auth_key=1565078609-0-0-1fd8a6cb74ec11c714c79ccfdcd646b2&f=mp4&v=ali',
          poster: '',
          title: '',
          desc: ''
        }
      ],
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

