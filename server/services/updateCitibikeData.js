(function() {
  'use strict';
  
  /**
   * module.exports - exports the update function as a module
   * 
   * @param {function} Station - constructor
   * @return {function} update - updates avg available bikes, docks, and count for each station
   */  
  module.exports = function (Station) {
    var request = require('request');
    var handlers = require('../../db/handlers.js')(Station);

    // update all station data with average available bikes and docks
    function update () {
      request
      .get('http://www.citibikenyc.com/stations/json', function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var results = JSON.parse(body);
          var allStations = results.stationBeanList;
          var time = results.executionTime;

          // update and save all station data to db
          handlers.updateData(allStations, time);

        }
      });
    }

    // outer modules only need access to the update function
    return update;

  };

})();
