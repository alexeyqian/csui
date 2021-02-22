
function createChoiceChart(obj) {
    
    Highcharts.chart(obj.container, {
        chart: {
            type: 'bar',
            height: ChoiceChartConfig.getChartHeight(obj.categories.length, 25),
        },

        title: {
            text: '' //'CHAR HEIGHT ' + getChartHeight(obj.categories.length) // for debugging
        },

        plotOptions: {
            series: {
                pointWidth: ChoiceChartConfig.getBarHeight(obj.categories.length)
            },
            bar: {
                stacking: 'normal',
            },
        },

        xAxis: {           
            categories: obj.categories,
            /*
            labels: {
                style: {
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                },
            },*/
            
            labels: {                   
                useHTML: true,
                format: '<div class="choice-chart-category-label">{value}</div>',
            },
            
            lineWidth: 0,           
            // below settings for scroll bar needs highstock.js
            max: obj.categories.length <= ChoiceChartConfig.barNumberThreshold ? obj.categories.length - 1 : ChoiceChartConfig.barNumberThreshold - 1,
            scrollbar: {
                enabled: obj.categories.length > ChoiceChartConfig.barNumberThreshold ? true : false
            }
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

        legend: {
            enabled: false,
        },

        credits: {
            enabled: false
        }
    });
}
