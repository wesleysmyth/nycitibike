(function() {
  'use strict';

  angular.module('stationChart', ['core.d3', 'core.models'])
    .directive('stationChart', [
    'd3Service', 'dataservice', 'ChartModel', '$stateParams', function (d3Service, dataservice, ChartModel, $stateParams) {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs, $window) {
          var vm = scope;

          $('.title').append('<div class="loading" style="margin-top: 100px;"></div>');

          // remove any existing svg elements if another chart has been loaded previously
          if (d3Service.ddd) {
            d3Service.ddd.select('svg').remove();
          }

          // set the postal code equal to the code defined in the parameters
          vm.stationName = $stateParams.stationName;
          vm.stationId = $stateParams.stationId;

          dataservice.getCitibikeData('station/' + vm.stationId).then(function (results) {
            var stations = results.data;
            vm.chartData = new ChartModel.constructor(stations);

            $('.loading').remove();

            d3Service.d3().then(function (d3) {
              d3Service.buildChart(d3, attrs, vm, stations, $window, 'station');
            });
          });
        }
      };
    }]);

})();
