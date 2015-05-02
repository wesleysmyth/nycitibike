(function () {
  'use strict';

  /**
   * module.exports - exports the router module as a function
   * 
   * @param {function} Station - constructor
   * @param {function} express - the express function instance
   * @return {function} router - returns the router function for routing
   */
  module.exports = function (Station, express) {

    var Promise = require('bluebird');
    var handlers = require('../db/handlers.js')(Station);
    var router = express.Router();

    // route for retrieving all citibike data from the db
    router.get('/', function (req, res) {
      console.log('retrieving citibike data');

      // db query to send all station documents to client
      Station.find({}, function (err, stations) {
        if (err) {
          return console.error('error retrieving station data: ', err);
        }
        
        console.log('success retrieving stations from the db');

        // stringify the results to send to the client
        var data = JSON.stringify(stations);
        res.send(data);
      });

    });

    // route for retrieving manhattan citibike data from the db
    router.get('/manhattan', function (req, res) {
      console.log('retrieving manhattan citibike data');

      // db query to send all station documents to client
      Station.find({ borough: 'Manhattan' }, function (err, stations) {
        if (err) {
          return console.error('error retrieving station data: ', err);
        }
        
        console.log('success retrieving stations from the db');

        // stringify the results to send to the client
        var data = JSON.stringify(stations);
        res.send(data);
      });

    });

    // route for retrieving all citibike data from the db
    router.get('/brooklyn', function (req, res) {
      console.log('retrieving brooklyn citibike data');

      // db query to send all station documents to client
      Station.find({ borough: 'Brooklyn' }, function (err, stations) {
        if (err) {
          return console.error('error retrieving station data: ', err);
        }
        
        console.log('success retrieving stations from the db');

        // stringify the results to send to the client
        var data = JSON.stringify(stations);
        res.send(data);
      });

    });

    // route for retrieving all citibike data from the db
    router.get('/postalCode/*', function (req, res) {
      console.log('retrieving postalCode citibike data');
      var postalCode = req.url.split('/')[2];
      
      // db query to send all station documents to client
      Station.find({ postalCode: postalCode }, function (err, stations) {
        if (err) {
          return console.error('error retrieving station data: ', err);
        }
        
        console.log('success retrieving stations from the db');

        // stringify the results to send to the client
        var data = JSON.stringify(stations);
        res.send(data);
      });

    });

    // route for retrieving all citibike data from the db
    router.get('/station/*', function (req, res) {
      console.log('retrieving station citibike data');
      var stationId = req.url.split('/')[2];
      
      // db query to send all station documents to client
      Station.find({ stationId: stationId }, function (err, stations) {
        if (err) {
          return console.error('error retrieving station data: ', err);
        }
        
        console.log('success retrieving station from the db');

        // stringify the results to send to the client
        var data = JSON.stringify(stations);
        res.send(data);
      });

    });

    return router;
  }

})();
