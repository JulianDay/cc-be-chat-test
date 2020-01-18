// timeManager.js
// Author:JiDa.Dai
// Interval one second a Tick
const wordStatisticsMgr = require('./wordStatisticsManager')

function secondTickFunc() {
    wordStatisticsMgr.secondTick();
}
// one second a Tick
setInterval(secondTickFunc, 1000);