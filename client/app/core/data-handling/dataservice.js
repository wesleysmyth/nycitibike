(function() {
  'use strict';

  angular
    .module('app.data')
    .factory('dataservice', dataservice);
  
  /*FIXME: makesure ngInject is working during minification*/
  /* @ngInject */ 
  function dataservice($http) {
    var hostURL = 'http://localhost:8000';

    var service = {
      getCitibikeData: getCitibikeData
    };

    return service;
    
    ///////////////////////////////////////////////////////////////

    function getCitibikeData () {   
      console.time("answer time"); 
      return $http({
        method: 'GET',
        url: hostURL + '/citibike',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .success(function (stations){
        console.log('here are all the stations', stations);
        console.timeEnd("answer time");
        window.stations = stations;
      })
      .error(function (err){
        console.log('error retrieving stations');
        throw err;
      });
    }

  }

})();
