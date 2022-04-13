//立即执行函数可以防止变量污染，这样所有引入的都能叫myCharts
(function() {
    //第一个柱状图
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    option = {
        color: ["#2f89cf"],
        /*title: {
                    text: "老色皮人数",
                }, */
        tooltip: {
            trigger: 'axis',
            axisPoint: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
            axisTick: {
                alignWithLabel: true
            },
            //更改x坐标轴的字体样式
            axisLable: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '12'
            },
            //不显示x坐标轴的样式
            axisLine: {
                show: false
            },
        }],
        yAxis: [{
            type: 'value',
            //更改y坐标轴的字体样式
            axisLable: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 12
            },
            //y坐标轴的样式
            /*axisLine: {
                lineStyle: {
                    color: 'red',
                },
            }, */
            //y轴分割线颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                }
            }
        }],
        series: [{
            name: '老色坯人数',
            type: 'bar',
            barWidth: '35%',
            data: [10, 52, 200, 334, 390, 330, 220],
            //修改柱子圆角
            itemStyle: {
                barBorderRadius: 5,
            }
        }]
    };
    myChart.setOption(option);
    //适配屏幕变化大小
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();

//柱状图2
(function() {
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    var option = {
        oltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '22%',
            top: '10%',
            bottom: '10%',
            //containLabel: true
        },
        xAxis: {
            //不显示x轴相关信息
            show: false
        },
        yAxis: [{
                type: 'category',
                inverse: true,
                data: ['html', 'css', 'javascript', 'vue', 'node'],
                //不显示y轴的线
                axisLine: {
                    show: false
                },
                //不显示y轴的刻度
                axisTick: {
                    show: false
                },
                //把刻度刻度标签里面的文字颜色改为白色
                axisLabel: {
                    color: '#fff'
                },

            },
            {
                type: 'category',
                inverse: true,
                data: ['702', '350', '610', '793', '664'],
                //不显示y轴的线
                axisLine: {
                    show: false
                },
                //不显示y轴的刻度
                axisTick: {
                    show: false
                },
                //把刻度刻度标签里面的文字颜色改为白色
                axisLabel: {
                    color: '#fff'
                },

            }
        ],
        series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [70, 34, 60, 78, 69],
                //修改第一组柱子的圆角
                itemStyle: {
                    barBorderRadius: 20,
                    color: function(params) {
                        return myColor[params.dataIndex]
                    }
                },
                //柱子间的距离
                barCategoryGap: 10,
                //柱子的宽度
                barWidth: 10,
                //显示柱子内的文字
                label: {
                    show: true,
                    position: 'inside',
                    //{c}会自动解析成数据 data里面的数据
                    formatter: '{c}%'
                }
            },
            {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                varCategoryGap: 50,
                barWidth: 15,
                data: [100, 100, 100, 100, 100],
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15,
                }
            }
        ]
    };
    myChart.setOption(option);
    //适配屏幕变化大小
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();

//折线图1
(function() {
    var myChart = echarts.init(document.querySelector(".line .chart"));
    var option = {
        color: ['red', 'yellow'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%'
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            borderColor: '#012f4a',
            show: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false, //去除轴内间距
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: 'red'
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'blue'
                }
            }
        },
        series: [{
                name: '人员',
                type: 'line',
                stack: 'Total',
                //是否将折线平滑展示
                smooth: true,
                data: [120, 132, 101, 134, 90, 230, 210, 12, 45, 78, 88, 887]
            },
            {
                name: '数量',
                type: 'line',
                stack: 'Total',
                smooth: true,
                data: [666, 182, 191, 234, 290, 330, 310, 89, 78, 45, 75, 76]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
    //
})();

//折线图2
(function() {
    var myChart = echarts.init(document.querySelector(".line2 .chart"));
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: '0%',
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12'
            }
        },
        grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                textStyle: {
                    color: 'rgba(255,255,255,.6)',
                    fontSize: '12'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.2)'
                }
            }
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,.1)'
                }
            },
            axisLabel: {
                textStyle: {
                    color: 'rgb(255,255,255,.6)',
                    fontSize: '12'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgb(255,255,255,.1)'
                }
            }
        }],
        series: [{
                name: '播放量',
                type: 'line',
                stack: '2',
                smooth: 'true',
                //设置填充颜色
                areaStyle: {
                    color: 'red'
                },
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    color: 'yellow',
                    width: '2'
                },
                //设置小圆点的形状
                symbol: 'circle',
                //设置小圆点的大小
                symbolSize: 7,
                //刚开始不显示小圆点
                showSymbol: false,
                //设置小圆点的样式
                itemStyle: {
                    color: 'blue',
                    borderColor: 'rgba(221,220,107,.1)',
                    borderWidth: 12
                },
                data: [120, 132, 101, 134, 40, 230, 110]
            },
            {
                name: '生产量',
                type: 'line',
                stack: 't1',
                smooth: 'true',
                areaStyle: {
                    color: 'orange'
                },
                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    color: 'red',
                    width: '2'
                },
                //设置小圆点的形状
                symbol: 'circle',
                //设置小圆点的大小
                symbolSize: 7,
                //刚开始不显示小圆点
                showSymbol: false,
                //设置小圆点的样式
                itemStyle: {
                    color: 'green',
                    borderColor: 'rgba(221,220,107,.1)',
                    borderWidth: 12
                },
                data: [220, 112, 11, 234, 90, 170, 210]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();

//饼形图1
(function() {
    var myChart = echarts.init(document.querySelector('.pie .chart'));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a}</br>{b}:{c}({d}%)'
        },
        legend: {
            bottom: '1%',
            itemWidth: 15,
            itemHeigth: 10,
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: '12'
            }
        },
        series: [{
            name: '相关信息',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            labelLine: {
                //链接文字和图形的线
                show: false
            },
            data: [
                { value: 1048, name: '金' },
                { value: 735, name: '木' },
                { value: 580, name: '水' },
                { value: 484, name: '火' },
                { value: 300, name: '土' }
            ]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize();
    })
})();

//饼形图2
(function() {
    var myChart = echarts.init(document.querySelector('.pie2 .chart'));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: '1%',
            itemWidth: 15,
            itemHeigth: 10,
            textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: '12'
            }
        },
        series: [{
            name: 'Area Mode',
            type: 'pie',
            radius: [10, 50],
            center: ['50%', '45%'],
            roseType: 'area',
            //avoidLabelOverlap: false,
            label: {
                fontSize: '10'
            },
            labelLineL: {
                //length是链接图形的线条
                //length2是链接文字的线条
                length: 6,
                length2: 8
            },
            itemStyle: {
                borderRadius: 5
            },
            data: [
                { value: 30, name: '人 1' },
                { value: 28, name: '人 2' },
                { value: 26, name: '人 3' },
                { value: 24, name: '人 4' },
                { value: 22, name: '人 5' },
                { value: 20, name: '人 6' },
                { value: 18, name: '人 7' }
            ]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize();
    })
})();