<template>
    <div>
        <div class="relation" ref="chart"></div>
    </div>
</template>

<script>
    let eCharts = require('echarts');
    export default {
        data() {
            function getvalue(year){
                year = year || '2017';
                let date = +eCharts.number.parseDate(year + '-01-01');
                let end = +eCharts.number.parseDate(year + '-12-31');
                let dayTime = 3600 * 24 * 1000;
                let data = [];
                for (let time = date; time <= end; time += dayTime) {
                    data.push([
                        eCharts.format.formatTime('yyyy-MM-dd', time),
                        Math.floor(Math.random() * 10000)
                    ]);
                }
                return data;
            }
            return {
                relationChart: {},
                dataZoom: [],
                title: {
                    text: "template",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                tooltip: {
                   formatter:'{a}'
                },
                xAxis: {},
                legend: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                yAxis: {},
                visualMap: {
                    min:0,
                    max:10000,
                    textStyle: {
                        color: '#fff'
                    }
                },
                calendar:{
                    range:'2017'
                },
                series: [{
                    type: 'heatmap',
                    coordinateSystem: 'calendar',
                    data:getvalue(),
                    itemStyle: {
                        color: '#c23531',
                        // 阴影的大小
                        shadowBlur: 100,
                        // 阴影水平方向上的偏移
                        shadowOffsetX: 0,
                        // 阴影垂直方向上的偏移
                        shadowOffsetY: 0,
                        // 阴影颜色
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.7)'
                        },
                        label: {
                            //设置强调时显示的标签
                            // formatter:'now'
                            color: 'rgba(255, 255, 255, 1)'
                        },
                    },
                    label: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.8)'
                            }
                        }
                    },
                }]
            }
        },
        computed: {
            opt() {
                let self = this;
                let obj = {
                    title: self.title,
                    tooltip: self.title,
                    legend: self.legend,
                    // xAxis: self.xAxis,
                    // yAxis: self.yAxis,
                    series: self.series,
                    textStyle: self.textStyle,
                    visualMap: self.visualMap,
                    dataZoom: self.dataZoom,
                    calendar:self.calendar
                };
                return obj;
            }
        },
        mounted() {
            this.createChart();
        },
        methods: {
            createChart() {
                let dom = this.$refs.chart;
                this.relationChart = eCharts.init(dom);
                let myChart = this.relationChart;
                myChart.setOption(this.opt);
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .relation {
        margin: 20px;
        width: 80%;
        height: 80%;
        box-shadow: 1px 1px 5px 5px rgba(0, 0, 0, 0.3);
    }
</style>