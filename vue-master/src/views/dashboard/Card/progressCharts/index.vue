<template>
    <div class="charts" ref="charts">
    </div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
    name: '',
mounted(){
    //初始化echarts实例
    let progressCharts = echarts.init(this.$refs.charts);
    progressCharts.setOption({
        //配置数据
        xAxis:{
            show:false,
            min:0,
            max:100
        },
        yAxis:{
            //隐藏y轴
            show:false,
            type:'category',
        },
        //系列
        series:[{
            type:"bar",
            data:[78],
            barWidth:'20px',
            showBackground:true,
            backgroundStyle:{
                color:'#eee'
            },
            label:{
                show:true,
                position:'right'
            }
        }],
        //布局
        grid:{
            left:0,
            top:0,
            right:0,
            bottom:0,
        }
    })
}
};
</script>

<style lang="scss" scoped>
 .charts{
     width: 100%;
     height: 100%;
 }
</style>