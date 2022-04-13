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
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
        //配置数据
        xAxis:{
            show:false,
            //散点 这样使得有折线出现
            type:'category',
        },
        yAxis:{
            //隐藏y轴
            show:false,
        },
        //系列
        series:[{
            type:"line",
            data:[10,7,8,33,12,88],
            //拐点样式设置
            itemStyle:{
                //不显示拐点
                 opacity:0,
            },
            //线条的样式
            lineStyle:{
                color:'purple'
            },
            //填充颜色
            areaStyle:{
                color:{
                    type:'linear',
                    x:0,
                    y:0,
                    x2:0,
                    y2:1,
                    colorStops:[
                        {
                            offset:0,
                            color:'purple'
                        },
                        {
                            offset:1,
                            color:'#fff'
                        }
                    ]
                },
                global:false,
            },
            smooth:true
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