(function(){
  'use strict';
  
  /**
   * module.exports - exports the schemas object as a module
   * 
   * @param {object} mongoose - instance of mongoose
   * @return {object} schemas - schemas object contains all schema data
   */  
  module.exports = function (mongoose) {
    var Schema = mongoose.Schema;
    var schemas = {};

    // define minute schema
    schemas.minuteSchema = new Schema({
      value: Number,
      avgAvailableBikes: Number,
      avgAvailableDocks: Number,
      maxBikes: Number,
      minBikes: Number,
      count: Number
    });

    // define hour schema
    schemas.hourSchema = new Schema({
      value: Number,
      minutes: [schemas.minuteSchema]
    });

    // define station Schema
    schemas.stationSchema = new Schema({
      stationId: Number,
      stationName: String,
      latitude: Number,
      longitude: Number,
      totalDocks: Number,
      postalCode: Number,
      borough: String,
      hours: [schemas.hourSchema]
    });

    return schemas;

  };

})();
