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

    return router;
  }

})();
