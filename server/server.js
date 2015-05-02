(function(){
  'use strict';

  var express = require('express');
  var db = require('../db/config.js');
  var loadData = require('./services/loadCitibikeData.js')(db.Station);
  var updateData = require('./services/updateCitibikeData.js')(db.Station);
  var router = require('./router.js')(db.Station, express);
  var cors = require('cors');
  var app = express();

  app.use(cors());

  // route to retrieve citibike data
  app.use('/citibike', router);

  // use client directory to serve static files
  app.use(express.static(__dirname + '/../client'));

  // Connect to MongoDB through mongoose connection
  db.mongooseConnect();

  // load and store all initial Citibike station data in db
  // loadData();

  // updateData();

  // set interval for continuous data updates every five minutes
  setInterval(function () {
    updateData();
    console.log('30 minute data has updated');
  }, 1800000);


  module.exports = app;

})();
