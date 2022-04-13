<template>
  <el-card>
    <div slot="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="charts" ref="charts"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",

  data() {
    return {
      value: "全部渠道",
    };
  },

  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
    myCharts.setOption({
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    //给图表绑定事件
    myCharts.on("mouseover", (params) => {
      const { name, value } = params.data;
      myCharts.setOption({
        title: {
          subtext: value,
          text: name,
          left:"center",
          top:"center"
        },
      });
    });
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>