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
                    format: '<div class="nps-gauge-value-container"><div class="nps-gauge-value">{y}</div>' +
                        '<div class="nps-gauge-text">Avg NPS score</div><div>'
                },
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
                y: 16,
                useHTML: true,
                format: '<div class="nps-gauge-y-label">{value}</div>' // use format to style the label font, size and color.
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
                shape: 'arc',
                borderWidth: 0 // remove out border
            },
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
    const gaugeBarTitle = "Overal NPS results";

    const detractorColor = "#D13438";
    const passiveColor = "#EF5F20";
    const promoterColor = "#107C10";

    const detractorName = "Detractors(0-6)";
    const passiveName = "Passives(7-8)";
    const promoterName = "Promoters(9-10)";

    Highcharts.chart(obj.container, {

        chart: {
            type: 'bar',
            height: 90,
            width: 390,
            spacing: [0, 0, 0, 0],
            margin: [0, 0, 0, 0]
        },

        title: {
            align: 'left',
            margin: 0,
            style: { fontSize: "1rem" },
            useHTML: true,
            text: '<div class="nps-bar-title">' + gaugeBarTitle + '</div>' // style the title
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                pointWidth: 35,
                events: { // Disable the click event of legend
                    legendItemClick: function (e) {
                        e.preventDefault();
                    }
                }
            },
            bar: {
                dataLabels: {
                    enabled: true,                    
                    style: {
                        textOutline: 'none' // remove text stroke
                    },                   
                    useHTML: true,
                    format:'<div class="nps-bar-value">{y} %</div>'
                    
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

        series: [
            {
                name: detractorName,
                data: [obj.data[2]],
                color: detractorColor,
            },
            {
                name: passiveName,
                data: [obj.data[1]],
                color: passiveColor,
            }, {
                name: promoterName,
                data: [obj.data[0]],
                color: promoterColor
            }
        ],
        credits: {
            enabled: false
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

        legend: {
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 0,
            align: 'left',           
            itemDistance: 10,
            margin: 10,
            padding: 0,
            useHTML: true,
            labelFormat: '<div class="legend-label">{name}</div>'            
        },

    });

}
