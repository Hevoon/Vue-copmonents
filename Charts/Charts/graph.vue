<template>
    <div>
        <div class="relation" ref="chart"></div>
        <div ref="showInfo" class="info"></div>
    </div>
</template>

<script>
    import nodesInfo from '../../test/graphNode.js'
    import linksInfo from '../../test/graphLink.js'

    let eCharts = require('echarts');
    require('echarts-gl');
    export default {
        data() {
            let categories = this.category();

            let nodes = this.graphNodeDeal(nodesInfo);
            let links = this.graphLinkDeal(linksInfo);
            return {
                relationChart: {},
                title: {
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                backgroundColor:'rgba(249,249,249,0.2)',
                tooltip: {},
                legend: {
                    data: categories.map(a => a.name),
                    textStyle: {
                        color: 'rgba(0, 0, 0, 0.8)'
                    }
                },
                series: [{
                    type: 'graph',
                    name: 'demo',
                    categories: categories,
                    nodes: nodes,
                    links: links,
                    roam: true,
                    layout: 'force',
                    focusNodeAdjacency: true,
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    force: {
                        repulsion: 500,
                    },
                    // itemStyle: {
                    //     // 阴影的大小
                    //     shadowBlur: 100,
                    //     // 阴影水平方向上的偏移
                    //     shadowOffsetX: 0,
                    //     // 阴影垂直方向上的偏移
                    //     shadowOffsetY: 0,
                    //     // 阴影颜色
                    //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    // },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.7)'
                        },
                        label: {
                            //设置强调时显示的标签
                            // formatter:'now'
                            color: 'rgba(0, 0, 0, 1)'
                        },
                    },
                    label: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.8)'
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
                    // legend: self.legend,
                    series: self.series,
                    backgroundColor: self.backgroundColor,
                    textStyle: self.textStyle,
                };
                return obj;
            }
        },
        mounted() {
            this.createChart();
        },
        methods: {
            createChart() {
                let self = this;
                let dom = this.$refs.chart;
                this.relationChart = eCharts.init(dom);
                let myChart = this.relationChart;
                myChart.setOption(this.opt);
                myChart.on('click', function (params) {
                    self.$refs.showInfo.innerText = nodesInfo[params.dataIndex].name
                });
            },
            category() {
                let names = ['A', 'B', 'C', 'D', 'E', 'F'];
                let categories = [];
                for (let i = 0; i < 6; i++) {
                    categories[i] = {
                        name: names[i]
                    };
                }
                return categories
            },

            graphNodeDeal(nodeInfo) {
                let nodes = [];
                for (let i = 0; i < nodeInfo.length; i++) {
                    let node = {label: {normal: {}}};
                    node.id = i;
                    node.value = nodeInfo[i].value;
                    node.name = nodeInfo[i].name;
                    node.category = nodeInfo[i].category;
                    if (nodeInfo[i].value >=20) {
                        node.label.normal.show = true;
                        node.label.normal.color = 'rgba(0,0,0,0.8)';
                    }
                    if (nodeInfo[i].value >= 50) {
                        node.symbolSize =[60,17];
                        node.draggable = true;
                        node.symbol='rect';
                    } else {
                        node.symbolSize = 15;
                    }
                    nodes.push(node);
                }
                return nodes;
            },
            graphLinkDeal(linkInfo) {
                let links = [];
                for (let i = 0; i < linkInfo.length; i++) {
                    let link = {label: {}};
                    link.id = i;
                    link.name = linkInfo[i].name;
                    link.source = linkInfo[i].source;
                    link.target = linkInfo[i].target;
                    links.push(link);
                }
                return links;
            }
        }
    }

</script>

<style scoped lang="less" type="text/less">
    .relation {
        width: 50%;
        height: 100%;
        float: left;
    }
    .info{
        border-left: 1px solid rgba(0,0,0,0.2);
        width: 50%;
        height: 100%;
        float: left;
        text-align: left;
        padding: 20px;
    }
</style>