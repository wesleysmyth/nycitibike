(function() {
  'use strict';

  /**
   * module.exports - exports the init function as a module
   * 
   * @param {function} Station - constructor
   * @return {function} init - loads all citibike data on app initialization
   */  
  module.exports = function (Station) {
    var request = require('request');
    var fs = require('fs');
    var Promise = require('bluebird');
    var handlers = require('../../db/handlers.js')(Station);
    var allStations = []; // array of all stations with relevant station information
    var subStations = []; // subarrays of five stations each
    var subStationDelay = 0;
    var stationsLength;

    // data aggregation services for stations
    var services = {
      splitStations: splitStations,
      locateStations: locateStations,
      getStationLocation: getStationLocation
    };

    // init() creates initial app request to get all station data to store in db
    function init () {
      request
      .get('http://www.citibikenyc.com/stations/json', function (error, response, body) {
        if (!error && response.statusCode === 200) {
          
          /** promisify the splitStations service so locateStations 
           *  happens upon splitStations completion
           */
          var splitStationsPromise = Promise.promisify(services.splitStations);
          
          // split stations and locate the stations
          splitStationsPromise(body)
          .then(services.locateStations())
          .catch(function (err) {
            console.error('Error splitting the stations: ', err);
          });
        }
      });
    }

    /**
     * splitStations() splits citibike stations into subarrays of five stations each 
     * for the google geocode api, since the api can only handle five requests per second
     * 
     * @param {string} body - all data returned from the initial citibike api call in JSON format
     */
    function splitStations(body) {
      var results = JSON.parse(body);
      var time = results.executionTime;
      var stations = results.stationBeanList;
      var nextFiveStations = [];
      stationsLength = stations.length;

      for (var i = 0; i < stationsLength; i++) {

        var station = stations[i];
        var bikeStation = {};

        bikeStation.id = station.id;
        bikeStation.stationName = station.stationName;
        bikeStation.latitude = station.latitude;
        bikeStation.longitude = station.longitude;
        bikeStation.totalDocks = station.totalDocks;
        bikeStation.availableDocks = station.availableDocks;
        bikeStation.availableBikes = station.availableBikes;


        if (i % 5 === 0 || i === stationsLength - 1) {
          nextFiveStations.push(bikeStation);
          subStations.push(nextFiveStations);
          nextFiveStations = [];
        } else {
          nextFiveStations.push(bikeStation);
        }
      }
    }

    // locateStations() calls getStationLocation() for each station
    function locateStations() {

      // iterate through each station list in the subStations array
      subStations.forEach(function (subStationList) {

        // increase the delay time for the api call (rate limit on api)
        subStationDelay += 1000;

        // wrap setTimeout in an IIFE to preserve argument values
        (function (subStationList, subStationDelay){
          
          setTimeout(function() {
            console.log('All stations aggregated so far: ', allStations.length);

            // attach postal code and borough for each station
            subStationList.forEach(function (station) {
              services.getStationLocation(station);
            });
          }, subStationDelay);

        }(subStationList, subStationDelay));

      });
    }

    /**
     * getStationLocation() attaches the postal code and borough 
     * to each individual station object and calls the initialSave
     * handler to save all the stations to the db
     * 
     * @param {object} station - an individual station object
     */
    function getStationLocation(station) {
      request
      .get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + station.latitude + ',' + station.longitude + '&key=AIzaSyDy8RnGMABHlpaGjS2fxgrcX-ASgtibJBU', function (error, response, body) {
        if (!error && response.statusCode === 200) {

          // parse the results from the latitude and longitude given
          var results = JSON.parse(body).results[0];

          // store the postal code of the station as an integer
          station.postalCode = 
            parseInt(results.address_components.filter(function (component) {
              return component.types.indexOf('postal_code') >= 0;
            })[0].long_name, 10);

          // store the borough of the station
          station.borough = 
            results.address_components.filter(function (component) {
              return component.types.indexOf('sublocality_level_1') >= 0;
            })[0].long_name;
          
          // add the bike station to the allStations array
          allStations.push(station);

          // if we have reached the last station of the last subStation array
          if (allStations.length === stationsLength) {
            console.log('All stations gathered (num): ', allStations.length);

            // save all initial station data to db
            handlers.initialSave(allStations);
          }
        }
      });
    }

    // outer modules only need access to the init function
    return init;

  };

})();
