(function(){
  'use strict';

  /**
   * module.exports - exports the handlers object as a module
   * 
   * @param {function} Station - constructor
   * @return {object} handlers - all handlers functions from this module
   */
  module.exports = function (Station) {
    
    // db handlers to export
    var handlers = {
      initialSave: initialSave,
      updateData: updateData
    };

    // handler services
    var services = {
      generateHoursSchema: generateHoursSchema,
      updateAndSave: updateAndSave
    };

    /**
     * initialSave() creates station documents and saves
     * initial citibike station data to db
     * 
     * @param {array} stations - all citibike station objects
     */
    function initialSave (stations) {
      var hoursSchema = services.generateHoursSchema();
      var stationCount = 0;

      // iterate through all stations to create individual station objects
      for (var i = 0; i < stations.length; i++) {

        (function(index){
          var station = stations[index];
          
          // create a new station based on the properties of the current station in the station list
          var newStation = new Station({
            stationId: station.id,
            latitude: station.latitude,
            longitude: station.longitude,
            totalDocks: station.totalDocks,
            availableDocks: station.availableDocks,
            availableBikes: station.availableBikes,
            postalCode: station.postalCode,
            borough: station.borough,
            hour: hoursSchema
          });

          // save the station to the db
          newStation.save(function (err) {
            // increment station saved count
            console.log('saving station number: ' + index);
            stationCount++;
            if (err) {
              return console.error('Error saving a new station on initial save: ', err);
            } else if (stationCount === stations.length - 1) {
              console.log('All Stations saved!');
            }
          });

        })(i);

      }
    }

    /**
     * updateData() updates the average number of 
     * bikes, docks and count for every citibike station
     * 
     * @param {array} allStations - all citibike station objects
     * @param {string} time - current time
     */
    function updateData (allStations, time) {
      var splitTime = time.split(':');
      var hour = time.slice(-2) === 'PM' ? parseInt(splitTime[0].slice(-2), 10) + 12 : parseInt(splitTime[0].slice(-2), 10);
      var minute = parseInt(splitTime[1] / 5, 10) * 5;

      // minute library maps every fifth minute to an index in the minutes schema array
      var minuteLibrary = { 0:0, 5:1, 10:2, 15:3, 20:4, 25:5, 30:6, 35:7, 40:8, 45:9, 50:10, 55:11 };

      // mongoose syntax to point to the the minute object within a station
      var minuteString = 'hour.' + hour + '.minutes.' + minuteLibrary[minute];

      // for each station, update the average bikes, docks, and count for this five minute period
      allStations.forEach(function (station) {
        var stationId = station.id;
        var availableDocks = station.availableDocks;
        var availableBikes = station.availableBikes;
        var query = { stationId: stationId };

        // find the specific station in the db based on stationId
        Station.findOne(query, function (err, dbStation) {
          if (err) {
            return console.error('Error finding station by stationId', err);
          } 
            
          // grab the current minute object from the station and update the averages and count
          var currentMinute = dbStation.hour[hour].minutes[minuteLibrary[minute]]
          currentMinute.avgBikes = ((currentMinute.avgBikes * currentMinute.count) + availableBikes) / (currentMinute.count + 1);
          currentMinute.avgDocks = ((currentMinute.avgDocks * currentMinute.count) + availableDocks) / (currentMinute.count + 1);
          currentMinute.count++;

          // set the update object equal to the currentMinute object
          var update = { $set: { minuteString: currentMinute } };
          
          // update and save the current station
          services.updateAndSave(dbStation, query, update);

        });

      });
    }
    
    /**
     * updateAndSave() updates a station with the average bikes, docks, and count
     *
     * @param {object} dbStation - the current station model in the db
     * @param {object} query - the query object to find the station using stationId
     * @param {object} update - the update object used to update the current minute
     * object in the db
     */
    function updateAndSave (dbStation, query, update) {

      // update the station with the new minute data
      dbStation.update(query, update, function (err, station) {
        if (err) {
          console.error('error updating station');
        } else {

          // save the updates
          dbStation.save(function (err) {
            if (err) {
              console.error('error saving station: ', err);
            } else {
              console.log('dbStation: ' + dbStation.stationId + ' updated and saved');
            }
          });
        }
      });
    }

    /**
     * generateHoursSchema() returns an array to be used as 
     * the schema for hours with the minutes schema bundled in
     *
     * @return {array} hoursSchema - all hours of the day, each 
     * hour object has an array of five minute interval objects
     */
    function generateHoursSchema () {

      var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
      var fiveMinutes = [0,5,10,15,20,25,30,35,40,45,50,55];
      var hoursSchema = [];

      for (var i = 0; i < hours.length; i++) {
        var hour = { value: hours[i], minutes: []};
        for (var j = 0; j < fiveMinutes.length; j++) {
          hour.minutes.push({ value: fiveMinutes[j], avgBikes: 0, avgDocks: 0, count: 0 });
        }
        hoursSchema.push(hour);
      }

      return hoursSchema;
    }

    // export the handlers object
    return handlers;

  };

})();
