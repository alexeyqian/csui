var columnObj = {};
var gaugeArcObj = {};
var gaugeBarObj = {};

function createRatingChart(obj) {
    Highcharts.chart(obj.container, {
        chart: {
            type: 'column',
            width: 411, // gap is 23, a littler bigger that 20
            height: 379
        },

        title: {
            text: ''
        },

        legend: {
            enabled: false,
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
            color: '#F2F3F5',
            enableMouseTracking: false
        }, {
            data: obj.data,
            color: '#7084E3',
        }],

        tooltip: {
            followPointer: false,
            backgroundColor: "#212121",
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
            backgroundColor: "#00000",
            borderWidth: 0
        },
        credits: {
            enabled: false
        }
    });
}

function createGaugeArc(obj) {
    //let color = obj.y >= 0 ? '#107C10' : '#BA141A';

    Highcharts.chart(obj.container, {
        credits: {
            enabled: false
        },

        chart: {
            type: 'solidgauge',
            //width: 450,
            spacing: [0, 0, 0, 0]
        },

        title: {
            text: '',
            margin: 0
        },

        pane: {
            center: ['50%', '85%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#EDEBE9',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        yAxis: {
            stops: [
                [0.49, '#BA141A'], // red
                [0.50, '#107C10'] // green
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: 0,
            tickAmount: 2,
            labels: {
                y: 16
            },
            min: -100,
            max: 100,
        },

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
                return '<div>Score <span>' + this.y + '</span></div><br/><div>18 responses</div>';
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 0,
                    borderWidth: 0,
                    useHTML: true,
                    format:
                        '<div style="text-align:center">' +
                        '<span style="font-size:40px">{y}</span><br/>' +
                        '</div>'
                }
            }
        },

        series: [{
            data: [obj.y]
        }]

    });
}

function createGaugeBar(obj) {
    Highcharts.chart(obj.container, {
        chart: {
            type: 'bar',
            height: 90,
            width: 420,
            spacing: [0, 0, 0, 0],
            margin: [0, 0, 0, 0]
        },
        title: {
            align: 'left',
            text: 'Overal NPS results',
            margin: 0
        },
        xAxis: {
            categories: ['NPS'],
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            visible: false,
        },
        yAxis: {
            min: 0,
            max: 100,
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            visible: false,
            reversed: true,

        },
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
                return '<div>' + this.x + ' <span>' + this.y + '%</span></div><br/><div>18 responses</div>';
            }
        },
        legend: {
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 0,

            align: 'left', // NEW
            itemStyle: {
                "color": "#605e5c"
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                pointWidth: 40,
            },
            bar: {
                dataLabels: {
                    enabled: true,
                    //format: '{y} %',
                    style: {
                        fontWeight: 'bold'
                    },
                    formatter: function () {
                        return Highcharts.numberFormat(this.y, 0) + ' %';
                    }
                },
            }
        },

        series: [{
            name: 'Detractors(0-6)',
            data: [obj.data[2]],
            color: "#D13438",
        },
        {
            name: 'Passives(7-8)',
            data: [obj.data[1]],
            color: "#EF5F20",
        }, {
            name: 'Promoters(9-10)',
            data: [obj.data[0]],
            color: "#107C10"
        },
        ], credits: {
            enabled: false
        }
    });

}

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