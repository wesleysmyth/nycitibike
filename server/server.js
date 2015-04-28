(function(){
  'use strict';

  var express = require('express');
  var db = require('../db/config.js');
  var loadData = require('./services/loadCitibikeData.js')(db.Station);
  var updateData = require('./services/updateCitibikeData.js')(db.Station);
  var app = express();

  // use client directory to serve static files
  app.use(express.static(__dirname + '/../client'));

  // Connect to MongoDB through mongoose connection
  db.mongooseConnect();

  // load and store all initial Citibike station data in db
  loadData();

  // set interval for continuous data updates every five minutes
  setInterval(function () {
    updateData();
  }, 300000);


  module.exports = app;

})();
