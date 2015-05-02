(function() {
  'use strict';

  angular
    .module('core.data')
    .factory('dataservice', dataservice);
  
  function dataservice($http) {
    var hostURL = 'http://104.236.132.57:8000';

    var service = {
      getCitibikeData: getCitibikeData
    };

    return service;
    
    ///////////////////////////////////////////////////////////////

    function getCitibikeData (route) {   
      console.time("answer time");
      route = route || '';

      return $http({
        method: 'GET',
        url: hostURL + '/citibike' + '/' + route,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .success(function (stations){
        console.log('here are all the stations', stations);
        console.timeEnd("answer time");
        return stations;
      })
      .error(function (err){
        console.log('error retrieving stations');
        throw err;
      });
    }

  }

})();
