// shared constants
const barColor = '#7084E3';
const barBackgroundColor = '#F2F3F5';
const tooltipColor = '#EEE';
const tooltipBackgroundColor = "rgba(0, 0, 0, 1)";
const legendColor = "#605E5C";

var sharedChartConfig = {
    tooltip: function (x, y, z) {
        return '<div class="tooltip-container"><div>'
            + x + ', <span class="tooltip-value">'
            + y + '%</span></div><br/><div class="tooltip-response-count">'
            + z + ' responses</div></div>';
    }
};

var ChoiceChartConfig = {
    /* Choice Chart UX Requirements:
     * 1. Chart height should be dynamic accroding to bar numbers to avoid too big gap between bars.
     * 2. Minimum bar height should be 8px
     * 3. Minimum gap should be 16px
     * 4. Bar height should be reduced gradually according to increased bar numbers.
     * 5. Scrollbar shoul be added if too much bars 
     * */

    minBarHeight: 8,
    minBarGap: 16,
    barNumberThreshold: 20,
    barHeightMap: [8,
        /*1 2   3   4   5   6   7   8   9   10  */
        8, 30, 30, 30, 30, 30, 25, 25, 20, 20,
        20, 20, 20, 20, 15, 15, 15, 15, 12, 12],

    getBarHeight: function (barCount) {
        if (barCount >= this.barNumberThreshold)
            return this.minBarHeight;
        else
            return this.barHeightMap[barCount % this.barNumberThreshold];
    },

    // extra space for axis lable, title or legend
    getChartHeight: function (barCount, extraSpace) {
        let barHeight = this.getBarHeight(barCount);
        let barGap = barHeight < this.minBarGap ? this.minBarGap : barHeight;
        let maxHeight = this.barNumberThreshold * (barHeight + barGap) + extraSpace;

        let height = barCount * (barHeight + barGap) + extraSpace;
        return height > maxHeight ? maxHeight : height;
    },
};

var RatingChartConfig = {
    /* Rating Chart UX Requirements:
     * 1. Column numbers ranging from 2 - 10, chat width should grow accordingly.
     * 2. Minimum bar width should be 20px
     * 3. Minimum gap should be 16px
     * 4. Column width should be reduced gradually according to increased bar numbers.
     * */
    minColumnWidth: 8,
    minColumnGap: 16,
    countThreshold: 11,
    columnWidthMap: [8,
        /*1 2   3   4   5   6   7   8   9   10  11 */
        8, 30, 30, 30, 30, 30, 25, 25, 20, 20, 20],
    chartWidthMap: [8,
        /*1 2    3    4    5    6    7    8    9    10   11 */
        8, 250, 300, 300, 330, 400, 400, 400, 400, 400, 400],

    getColumnWidth: function (columnCount) {
        if (columnCount >= this.countThreshold)
            return minColumnWidth;
        else
            return this.columnWidthMap[columnCount % this.countThreshold];
    },

    // extra space for axis lable, title or legend
    getChartWidth: function (columnCount) {
        return this.chartWidthMap[columnCount % this.countThreshold];
        /*
        let columnWidth = this.getColumnWidth(columnCount);
        let columnGap = columnWidth < this.minColumnWidth ? this.minColumnGap : columnWidth;
        let maxWidth = this.countThreshold * (columnWidth + columnGap) + extraSpace;

        let width = columnCount * (columnWidth + columnGap) + extraSpace;
        return width > maxWidth ? maxWidth : width;
        */
    }
};

var LikertChartConfig = {
    optionColors: ["#4190FF", "#8D67C2", "#1A9EAD", "#1D2BA7", "#F736AD", "#632F12", "#E86B54",
        "#6C179A", "#7084E3", "#107C10", "#D13438", "#000000"],

    barNumberThreshold: 10,
    // extra space for axis lable, title or legend
    getChartHeight: function (barCount, extraSpace) {
        let barHeight = 20; // always 20px
        let barGap = 28; // always 28px
        let maxHeight = this.barNumberThreshold * (barHeight + barGap) + extraSpace;

        let height = barCount * (barHeight + barGap) + extraSpace;
        return height > maxHeight ? maxHeight : height;
    },
};