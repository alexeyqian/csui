
function createChoiceChart(obj) {
    
    Highcharts.chart(obj.container, {
        chart: {
            type: 'bar',
            height: getChartHeight(obj.categories.length),
        },

        title: {
            text: ''
        },

        plotOptions: {
            series: {
                pointWidth: getBarHeight(obj.categories.length)
            },
            bar: {
                stacking: 'normal',
            },
        },

        xAxis: {
            categories: obj.categories,
            labels: {
                useHTML: true,
                format: '<div class="choice-chart-category-label">{value}</div>'
            },
            lineWidth: 0,
            style: {
                textOverflow: 'ellipsis',
            },
            // below settings for scroll bar needs highstock.js
            //min: getChartHeight() > chartMaxHeight ? 0 : null,
            //max: getChartHeight() > chartMaxHeight ? 10 : null,
            //scrollbar: {
            //    enabled: obj.categories.length > categoryThreshold ? true : false,
            //}
        },

        yAxis: {
            min: 0,
            max: 100,
            title: {
                enabled: false,
            },
            labels: {
                format: '{value}%',
            },
            gridLineDashStyle: 'ShortDash',
        },

        series: [{
            name: 'null',
            data: obj.dataForBackground,
            color: barBackgroundColor,
            enableMouseTracking: false
            },
            {
                data: obj.data,
                color: barColor,
            }],

        legend: {
            enabled: false,
        },

        tooltip: {
            followPointer: false,
            backgroundColor: tooltipBackgroundColor,
            borderWidth: 0,
            style: {
                "color": tooltipColor,
            },
            formatter: function () {
                return '<div class="tooltip-container"><div>'
                    + this.x + ', <span class="tooltip-value">' + this.y
                    + '%</span></div><br/><div class="tooltip-response-count">18 responses</div></div>';
            }
        },

        credits: {
            enabled: false
        }
    });
}
