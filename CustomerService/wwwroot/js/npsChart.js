function createGaugeArc(obj) {
    //let color = obj.y >= 0 ? '#107C10' : '#BA141A';

    Highcharts.chart(obj.container, {
        credits: {
            enabled: false
        },

        chart: {
            type: 'solidgauge',
            height: 200,
            width: 200,
            spacing: [0, 0, 0, 0],
            backgroundColor: null,
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
                [0.49, '#BA141A'], // negative color
                [0.50, '#107C10'] //  positive color
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
                    y: 1,
                    borderWidth: 0,
                    useHTML: true,
                    format: '<div class="nps-value-container"><div class="nps-value">{y}</div>' +
                        '<div class="nps-text">Avg NPS score</div><div>'
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
            width: 410,
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
            symbolHeight: 10,
            symbolWidth: 10,
            symbolRadius: 0,

            align: 'left', // NEW
            itemStyle: {
                "color": "#605e5c"
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                pointWidth: 30,
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
