(function() {

  angular
    .module('core.models')
    .factory('BoroughModel', BoroughModel);

  function BoroughModel () {

    var boroughModel = {
      constructor: constructor
    };

    return boroughModel;

    /////////////////////////////////////

    function constructor (stations, borough) {
      var boroughData = [];
      
      for (var i = 0; i < 48; i++) {
        var hour = Math.floor(i / 2);
        var minutes = i % 2 === 0 ? '00' : '30';
        boroughData[i] = { avgAvailableBikes: 0, time: hour + ':' + minutes };
      }

      // capture average bikes available at each half hour for Brooklyn or Manhattan
      stations.filter(function (station) {
        return station.borough === borough;
      })
      .forEach(function (station) {
        station.hours.forEach(function (hour) {
          hour.minutes.forEach(function (minute) {
            var minuteIndex = minute.value === 0 ? 0 : 1;
            boroughData[(hour.value * 2) + minuteIndex].avgAvailableBikes += minute.avgAvailableBikes;
          });
        });
      });

      return boroughData;
    }
  }

})();
