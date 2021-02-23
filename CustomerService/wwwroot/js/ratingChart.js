function createRatingChart(obj) {    
    Highcharts.chart(obj.container, {
        chart: {
            type: 'column',
            width: RatingChartConfig.getChartWidth(obj.categories.length), 
            //height: 380
        },

        title: {
            text: ''
        },

        plotOptions: {
            series: {
                states: {
                    inactive: {
                        opacity: 1
                    }
                },
                pointWidth: RatingChartConfig.getColumnWidth(obj.categories.length)
            },
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                },

            },
            followPointer: false,
            backgroundColor: "black",
            borderWidth: 0
        },

        xAxis: {
            categories: obj.categories,
            labels: {
                autoRotation: false, // IMPORTANT
                align: 'center',
                useHTML: true,
                format: '<div class="xaxis-label">{value}</div>',
            },
            lineWidth: 0,
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
        },

        series: [{
            name: 'null',
            data: obj.dataForBackground,
            color: barBackgroundColor,
            enableMouseTracking: false
            }, {
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
            formatter: function () { return sharedChartConfig.tooltip(this.x, this.y, 18); } 
        },
       
        credits: {
            enabled: false
        }
    });
}
