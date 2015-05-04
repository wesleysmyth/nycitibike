(function() {
  'use strict';

  /**
   *  Directive used to display chart for all of NYC
   */
  angular.module('cityChart', ['core.d3', 'core.models'])
    .directive('cityChart', [
    'd3Service', 'dataservice', 'ChartModel', function (d3Service, dataservice, ChartModel) {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs, $window) {

          // set the scope equal to vm (view model)
          var vm = scope;

          // append the loading div while data is being retrieved
          $('.title').append('<div class="loading" style="margin-top: 100px;"></div>');

          // remove any existing svg elements if another chart has been loaded previously
          if (d3Service.ddd) {
            d3Service.ddd.select('svg').remove();
          }

          // return data for the city
          dataservice.getCitibikeData().then(function (results) {
            var stations = results.data;

            // set the chartData equal to the result of the api call
            vm.chartData = new ChartModel.constructor(stations);

            // remove the loading div
            $('.loading').remove();

            // build the chart
            d3Service.d3().then(function (d3) {
              d3Service.buildChart(d3, attrs, vm, stations, $window, 'city');
            });
          });
        }
      };
    }]);

})();
