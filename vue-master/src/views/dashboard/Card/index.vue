<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"
        ><el-card><Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
                <span>周同比&nbsp;&nbsp;56.67%<svg t="1646818823678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3098" width="16" height="16"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" p-id="3099" fill="#d81e06"></path></svg></span>
                &nbsp;&nbsp;
                <span>日同比&nbsp;&nbsp;19.96%<svg t="1646818956253" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4011" width="16" height="16"><path d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z" p-id="4012" fill="#1afa29"></path></svg></span>
            </template>
            <template slot="footer">
                <span>日销售额￥12423</span>
            </template>
            
            </Detail>
            
            </el-card
      ></el-col>
      <el-col :span="6"
        ><el-card><Detail title="访问量" count="88460">
            <template slot="charts">
                <lineCharts></lineCharts>
            </template>
            
            <template slot="footer">
                <span>日访问量1234</span>
            </template>
            </Detail></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card><Detail title="支付笔数" count="88460">
            <template slot="charts">
                <barCharts></barCharts>
            </template>

            <template slot="footer">
                <span>转化率64%</span>
            </template>
            </Detail></el-card
      ></el-col>
      <el-col :span="6"
        ><el-card><Detail title="运营活动效果" count="78%">
            
            <template slot="charts">
                <progressCharts></progressCharts>
            </template>
            
            <template slot="footer">
                <span>周同比&nbsp;&nbsp;56.67%<svg t="1646818823678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3098" width="16" height="16"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" p-id="3099" fill="#d81e06"></path></svg></span>
                &nbsp;&nbsp;
                <span>日同比&nbsp;&nbsp;19.96%<svg t="1646818956253" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4011" width="16" height="16"><path d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z" p-id="4012" fill="#1afa29"></path></svg></span>
            </template>
            </Detail></el-card
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import Detail from "./Detail";
/* 引入折线图组件 */
import lineCharts from './lineChart'
import barCharts from './barChart'
import progressCharts from './progressCharts'
export default {
  name: "Card",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
  },
};
</script>

<style lang="scss" scope>
</style>