function createLikertAvgChart(obj) {    
    Highcharts.chart(obj.container, {
        chart: { inverted: true },

        xAxis: {
            categories: ['statement a', 'statement b', 'statement c'],
            gridLineWidth: 1,
            gridLineDashStyle: 'ShortDash',
            tickmarkPlacement: 'on',
            lineWidth: 0,
            tickWidth: 0
        },

        yAxis: {
            gridLineWidth: 0,
            opposite: true,
            min: 1
        },

        plotOptions: {
            series: {
                lineWidth: 0,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },

        series: [{
            name: 'Likert',
            data: [6, 7, 9.5]
        }],

    });
}
