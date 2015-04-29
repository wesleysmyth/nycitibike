(function() {
  'use strict';

  angular.module('app.directives', ['core.d3', 'core.models'])
    .directive('chart', [
    'd3Service', 'dataservice', 'CityModel','BoroughModel', 'PostalCodeModel', 
    function (d3Service, dataservice, CityModel, BoroughModel, PostalCodeModel) {
      return {
        restrict: 'EA',
        link: function(scope, element, attrs, $window) {
          var vm = scope;

          dataservice.getCitibikeData().then(function (results) {
            var stations = results.data;

            vm.cityData = new CityModel.constructor(stations);
            vm.brooklynData = new BoroughModel.constructor(stations, 'Brooklyn');
            vm.manhattanData = new BoroughModel.constructor(stations, 'Manhattan');
            vm.postalCodeData = new PostalCodeModel.constructor(stations);
            
            console.log('vm.cityData', vm.cityData);
            console.log('vm.brooklynData', vm.brooklynData);
            console.log('vm.manhattanData', vm.manhattanData);
            console.log('vm.postalCodeData', vm.postalCodeData);

            d3Service.d3().then(function(d3) {
              // our d3 code will go here
              var margin = parseInt(attrs.margin, 10) || 20;
              var barHeight = parseInt(attrs.barHeight, 10) || 20;
              var barPadding = parseInt(attrs.barPadding, 10) || 5;
              
              var svg = d3.select(element[0])
              .append("svg")
              .style('width', '100%');

              // Browser onresize event
              window.onresize = function() {
                vm.$apply();
              };


              // hard-code data
              vm.data = stations;
              // console.log('vm.stations', vm.stations);
              // [
              //   {name: "Greg", score: 98},
              //   {name: "Ari", score: 96},
              //   {name: 'Q', score: 75},
              //   {name: "Loser", score: 48}
              // ];

              // Watch for resize event
              vm.$watch(function() {
                return angular.element($window).innerWidth;
              }, function() {
                vm.render(vm.data);
              });

              vm.render = function(data) {
                // our custom d3 code

                // remove all previous items before render
                svg.selectAll('*').remove();

                // If we don't pass any data, return out of the element
                if (!data) {
                  return;
                }
                // setup variables
                var width = d3.select(element[0]).node().offsetWidth - margin;
                // calculate the height
                var height = vm.data.length * (barHeight + barPadding);
                // Use the category20() scale function for multicolor support
                var color = d3.scale.category20();
                // our xScale
                var xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    // console.log('d.hours[11].minutes[0].avgAvailableBikes', d.hours[11].minutes[0].avgAvailableBikes);
                    return d.hours[11].minutes[0].avgAvailableBikes;
                  })])
                  .range([0, width]);

                console.log('width', width);
                console.log('height', height);
                console.log('color', color());
                console.log('xScale', xScale());

                // set the height based on the calculations above
                svg.attr('height', height);

                //create the rectangles for the bar chart
                svg.selectAll('rect')
                  .data(data)
                  .enter()
                  .append('rect')
                  .attr('height', barHeight)
                  .attr('width', 140)
                  .attr('x', Math.round(margin/2))
                  .attr('y', function (d,i) {
                    return i * (barHeight + barPadding);
                  })
                  .attr('fill', function (d) { 
                    return color(d.hours[11].minutes[0].avgAvailableBikes); 
                  })
                  .transition()
                  .duration(1000)
                  .attr('width', function (d) {
                    return xScale(d.hours[11].minutes[0].avgAvailableBikes);
                  });
              }

            });
          });
        }
      };
    }]);

})();
