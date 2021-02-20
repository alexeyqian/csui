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
 * 5. Scrollbar shoul be added if too much bars 
 * */

const minBarHeight = 8;
const minBarGap = 16;
const barNumberThreshold = 20;
const barHeightMap = [8,
    /*1 2   3   4   5   6   7   8   9   10  */
    8, 30, 30, 30, 30, 30, 25, 25, 20, 20,
    20, 20, 20, 20, 15, 15, 15, 15, 12, 12];

/*
const chartHeightMap = [200,
    //1  2    3    4    5    6    7    8    9    10   
    200, 250, 300, 350, 400, 400, 400, 400, 400, 400];
*/

function getBarHeight(length) {
    if (length >= barNumberThreshold)
        return minBarHeight;
    else
        return barHeightMap[length % barNumberThreshold];
}


// extra space for axis lable, title or legend
function getChartHeight(length, extraSpace) {
    let barHeight = getBarHeight(length);
    let barGap = barHeight < minBarGap ? minBarGap : barHeight;
    let maxHeight = barNumberThreshold * (barHeight + barGap) + extraSpace;

    let height = length * (barHeight + barGap) + extraSpace;
    return height > maxHeight ? maxHeight : height;

}
// End of Dynamic height logic