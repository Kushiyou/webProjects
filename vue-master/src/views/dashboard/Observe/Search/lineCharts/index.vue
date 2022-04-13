<template>
    <div>
     <div class="hearder">
         <span class="search-header">{{title}}</span>
         <svg
        t="1646817562281"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2173"
        width="16"
        height="16"
      >
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2174"
          fill="#707070"
        ></path>
      </svg>
     </div>
     <div class="main">
         <span class="main-title">123456</span><span class="main-content">17.1</span><svg t="1646818823678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3098" width="16" height="16"><path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3c-3.8 5.3-0.1 12.7 6.5 12.7h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" p-id="3099" fill="#d81e06"></path></svg>
        <svg t="1646818956253" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4011" width="16" height="16"><path d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z" p-id="4012" fill="#1afa29"></path></svg>
            
     </div>
     <div class="footer">
         <div class="charts" ref="charts"></div>
     </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',
    props:['title'],
    data() {
        return {
            
        };
    },

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
                color:'yellow'
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
                            color:'green'
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
},

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.hearder{
    display: flex;
    .search-header{
        margin-right: 20px;
    }
}
.main{
    margin: 10px 0;
}
.main-title{
    margin-right: 30px;
}
.main-content{
    margin-right: 10px;
}
.charts{
    width: 100%;
    height: 50px;
}
</style>