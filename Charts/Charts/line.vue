<template>
    <div>
        <div class="relation" ref="chart"></div>
    </div>
</template>

<script>
    import datas from "../data/data.json"
    import lineDarg from './lineDargFunction.js'

    let eCharts = require('echarts');
    export default {
        data() {
            let symbolSize = 20;
            return {
                relationChart: {},
                title: {
                    text: "relation schema",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tooltip: {
                    triggerOn: 'none',
                    formatter: function (params) {
                        return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
                    }
                },
                legend: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                xAxis: {
                    // min: 0,
                    // max: 300,
                    type: "value",
                    axisLine: {onZero: true}
                },
                yAxis: {
                    // min: 0,
                    // max: 150,
                    type: "value",
                    axisLine: {onZero: true}
                },
                visualMap: {
                    min: 0,
                    max: 150,
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {},
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: 0,
                        filterMode: 'empty'
                    },
                    {
                        type: 'inside',
                        yAxisIndex: 0,
                        filterMode: 'empty'
                    }
                ],
                series: [
                    {
                        id: 'a',
                        name: 'dragLine',
                        type: 'line',
                        smooth: true,
                        symbolSize: symbolSize,
                        data: datas.drag
                    }
                ]
            }
        },
        computed: {
            opt() {
                let self = this;
                let obj = {
                    title: self.title,
                    tooltip: self.tooltip,
                    legend: self.legend,
                    xAxis: self.xAxis,
                    yAxis: self.yAxis,
                    series: self.series,
                    backgroundColor: self.backgroundColor,
                    textStyle: self.textStyle,
                    visualMap: self.visualMap,
                    grid: self.grid,
                    dataZoom: self.dataZoom
                };
                return obj;
            }
        },
        mounted() {
            this.createChart();
        },
        methods: {
            createChart() {
                let symbolSize = 20;
                let data = datas.drag;
                let dom = this.$refs.chart;
                this.relationChart = eCharts.init(dom, 'dark');
                let myChart = this.relationChart;
                myChart.setOption(this.opt);
                lineDarg(data,symbolSize,myChart,eCharts);
            }
        }
    }
</script>

<style scoped lang="less" type="text/less">
    .relation {
        margin: 20px;
        width: 80%;
        height: 80%;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
</style>