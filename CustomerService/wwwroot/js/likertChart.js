function createLikertChart(obj) {

    Highcharts.chart(obj.container, {
        chart: {
            type: 'bar',
            // if lenght > 10, then the top legend will need more vertical space.
            height: getChartHeight(obj.categories.length, obj.categories.length >= 10? 150 : 80),
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
                format: '<div class="choice-chart-category-label">{value}</div>',
            },

            lineWidth: 0,
            // below settings for scroll bar needs highstock.js
            max: obj.categories.length <= barNumberThreshold ? obj.categories.length - 1 : barNumberThreshold - 1,
            scrollbar: {
                enabled: obj.categories.length > barNumberThreshold ? true : false
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

        series: obj.series,

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
            align: 'left',
            verticalAlign: 'top',
            //reversed: true
            /*
            labelFormatter: function () { // change lable color based on category
                if (this.name === "Very easy to complete")
                    return '<span style="color:#80AFED;">' + this.name + '</span>';
                else if (this.name === "Neutral")
                    return '<span style="color:#4668C5;">' + this.name + '</span>';
                else if (this.name === "Unable to complete")
                    return '<span style="color:#002050;">' + this.name + '</span>';
                else
                    return this.name;
            }*/
        },
               
        credits: {
            enabled: false
        }
    });
}