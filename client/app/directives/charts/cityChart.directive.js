(function() {
  'use strict';

  angular.module('cityChart', ['core.d3', 'core.models'])
    .directive('cityChart', [
    'd3Service', 'dataservice', 'ChartModel', function (d3Service, dataservice, ChartModel) {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs, $window) {
          var vm = scope;

          $('.title').append('<div class="loading" style="margin-top: 100px;"></div>');

          // remove any existing svg elements if another chart has been loaded previously
          if (d3Service.ddd) {
            // vm.chartData = undefined;
            d3Service.ddd.select('svg').remove();
          }

          dataservice.getCitibikeData().then(function (results) {
            var stations = results.data;
            vm.chartData = new ChartModel.constructor(stations);

            $('.loading').remove();

            d3Service.d3().then(function (d3) {
              d3Service.buildChart(d3, attrs, vm, stations, $window, 'city');
            });
          });
        }
      };
    }]);

})();
