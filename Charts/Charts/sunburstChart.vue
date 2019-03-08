<template>
    <div>
        <div class="relation" ref="chart"></div>
    </div>
</template>

<script>
    //旭日图必须有值占比
    import Data from '../data/data.json'

    let eCharts = require('echarts');
    export default {
        data() {
            return {
                relationChart: {},
                dataZoom: [],
                title: {
                    text: "template",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                backgroundColor: '#2c343c',
                tooltip: {},
                xAxis: {},
                legend: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                yAxis: {},
                series: [{
                    type: 'sunburst',
                    data: Data.sunburstChart,
                    itemStyle: {
                        // 阴影的大小
                        shadowBlur: 20,
                        // 阴影水平方向上的偏移
                        shadowOffsetX: 0,
                        // 阴影垂直方向上的偏移
                        shadowOffsetY: 0,
                        // 阴影颜色
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 50,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
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
                }
                ]
            }
        },
        computed: {
            opt() {
                let self = this;
                let obj = {
                    title: self.title,
                    tooltip: self.title,
                    legend: self.legend,
                    xAxis: self.xAxis,
                    yAxis: self.yAxis,
                    series: self.series,
                    backgroundColor: self.backgroundColor,
                    textStyle: self.textStyle,
                    dataZoom: self.dataZoom,
                };
                return obj;
            }
        }
        ,
        mounted() {
            this.createChart();
        }
        ,
        methods: {
            createChart() {
                let dom = this.$refs.chart;
                this.relationChart = eCharts.init(dom, 'dark');
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