<template>
    <div>
        <div class="relation" ref="chart"></div>
    </div>
</template>

<script>
    import datas from "../data/data.json"
    import mediaConfig from '../../test/media.config.js'

    let eCharts = require('echarts');
    export default {
        data() {
            return {
                relationChart: {},
                title: {
                    text: "Histogram",
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tooltip: {},
                legend: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                dataset: {source: datas.source},
                xAxis:{type: 'category', gridIndex: 0},
                    // [{type: 'category', gridIndex: 0},
                    // // {type: 'category', gridIndex: 1}
                    // ],
                yAxis:{gridIndex:0} ,
                //     [
                //     {gridIndex: 0}
                //     // , {gridIndex: 1}
                // ],
                visualMap: {
                    min: 20,
                    max: 100,
                    splitNumber: 4,
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: [
                    {bottom: '20%'},
                ],
                dataZoom: [
                    {
                        // 这个dataZoom组件，默认控制x轴。
                        type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                        xAxisIndex: 0,
                        start: 0,      // 左边在 10% 的位置。
                        end: 100         // 右边在 60% 的位置。
                    },
                    {
                        type: 'inside',
                        yAxisIndex: 0,
                        start: 0,
                        end: 100
                    },
                    // {
                    //     // 这个dataZoom组件，默认控制x轴。
                    //     type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                    //     xAxisIndex: 1,
                    //     start: 0,      // 左边在 10% 的位置。
                    //     end: 100         // 右边在 60% 的位置。
                    // },
                    // {
                    //     type: 'inside',
                    //     yAxisIndex: 1,
                    //     start: 0,
                    //     end: 100
                    // }

                ],
                series: [
                    {type: 'bar', seriesLayoutBy: 'row'},
                    {type: 'bar', seriesLayoutBy: 'row'},
                    {type: 'bar', seriesLayoutBy: 'row'},
                    // {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                    // {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                    // {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                    // {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
                ]
            }
        },
        computed: {
            opt() {
                let self = this;
                let obj = {
                    baseOption: {
                        title: self.title,
                        tooltip: self.title,
                        legend: self.legend,
                        xAxis: self.xAxis,
                        yAxis: self.yAxis,
                        series: self.series,
                        backgroundColor: self.backgroundColor,
                        textStyle: self.textStyle,
                        visualMap: self.visualMap,
                        dataset: self.dataset,
                        grid: self.grid,
                        dataZoom: self.dataZoom
                    },
                    media: mediaConfig
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
                this.relationChart = eCharts.init(dom, 'dark');
                this.relationChart.showLoading();
                this.relationChart.hideLoading();
                this.relationChart.setOption(this.opt);
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