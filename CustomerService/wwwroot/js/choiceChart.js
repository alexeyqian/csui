
function createChoiceChart(obj) {

    // Begin of dynamic bar height and chart height
    /* Choice Chart UX Requirements:
     * 1. Chart height should be dynamic accroding to bar numbers to avoid too big gap between bars.
     * 2. Minimum bar height should be 8px
     * 3. Minimum gap should be 16px
     * 4. Bar height should be reduced gradually according to increased bar numbers.
     * 5. Scrollbar shoul be added if too much bars (too hard to achive combined with above reqs)
     * */
    
    const ratio = 2;
    const minBarHeight = 8;
    const categoryThreshold = 30;   
    const heightMap = [[8,450], // first number is bar height, second number is chart height
        /*   1         2          3          4          5          6          7          8          9      10    */
        [0,    0], [30, 150], [30, 200], [30, 250], [30, 300], [30, 350], [30, 400], [30, 450], [25, 450], [25, 450],        
        [20, 450], [20, 450], [20, 450], [15, 450], [15, 450], [15, 450], [12, 450], [12, 450], [12, 450], [12, 450],        
        [10, 450], [10, 450], [10, 450], [8, 450], [8, 450], [8, 450], [8, 450], [8, 450], [8, 450], [8, 450]];

    function getBarHeight(length) {
        if (length >= categoryThreshold)
            return minBarHeight;
        else
            return heightMap[length % categoryThreshold][0];
    }

    function getChartHeight(length) {
        if (length >= categoryThreshold)
            return minBarHeight * length * ratio;
        else
            return heightMap[length % categoryThreshold][1];
    }
    // End of Dynamic height logic

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
