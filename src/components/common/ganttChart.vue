<template>
  <div class="progressWarning">
    <div class="currentDaySign"
      v-if="currentDateDiff && maxDateDiff"
      :style="{paddingLeft: (nameWidth + addrWidth + nodeWidth + progressPaddingWidth) + 'px',
      paddingRight: progressPaddingWidth + 'px'}">
      <div class="signBox">
        <div class="signLine" :style="{left: computePercentage(currentDateDiff)}"></div>
      </div>
    </div>
    <el-table
      :data="progressDataSource"
      :show-header="false"
      :span-method="objectSpanMethod"
      border
      style="width: 100%;">
      <el-table-column
        prop="projectSysName"
        :width="nameWidth">
      </el-table-column>
      <el-table-column
        :width="addrWidth">
        <template slot-scope="scope">
          {{scope.row.processPlanName || '--'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        :width="nodeWidth">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div class="progressWarning-Bar">
            <div class="begin-line sign-line"
              :style="{left: computePercentage(dateDifference(minPlanStartTime, scope.row.planStartTime))}"></div>
            <div class="progress-bar-box"
                 @mousemove="handleShowInfo(scope.row, $event)"
                 @mouseleave="handleHideInfo">
              <div class="progress-info"
                   :style="{left: computePercentage(dateDifference(minPlanStartTime, scope.row.planEndTime))}">
                    {{formatStatus(scope.row.status)}} {{scope.row.description}} <span v-if="scope.row.delayDays > 0">：{{scope.row.delayDays}}天</span>
                   </div>
              <div class="plan-progress-bar progress-bar"
                :style="{
                  left: computePercentage(dateDifference(minPlanStartTime, scope.row.planStartTime)),
                  width: computePercentage(dateDifference(scope.row.planStartTime, scope.row.planEndTime)),
                  backgroundColor: '#EDEDED'
              }"></div>
              <div class="real-progress-bar progress-bar"
                v-if="!!scope.row.actualStartTime"
                :style="{
                  left: computePercentage(dateDifference(minPlanStartTime, scope.row.actualStartTime)),
                  width: computePercentage(dateDifference(scope.row.actualStartTime, scope.row.actualEndTime ? scope.row.actualEndTime : getCurrentDay())),
                  backgroundColor: warningColor(scope.row.delayDays, scope.row.status)
                }"></div>
            </div>
            <div class="end-line sign-line"
              :style="{left: computePercentage(dateDifference(minPlanStartTime, scope.row.planEndTime))}"></div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="progress-info-box" ref="progressInfoBox">
      <ul>
        <li>
          <span class="title">施工状态：</span>
          <p>{{formatStatus(infoData.status)}}</p>
        </li>
        <li>
          <span class="title">预警状态：</span>
          <p>{{infoData.description || '--'}}</p>
        </li>
        <li>
          <span class="title">节点名称：</span>
          <p>{{infoData.name || '--'}}</p>
        </li>
        <li>
          <span class="title">计划开始时间：</span>
          <p>{{infoData.planStartTime || '--'}}</p>
        </li>
        <li>
          <span class="title">计划结束时间：</span>
          <p>{{infoData.planEndTime || '--'}}</p>
        </li>
        <li>
          <span class="title">实际开始时间：</span>
          <p>{{infoData.actualStartTime || '--'}}</p>
        </li>
        <li>
          <span class="title">实际结束时间：</span>
          <p>{{infoData.actualEndTime || '--'}}</p>
        </li>
        <li>
          <span class="title">计划工期：</span>
          <p>{{infoData.planFinishDays || '--'}} 天</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import VueTypes from 'vue-types'
export default {
  props: {
    progressDataSource: VueTypes.array.def([]),
    minDate: VueTypes.string.def(''),
    maxDate: VueTypes.string.def('')
  },
  data() {
    return {
      nameWidth: 100,
      addrWidth: 150,
      nodeWidth: 150,
      progressPaddingWidth: 50,
      minPlanStartTime: '',
      maxPlanEndTime: '',
      maxDateDiff: 0,
      currentDateDiff: 0,
      infoData: {
        actualEndTime: null,
        actualStartTime: null,
        actuallyFinishTime: null,
        description: null,
        name: null,
        planEndTime: null,
        planFinishDays: null,
        planStartTime: null,
        status: 1
      },
      spanArr: [],
      position: 0
    }
  },
  methods: {
    handleShowInfo(data, e) {
      this.infoData = data
      const progressInfoBox = this.$refs.progressInfoBox
      const progressInfoBoxWidth = progressInfoBox.offsetWidth
      const progressInfoBoxHeight = progressInfoBox.offsetHeight
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const offset = 20
      let X
      let Y
      if (e.clientX + progressInfoBoxWidth + offset >= windowWidth) {
        X = e.clientX - progressInfoBoxWidth - offset
      } else {
        X = e.clientX + offset
      }
      if (e.clientY + progressInfoBoxHeight + offset >= windowHeight) {
        Y = windowHeight - progressInfoBoxHeight - offset
      } else {
        Y = e.clientY + offset
      }
      progressInfoBox.style.left = X + 'px'
      progressInfoBox.style.top = Y + 'px'
      // progressInfoBox.style.display = 'block'
    },
    handleHideInfo() {
      this.$refs.progressInfoBox.style.display = 'none'
    },
    rowspan(idx, prop) {
      this.spanArr[idx] = []
      this.position = 0
      this.progressDataSource.forEach((item,index) => {
        if( index === 0){
          this.spanArr[idx].push(1)
          this.position = 0
        }else{
          if(this.progressDataSource[index][prop] === this.progressDataSource[index-1][prop] ){
            // 有相同项
            this.spanArr[idx][this.position] += 1
            // 名称相同后往数组里面加一项0
            this.spanArr[idx].push(0)
          }else{
            // 同列的前后两行单元格不相同
            this.spanArr[idx].push(1)
            this.position = index
          }
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      for(let i = 0; i < 2; i++) {
        if (columnIndex === i && this.spanArr.length > 0) {
          const _row = this.spanArr[i][rowIndex]
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    },
    getCurrentDay() {
      // 获取当前日期
      const date = new Date()
      let nowMonth = date.getMonth() + 1
      let strDate = date.getDate()
      const seperator = '-'
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = '0' + nowMonth
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return date.getFullYear() + seperator + nowMonth + seperator + strDate
    },
    refreshData() {
      const self = this
      self.rowspan(0, 'projectSysNo')
      self.rowspan(1, 'processPlanName')
      self.minPlanStartTime = self.minDate
      self.maxDateDiff = self.dateDifference(self.minDate, self.maxDate)
      self.currentDateDiff = self.dateDifference(self.minDate, self.getCurrentDay())
    },
    dateDifference(Date1, Date2) {
      // Date1和Date2是yyyy-MM-dd格式
      let newDate1
      let newDate2
      let Days
      if (Date1 && Date2) {
        newDate1 = new Date(Date1)
        newDate2 = new Date(Date2)
        // 把差的毫秒数转换为天数
        Days = parseInt(Math.abs(newDate1 - newDate2) / 1000 / 60 / 60 / 24)
        return Days
      } else {
        return null
      }
    },
    computePercentage(days) {
      return ((days / this.maxDateDiff) * 100).toFixed(2) + '%'
    },
    formatStatus(status) {
      let str = ''
      switch (status) {
        case 0:
          str = '未开始'
          break
        case 1:
          str = '进行中'
          break
        case 2:
          str = '已完成'
          break
        default:
          break;
      }
      return str
    },
    warningColor(val, status) {
      val = Math.abs(val)
      let color = '#55C2A3'
      // 只对'进行中'的状态 进行背景颜色的判断
      if (status === 1) {
        if (val >= 7 && val < 15) {
          color = '#DBD94B'
        } else if (val >= 15 && val < 20) {
          color = '#DBA64B'
        } else if (val >= 20 && val < 30) {
          color = '#FF7F2D'
        } else if (val >= 30) {
          color = '#FF2525'
        } else {
          color = '#55C2A3'
        }
      }
      return color
    }
  },
  mounted() {
    this.refreshData()
  },
  watch: {
    progressDataSource: function (val) {
      if (val && val.length > 0) {
        this.refreshData(val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .progressWarning{
    width: 100%;
    height: auto;
    position: relative;
    z-index: 9;
    .currentDaySign{
      position: absolute;
      width: 100%;
      height: 100%;
      padding-right: 30px;
      box-sizing: border-box;
      .signBox{
        position: relative;
        height: 100%;
        .signLine{
          position: absolute;
          width: 1px;
          height: 100%;
          top: 0;
          border-left: 1px dashed #ff2c29;
          z-index: 9;
        }
      }
    }
  }

  .progress-info-box{
    display: none;
    width: 240px;
    height: auto;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    position: fixed;
    z-index: 10;
    box-sizing: border-box;
    ul{
      li{
        list-style: none;
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        &:first-child{
          margin-top: 0;
        }
        span{
          width: 90px;
          display: flex;
          flex-shrink: 1;
          font-size: 12px;
          color: #666;
        }
        p{
          display: flex;
          flex: 1;
          font-size: 12px;
          color: #444;
        }
      }
    }
  }

  .progressWarning-Bar{
    width: 100%;
    height: 100%;
    position: relative;
    .sign-line{
      width: 3px;
      height: 40px;
      top: 50%;
      margin-top: -20px;
      background-color: #EDEDED;
      position: absolute;
      z-index: 3;
      margin-left: -1px;
    }
    .progress-bar-box{
      cursor: pointer;

    }
    .progress-info{
      position: absolute;
      height: 100%;
      padding-left: 10px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      z-index: 5;
    }
    .progress-bar{
      position: absolute;
      height: 26px;
      top: 50%;
      margin-top: -13px;
      box-sizing: border-box;
      transition: all 1s;
      z-index: 1;
      &.real-progress-bar{
        z-index: 2;
      }
    }
  }
  /deep/ .el-table, /deep/ .el-table tr{
    background-color: transparent;
    color:#ffffff;
  }
  /deep/ .el-table td{
    padding: 5px 0;
    height: 50px;
    background-color: transparent;
  }
  /deep/ .el-table__body tr:hover>td{
    background-color: transparent
  }
  /deep/ .el-table__body tr td:last-child{
    border-bottom: 0;
    position: relative;
    .cell{
      padding: 0 50px; // 左右padding 对应 progressPaddingWidth
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
