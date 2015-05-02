(function() {

  angular
    .module('core.models')
    .factory('ChartModel', ChartModel);

  function ChartModel () {

    var chartModel = {
      constructor: constructor
    };

    return chartModel;

    /////////////////////////////////////

    function constructor (stations) {

      var chartData = [];
      
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
