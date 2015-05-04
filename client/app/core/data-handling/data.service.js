(function() {
  'use strict';

  angular
    .module('core.data')
    .factory('dataservice', dataservice);
  
  /**
   * dataservice - service to call the api layer of the digital ocean droplet server
   * 
   * @param {function} $http - inject the $http service
   * @return {object} service - returns the service object with the getCitibikeData function
   */
  function dataservice($http) {
    var hostURL = 'http://104.236.132.57:8000';

    var service = {
      getCitibikeData: getCitibikeData
    };

    return service;
    
    ///////////////////////////////////////////////////////////////

    /**
     * getCitiBikeData - returns all the station data based on the current route (request)
     * 
     * @param {string} route - route that indicates which data to return from api layer 
     * @return {object} stations - stations object with all relevant data to send to the make chart service 
     */
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
