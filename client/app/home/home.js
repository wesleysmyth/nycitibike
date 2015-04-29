(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

    function Home ($state, $http, dataservice, StationModel) {

      // set $scope to vm (view model)
      var vm = this;
      vm.stations = [];
      
      vm.init = init;
      vm.constructStations = constructStations;

      /////////////////////////////////////////

      function init () {
        dataservice.getCitibikeData()
        .then(function (result) {
          vm.constructStations(result.data);
        })
        .catch(function (err) {
          console.error('error retrieving citibike data: ', err);
        });
      }

      function constructStations (stations) {
        stations.forEach(function (station) {
          var stationModel = new StationModel.constructor(station);
          vm.stations.push(stationModel);
        });
        console.log('vm.stations', vm.stations);
      }

    }

})();
