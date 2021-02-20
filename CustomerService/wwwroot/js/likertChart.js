function createLikertChart(obj) {
    // Dynamic height logic
    // Below code is to set bar height and chart height dynamiclly
    // The reason not to use built-in minPointHeight is that chart.height, bar height scale
    // and chart.series.minPointHeight cannot take effect together.
    const chartMaxHeight = 465;
    const barMinHeight = 8;
    const barMaxHeight = 40;
    const barNumberThreshold = 30;

    function getChartHeight() {
        let ratio = 1.5;

        if (obj.categories.length <= 5)
            ratio = 2;

        let height = obj.categories.length * barMaxHeight * ratio;
        if (height > chartMaxHeight && obj.categories.length <= barNumberThreshold) height = chartMaxHeight;
        if (height > chartMaxHeight && obj.categories.length > barNumberThreshold) height = obj.categories.length * barMinHeight * ratio;

        return height;
    }

    function getBarHeight() {
        if (obj.categories.length <= 5) return barMaxHeight;
        if (obj.categories.length >= barNumberThreshold) return barMinHeight;

        let height = barMaxHeight - obj.categories.length * 2;
        if (height <= barMinHeight) height = barMinHeight;

        return height;
    }

    // End of Dynamic height logic

    Highcharts.chart(obj.container, {
        chart: {
            type: 'bar',
            height: getChartHeight(),
        },

        title: {
            text: ''
        },

        legend: {
            enabled: true,
            reversed: true,
            align: 'center',
            verticalAlign: 'top',
            labelFormatter: function () { // change lable color based on category
                if (this.name === "Very easy to complete")
                    return '<span style="color:#80AFED;">' + this.name + '</span>';
                else if (this.name === "Neutral")
                    return '<span style="color:#4668C5;">' + this.name + '</span>';
                else if (this.name === "Unable to complete")
                    return '<span style="color:#002050;">' + this.name + '</span>';
                else
                    return this.name;
            }
        },

        xAxis: {
            categories: obj.categories,
            labels: {
                align: 'right',
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
            name: 'Very easy to complete',
            data: obj.data3,
            color: '#80AFED'
        }, {
            name: 'Neutral',
            data: obj.data2,
            color: '#4668C5',
        }, {
            name: 'Unable to complete',
            data: obj.data,
            color: '#002050',
        }],

        tooltip: {
            followPointer: false,
            backgroundColor: "#00000",
            borderWidth: 0,
            style: {
                "fontFamily": "Segoe UI",
                "fontWeight": 400,
                "color": "#eee",
                "direction": "ltr",
            },
            formatter: function () {
                return '<div>' + this.x + ', <span>' + this.y + '%</span></div><br/><div>18 responses</div>';
            }
        },
        plotOptions: {
            series: {
                pointWidth: getBarHeight(),

            },

            bar: {
                stacking: 'normal',
            },
        },
        credits: {
            enabled: false
        },
        scrollbar: {
            enabled: true
        }
    });
}