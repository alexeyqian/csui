// shared constants
const barColor = '#7084E3';
const barBackgroundColor = '#F2F3F5';
const tooltipColor = '#EEE';
const tooltipBackgroundColor = 'black';
const legendColor = "#605E5C";

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
const heightMap = [[8, 450], // first number is bar height, second number is chart height
/*   1         2          3          4          5          6          7          8          9      10    */
[0, 0], [30, 150], [30, 200], [30, 250], [30, 300], [30, 350], [30, 400], [30, 450], [25, 450], [25, 450],
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