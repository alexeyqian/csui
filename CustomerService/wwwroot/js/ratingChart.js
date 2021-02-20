﻿function createRatingChart(obj) {    
    Highcharts.chart(obj.container, {
        chart: {
            type: 'column',
            width: 410, 
            height: 380
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
                pointWidth: 47,
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
                format: '{value}%',
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