(function(){
  'use strict';

  var mongoose = require('mongoose');
  var schema = require('./schema.js')(mongoose);
  var Station = require('../server/models/station.js')(mongoose, schema);
  var db = mongoose.connection;

  // register error and db connection callbacks
  db.on('error', console.error.bind(console, 'mongoose connection error:'));
  db.once('open', function (callback) {
    console.log('mongoose connection established');
  });

  // exports mongooseConnect function to connect to mongodb
  module.exports.mongooseConnect = function () {
    mongoose.connect('mongodb://localhost/citibike');
  };

  // exports Station constructor function
  module.exports.Station = Station;
  
})();
