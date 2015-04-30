(function() {

  angular
    .module('core.models')
    .factory('PostalCodeModel', PostalCodeModel);

  function PostalCodeModel () {

    var postalCodeModel = {
      constructor: constructor
    };

    return postalCodeModel;

    /////////////////////////////////////

    function constructor (stations) {
      var postalCodeData = {};

      // create postal code indexes in postalCodeData object
      stations.forEach(function (station) {
        if (!postalCodeData[station.postalCode]) {
          postalCodeData[station.postalCode] = [];
        }
      });

      // for each station postalCode
      for (var key in postalCodeData) {

        // create a 
        for (var i = 0; i < 48; i++) {
          var hour = Math.floor(i / 2);
          var minutes = i % 2 === 0 ? '00' : '30';
          postalCodeData[key][i] = { avgAvailableBikes: 0, time: hour + ':' + minutes, maxBikes: 0, minBikes: 0 };
        }

        var codeStations = stations.filter(function (station) {
          return station.postalCode === parseInt(key, 10);
        });
        
        codeStations.forEach(function (station) {
          return station.hours.forEach(function (hour) {
            return hour.minutes.forEach(function (minute) {
              var minuteIndex = minute.value === 0 ? 0 : 1;
              postalCodeData[key][(hour.value * 2) + minuteIndex].avgAvailableBikes += minute.avgAvailableBikes;
              postalCodeData[key][(hour.value * 2) + minuteIndex].maxBikes += minute.maxBikes;
              postalCodeData[key][(hour.value * 2) + minuteIndex].minBikes += minute.minBikes;
            })
          });
        });

      }

      return postalCodeData;
    }
  }

})();
