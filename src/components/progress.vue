<template>
  <stage>
    <div class="progressWarning">
      <div class="currentDaySign" :style="{paddingLeft: (nameWidth + addrWidth + nodeWidth + progressPaddingWidth) + 'px', paddingRight: progressPaddingWidth + 'px'}">
        <div class="signBox">
          <div class="signLine" 
            :style="{left: (currentDateDiff / maxDateDiff) * 100 + '%'}"></div>
        </div>
      </div>
      <el-table
        :data="tableData"
        :show-header="false"
        :span-method="objectSpanMethod"
        border
        style="width: 100%;">
        <el-table-column
          prop="projectName"
          :width="nameWidth">
        </el-table-column>
        <el-table-column
          prop="projectAddr"
          :width="addrWidth">
        </el-table-column>
        <el-table-column
          prop="projectNodeName"
          :width="nodeWidth">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="progressWarning-Bar">
              <div class="begin-line sign-line" 
                :style="{left: (dateDifference(getMinPlanStartDate(), scope.row.data.planStartDate) / maxDateDiff) * 100 + '%'}"></div>
              <div class="progress-bar-box" 
                @mousemove="handleShowInfo(scope.row, $event)"
                @mouseout="handleHideInfo">
                <div class="progress-info"
                  :style="{left: (dateDifference(getMinPlanStartDate(), scope.row.data.planEndDate) / maxDateDiff) * 100 + '%'}">{{scope.row.data.statusText}}</div>
                <div class="plan-progress-bar progress-bar" 
                  :style="{left: (dateDifference(getMinPlanStartDate(), scope.row.data.planStartDate) / maxDateDiff) * 100 + '%',
                        width: (dateDifference(scope.row.data.planStartDate, scope.row.data.planEndDate) / maxDateDiff) * 100 + '%',
                        backgroundColor: '#cccccc'}"></div>
                <div class="real-progress-bar progress-bar" 
                  v-if="!!scope.row.data.realStartDate"
                  :style="{left: (dateDifference(getMinPlanStartDate(), scope.row.data.realStartDate) / maxDateDiff) * 100 + '%',
                          width: (dateDifference(scope.row.data.realStartDate, scope.row.data.realEndDate ? scope.row.data.realEndDate : getCurrentDay()) / maxDateDiff) * 100 + '%',
                          backgroundColor: scope.row.data.status === 1 ? '#d36f5e' : '#91cc63'}"></div>
              </div>
              <div class="end-line sign-line" 
                :style="{left: (dateDifference(getMinPlanStartDate(), scope.row.data.planEndDate) / maxDateDiff) * 100 + '%'}"></div>
              <!-- {{scope.row.data}} -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="progress-bar-info" ref="testBox">
        <ul>
          <li>施工状态：{{infoData.statusText}}</li>
          <li>预警状态：</li>
          <li>节点名称：{{infoData.projectNodeName}}</li>
          <li>计划开始时间：{{infoData.data.planStartDate}}</li>
          <li>计划结束时间：{{infoData.data.planEndDate}}</li>
          <li>实际开始时间：{{infoData.data.realStartDate}}</li>
          <li>实际结束时间：{{infoData.data.realEndDate}}</li>
          <li>计划工期：</li>
        </ul>
      </div>
    </div>
  </stage>
</template>
<script>
import stage from '../screen/stage'
export default {
  components: {
    stage
  },
  data() {
    return {
      nameWidth: 100,
      addrWidth: 200,
      nodeWidth: 150,
      progressPaddingWidth: 100,
      infoData: {
        projectId: 1,
        projectName: '六项目部',
        projectAddrId: 111,
        projectAddr: '湘雅三医院站-六沟垅站',
        projectNodeName: '节点1',
        data: {
          planStartDate: '2019-04-01',
          planEndDate: '2019-06-01',
          realStartDate: '2019-04-01',
          realEndDate: '2019-06-01',
          status: 0,
          statusText: '已完成',
          delayDays: ''
        }
      },
      tableData: [{
        projectId: 1,
        projectName: '六项目部',
        projectAddrId: 111,
        projectAddr: '湘雅三医院站-六沟垅站',
        projectNodeName: '节点1',
        data: {
          planStartDate: '2019-04-01',
          planEndDate: '2019-06-01',
          realStartDate: '2019-04-01',
          realEndDate: '2019-06-01',
          status: 0,
          statusText: '已完成',
          delayDays: ''
        }
      }, {
        projectId: 1,
        projectName: '六项目部',
        projectAddrId: 111,
        projectAddr: '湘雅三医院站-六沟垅站',
        projectNodeName: '节点2',
        data: {
          planStartDate: '2019-04-01',
          planEndDate: '2019-06-27',
          realStartDate: '2019-04-22',
          realEndDate: '2019-06-10',
          status: 0,
          statusText: '已完成 提前结束',
          delayDays: ''
        }
      }, {
        projectId: 1,
        projectName: '六项目部',
        projectAddrId: 111,
        projectAddr: '湘雅三医院站-六沟垅站',
        projectNodeName: '节点3',
        data: {
          planStartDate: '2019-04-27',
          planEndDate: '2019-06-27',
          realStartDate: null,
          realEndDate: null,
          status: 0,
          statusText: '未开始',
          delayDays: ''
        }
      }, {
        projectId: 1,
        projectName: '六项目部',
        projectAddrId: 111,
        projectAddr: '湘雅三医院站-六沟垅站',
        projectNodeName: '节点4',
        data: {
          planStartDate: '2019-03-01',
          planEndDate: '2019-09-01',
          realStartDate: '2019-04-22',
          realEndDate: null,
          status: 0,
          statusText: '进行中',
          delayDays: ''
        }
      }, {
        projectId: 1,
        projectName: '六项目部',
        projectAddrId: 112,
        projectAddr: '湘雅三医院站',
        projectNodeName: '节点1',
        data: {
          planStartDate: '2019-04-01',
          planEndDate: '2019-06-01',
          realStartDate: '2019-04-22',
          realEndDate: null,
          status: 1,
          statusText: '进行中 延误XX天',
          delayDays: ''
        }
      }],
      spanArr: [],
    }
  },
  computed: {
    maxDateDiff() {
      return this.dateDifference(this.getMinPlanStartDate(), this.getMaxPlanEndDate())
    },
    currentDateDiff() {
      return this.dateDifference(this.getMinPlanStartDate(), this.getCurrentDay())
    }
  },
  mounted() {
    this.rowspan()
    console.log(this.getMinPlanStartDate())
    console.log(this.getMaxPlanEndDate())
    console.log(this.dateDifference(this.getMinPlanStartDate(), this.getMaxPlanEndDate()))
    console.log(this.dateDifference(this.getMinPlanStartDate(), this.getCurrentDay()))
  },
  methods: {
    handleShowInfo(data, e) {
      this.infoData = data
      const infoBox = this.$refs.testBox
      const X = e.clientX + 20
      const Y = e.clientY + 20
      infoBox.style.display = 'block'
      infoBox.style.left = X + 'px'
      infoBox.style.top = Y + 'px'
      console.log(data)
      console.log(e)
    },
    handleHideInfo(index) {
      this.$refs.testBox.style.display = 'none'
    },
    rowspan() {
      this.tableData.forEach((item,index) => {
        if( index === 0){
          this.spanArr.push(1);
          this.position = 0;
        }else{
          if(this.tableData[index].projectId === this.tableData[index-1].projectId ){
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          }else{
            this.spanArr.push(1);
            this.position = index;
          }
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row>0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getCurrentDay() {
      // 获取当前日期
      const date = new Date();
      let nowMonth = date.getMonth() + 1;
      let strDate = date.getDate();
      let seperator = '-';
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      return date.getFullYear() + seperator + nowMonth + seperator + strDate
    },
    getMinPlanStartDate() {
      // 获取最小计划开始时间
      let planStartDate = []
      this.tableData.forEach(item => {
        if (item && item.data && item.data.planStartDate) {
          planStartDate.push(item.data.planStartDate)
        }
      })
      if (planStartDate.length > 0) {
        return planStartDate.sort()[0]
      } else {
        return null
      }
    },
    getMaxPlanEndDate() {
      // 获取最大计划完成时间
      let planEndDate = []
      this.tableData.forEach(item => {
        if (item && item.data && item.data.planEndDate) {
          planEndDate.push(item.data.planEndDate)
        }
      })
      if (planEndDate.length > 0) {
        return planEndDate.sort()[planEndDate.length - 1]
      } else {
        return null
      }
    },
    dateDifference(Date1, Date2) { 
      // Date1和Date2是2017-07-10格式  
      let aDate 
      let newDate1
      let newDate2
      let Days
      aDate = Date1.split("-");
      // 转换为07-10-2017格式  
      newDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); 
      aDate = Date2.split("-");
      newDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
      //  把差的毫秒数转换为天数 
      Days = parseInt(Math.abs(newDate1 - newDate2) / 1000 / 60 / 60 / 24);  
      return Days
    }
  }
}
</script>

<style lang="less" scoped>
.progressWarning{
  width: 100%;
  height: auto;
  position: relative;
  margin-top: 100px;
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

.progress-bar-info{
  display: none;
  width: 300px;
  height: auto;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  position: fixed;
  z-index: 10;
  box-sizing: border-box;
  ul{
    li{
      list-style: none;
    }
  }
}

.progressWarning-Bar{
  width: 100%;
  height: 100%;
  position: relative;
  .sign-line{
    width: 3px;
    height: 100%;
    top: 0;
    background-color: #cccccc;
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
    height: 70%;
    top: 15%;
    box-sizing: border-box;
    transition: all 1s;
    z-index: 1;
    &.real-progress-bar{
      z-index: 2;
    }
  }
}
/deep/ .el-table, /deep/ .el-table__body-wrapper{
  overflow: inherit;
}
/deep/ .el-table__body tr:hover>td{
  background-color: transparent
}
/deep/ .el-table__body tr td:last-child{
  border-bottom: 0;
  position: relative;
  .cell{
    padding: 5px 100px; // 左右padding 对应 progressPaddingWidth
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: inherit;
  }
}
</style>


