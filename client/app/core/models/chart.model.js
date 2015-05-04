(function() {

  angular
    .module('core.models')
    .factory('ChartModel', ChartModel);

  /**
   * ChartModel - factory for chart models
   * 
   * @return {object} chartModel - returns the chartModel constructor function
   */
  function ChartModel () {

    var chartModel = {
      constructor: constructor
    };

    return chartModel;

    /////////////////////////////////////

    /**
     * constructor - chart model constructor function
     * 
     * @param {array} stations - all of the stations to construct the chart 
     * @return {array} chartData - returns an array of the 
     */
    function constructor (stations) {

      var chartData = [];

      // set up the hour objects for the chartData array
      for (var i = 0; i < 48; i++) {
        var hour = Math.floor(i / 2);
        var minutes = i % 2 === 0 ? '00' : '30';
        chartData[i] = { avgAvailableBikes: 0, time: hour + ':' + minutes, maxBikes: 0, minBikes: 0 };
      }

      // capture average bikes available at each half hour for the entire city
      stations.forEach(function (station) {
        station.hours.forEach(function (hour) {
          hour.minutes.forEach(function (minute) {
            var minuteIndex = minute.value === 0 ? 0 : 1;
            chartData[(hour.value * 2) + minuteIndex].avgAvailableBikes += minute.avgAvailableBikes;
            chartData[(hour.value * 2) + minuteIndex].maxBikes += minute.maxBikes;
            chartData[(hour.value * 2) + minuteIndex].minBikes += minute.minBikes;
          });
        });
      });

      return chartData;

    }
  }

})();
