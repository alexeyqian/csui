
function createLikertChart(obj) {

    Highcharts.chart(obj.container, {
        chart: {
            type: 'bar',
            // if options > 10, then the top legend will need more vertical space.
            height: LikertChartConfig.getChartHeight(obj.categories.length, obj.options.length >= 6  ? 90 : 70),
        },

        title: {
            text: ''
        },

        plotOptions: {
            series: {
                pointWidth: 20 //ChoiceChartConfig.getBarHeight(obj.categories.length)
            },

            bar: {
                stacking: 'normal',
            },
        },

        xAxis: {
            categories: obj.categories,
            labels: {
                useHTML: true,
                format: '<div class="xaxis-label">{value}</div>',
            },

            lineWidth: 0,
            // below settings for scroll bar needs highstock.js
            max: obj.categories.length <= LikertChartConfig.barNumberThreshold ? obj.categories.length - 1 : LikertChartConfig.barNumberThreshold - 1,
            scrollbar: {
                enabled: obj.categories.length > LikertChartConfig.barNumberThreshold ? true : false
            }
        },

        yAxis: {
            min: 0,
            max: 100,
            title: {
                enabled: false,
            },
            labels: {
                useHTML: true,
                format: '<div class="yaxis-label">{value}%</div>',
            },
            gridLineDashStyle: 'ShortDash',
            reversedStacks: false
        },

        series: obj.series,

        tooltip: {
            followPointer: false,
            backgroundColor: tooltipBackgroundColor,
            borderWidth: 0,
            style: {
                "color": tooltipColor,
            },
            formatter: function () { return sharedChartConfig.tooltip(this.x, this.y, 18); }
        },

        legend: {
            align: 'left',
            verticalAlign: 'top',
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 0,
            useHTML: true,
            labelFormat: '<div class="legend-label">{name}</div>'
        },

        credits: {
            enabled: false
        }
    });
}


