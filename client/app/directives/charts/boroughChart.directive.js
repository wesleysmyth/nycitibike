(function() {
  'use strict';

  angular.module('boroughChart', ['core.d3', 'core.models'])
    .directive('boroughChart', [
    'd3Service', 'dataservice', 'ChartModel', '$stateParams', function (d3Service, dataservice, ChartModel, $stateParams) {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs, $window) {
          var vm = scope;

          $('.title').append('<div class="loading" style="margin-top: 100px;"></div>');

          // remove any existing svg elements and charts if another chart has been loaded previously
          if (d3Service.ddd) {
            // vm.chartData = undefined;
            d3Service.ddd.select('svg').remove();
          }

          // set the borough in the state parameters equal to the db desired format
          vm.borough = $stateParams.borough === 'brooklyn' ? 'Brooklyn' : 'Manhattan';

          dataservice.getCitibikeData(vm.borough).then(function (results) {
            var stations = results.data;
            vm.chartData = new ChartModel.constructor(stations);

            $('.loading').remove();

            d3Service.d3().then(function (d3) {
              d3Service.buildChart(d3, attrs, vm, stations, $window, 'borough');
            });
          });
        }
      };
    }]);

})();
