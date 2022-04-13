<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>

        <el-date-picker
          class="date"
          size="mini"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>

    <!-- 内容区 -->
    <el-row :gutter="10">
      <el-col :span="18">
        <div class="charts" ref="charts"></div>
      </el-col>
      <el-col :span="6" class="right">
        <h3>门店{{ title }}排名</h3>
        <ul>
          <li>
            <span class="rindex">1</span>
            <span>肯德基</span>
            <span class="rvalue">121245</span>
          </li>
          <li>
            <span class="rindex">2</span>
            <span>肯德基</span>
            <span class="rvalue">121245</span>
          </li>
          <li>
            <span class="rindex">3</span>
            <span>肯德基</span>
            <span class="rvalue">121245</span>
          </li>
          <li>
            <span>4</span>
            <span>肯德基</span>
            <span class="rvalue">121245</span>
          </li>
          <li>
            <span>5</span>
            <span>肯德基</span>
            <span class="rvalue">121245</span>
          </li>
          <li>
            <span>6</span>
            <span>肯德基</span>
            <span class="rvalue">121245</span>
          </li>
          <li>
            <span>7</span>
            <span>肯德基</span>
            <span class="rvalue">121245</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import {mapState} from "vuex"
export default {
  name: "",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      //收集日历的数据
      date:[],
    };
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState:state=>state.home.list
    })
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis:{
          data:this.title=='销售额'?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
        },
        series:{
          data:this.title=='销售额'?this.listState.orderFullYear:this.listState.userFullYear
        }
      });
    },
    listState(){
      
    this.myCharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data:this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "数据",
          type: "bar",
          barWidth: "60%",
          data:this.listState.orderFullYear,
          color: "yellowgreen",
        },
      ],
    });
  },
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data:[],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "数据",
          type: "bar",
          barWidth: "60%",
          data:[],
          color: "yellowgreen",
        },
      ],
    });
  },
  methods: {
      setDay(){
          const day = dayjs().format('YYYY-MM-DD');
          this.date = [day,day];
      },
      setWeek(){
          const start = dayjs().day(1).format('YYYY-MM-DD')
          const end = dayjs().day(7).format('YYYY-MM-DD')
          this.date = [start,end]
      },
      setMonth(){
           const start = dayjs().startOf('month').format('YYYY-MM-DD')
          const end = dayjs().endOf('month').format('YYYY-MM-DD')
          this.date = [start,end]
      },
      setYear(){
          const start = dayjs().startOf('year').format('YYYY-MM-DD')
          const end = dayjs().endOf('year').format('YYYY-MM-DD')
          this.date = [start,end]
      }
  },
};
</script>

<style lang="scss" scoped>
.clearfix {
  position: relative;
  display: flex;

  justify-content: space-between;
  .tab {
    width: 100%;
  }
  .right {
    position: absolute;
    right: 0px;
    .date {
      width: 250px;
      margin: 0, 20px;
    }
    span {
      margin: 0px 7px;
    }
  }
}

.charts {
  width: 100%;
  height: 300px;
}

.right {
  ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
    li {
      height: 8%;
      margin: 10px 0;
      span {
        margin: 0 10px;
      }
    }
    .rindex {
      float: left;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background-color: black;
      color: white;
      text-align: center;
    }
    .rvalue {
      float: right;
    }
  }
}
</style>