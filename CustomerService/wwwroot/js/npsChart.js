function createGaugeArc(obj) {
    const negativeThreshold = 0.49;
    const negativeColor = "#BA141A";
    const positiveThreshold = 0.50;
    const positiveColor = "#107C10";

    Highcharts.chart(obj.container, { 
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

        yAxis: {
            stops: [
                [negativeThreshold, negativeColor],
                [positiveThreshold, positiveColor] 
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

        series: [{
            data: [obj.y]
        }],

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

        tooltip: {
            followPointer: false,
            backgroundColor: tooltipBackgroundColor,
            borderWidth: 0,
            style: {
                "color": tooltipColor,
            },
            formatter: function () {
                return '<div>Score <span>' + this.y + '</span></div><br/><div>18 responses</div>';
            }
        },

        credits: {
            enabled: false
        },
    });
}

function createGaugeBar(obj) {
    const detractorColor = "#D13438";
    const passiveColor = "#EF5F20";
    const promoterColor = "#107C10";

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

        series: [{
            name: 'Detractors(0-6)',
            data: [obj.data[2]],
            color: detractorColor,
        },
        {
            name: 'Passives(7-8)',
            data: [obj.data[1]],
            color: passiveColor,
        }, {
            name: 'Promoters(9-10)',
            data: [obj.data[0]],
            color: promoterColor
        },
        ], credits: {
            enabled: false
        },

        tooltip: {
            followPointer: false,
            backgroundColor: tooltipBackgroundColor,
            borderWidth: 0,
            style: {
                "color": tooltipColor,
            },
            formatter: function () {
                return '<div>' + this.x + ' <span>' + this.y + '%</span></div><br/><div>18 responses</div>';
            }
        },

        legend: {
            symbolHeight: 10,
            symbolWidth: 10,
            symbolRadius: 0,
            align: 'left', 
            itemStyle: {
                "color": legendColor
            }
        },
        
    });

}
