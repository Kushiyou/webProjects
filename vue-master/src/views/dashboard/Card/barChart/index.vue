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
    let barCharts = echarts.init(this.$refs.charts);
    barCharts.setOption({
        //配置数据
        xAxis:{
            show:false,
            data:['Hannah Krause','Zhao Qian','Jasmin Krause','Li Lei','Karle Neumann','Adrian Groß','Mia Neumann','Böhm Fuchs','Han Meimei'],
        },
        yAxis:{
            //隐藏y轴
            show:false,
        },
        //系列
        series:[{
            type:"bar",
            data:[10,7,8,33,12,88,29,45],
            
            
        }],
        //布局
        grid:{
            left:0,
            top:0,
            right:0,
            bottom:0,
        },
        tooltip:{
            
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