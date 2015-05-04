(function() {
  'use strict';

  /**
   *  Directive used to display charts for either borough
   */
  angular.module('boroughChart', ['core.d3', 'core.models'])
    .directive('boroughChart', [
    'd3Service', 'dataservice', 'ChartModel', '$stateParams', function (d3Service, dataservice, ChartModel, $stateParams) {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs, $window) {
          
          // set the scope equal to vm (view model)
          var vm = scope;

          // append the loading div while data is being retrieved
          $('.title').append('<div class="loading" style="margin-top: 100px;"></div>');

          // remove any existing svg elements and charts if another chart has been loaded previously
          if (d3Service.ddd) {
            d3Service.ddd.select('svg').remove();
          }

          // set the borough in the state parameters equal to the db desired format
          vm.borough = $stateParams.borough === 'brooklyn' ? 'Brooklyn' : 'Manhattan';

          // return data for the specific borough
          dataservice.getCitibikeData(vm.borough).then(function (results) {
            var stations = results.data;

            // set the chartData equal to the result of the api call
            vm.chartData = new ChartModel.constructor(stations);

            // remove the loading div
            $('.loading').remove();

            // build the chart
            d3Service.d3().then(function (d3) {
              d3Service.buildChart(d3, attrs, vm, stations, $window, 'borough');
            });
          });
        }
      };
    }]);

})();
