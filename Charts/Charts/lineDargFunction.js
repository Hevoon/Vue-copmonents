function lineDrag(data, symbolSize, myChart,eCharts) {
    let onPointDragging = function (dataIndex, dx, dy) {
        data[dataIndex] = myChart.convertFromPixel('grid', this.position);
        // Update data
        myChart.setOption({
            series: [{
                id: 'a',
                data: data
            }]
        });
    };
    let updatePosition = function () {
        myChart.setOption({
            graphic: eCharts.util.map(data, function (item, dataIndex) {
                return {
                    position: myChart.convertToPixel('grid', item)
                };
            })
        });
    };
    let showTooltip = function (dataIndex) {
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    };
    let hideTooltip = function (dataIndex) {
        myChart.dispatchAction({
            type: 'hideTip'
        });
    };
    myChart.setOption({
        graphic: eCharts.util.map(data, function (dataItem, dataIndex) {
            return {
                // 'circle' 表示这个 graphic element 的类型是圆点。
                type: 'circle',
                shape: {
                    // 圆点的半径。
                    r: symbolSize / 2
                },
                // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。

                // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
                position: myChart.convertToPixel('grid', dataItem),

                // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
                invisible: true,
                // 这个属性让圆点可以被拖拽。
                draggable: true,
                // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
                z: 100,
                // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
                // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
                // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
                ondrag: eCharts.util.curry(onPointDragging, dataIndex),
                onmousemove: eCharts.util.curry(showTooltip, dataIndex),
                onmouseout: eCharts.util.curry(hideTooltip, dataIndex),
            };
        })
    });
    window.addEventListener('resize', updatePosition);
    myChart.on('dataZoom', updatePosition);
}
module.exports=lineDrag;