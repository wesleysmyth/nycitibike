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

                // If we don't pass any data, return out of the element
                if (!data) {
                  return;
                }

                function addAxesAndLegend (svg, xAxis, yAxis, margin, chartWidth, chartHeight) {
                  var legendWidth  = 200,
                      legendHeight = 100;

                  // clipping to make sure nothing appears behind legend
                  svg.append('clipPath')
                    .attr('id', 'axes-clip')
                    .append('polygon')
                      .attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
                                      (chartWidth - legendWidth - 1) + ',' + (-margin.top)                 + ' ' +
                                      (chartWidth - legendWidth - 1) + ',' + legendHeight                  + ' ' +
                                      (chartWidth + margin.right)    + ',' + legendHeight                  + ' ' +
                                      (chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
                                      (-margin.left)                 + ',' + (chartHeight + margin.bottom));

                  var axes = svg.append('g')
                    .attr('clip-path', 'url(#axes-clip)');

                  axes.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + chartHeight + ')')
                    .call(xAxis)
                    .selectAll('text')
                      .attr('dx', '-1.5em')
                      .attr('transform', function (d) {
                        return 'rotate(-55)' 
                      })
                      .style('display', function (d) {
                        if (d.getHours() === 0 && d.getMinutes() === 0) {
                          return 'none';
                        }
                      })

                  axes.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis)
                    .append('text')
                      .attr('transform', 'rotate(-90)')
                      .attr('y', 6)
                      .attr('dy', '.71em')
                      .style('text-anchor', 'end')
                      .text('Citibikes');

                  var legend = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + (chartWidth - legendWidth) + ', 0)');

                  legend.append('rect')
                    .attr('class', 'legend-bg')
                    .attr('width',  legendWidth)
                    .attr('height', legendHeight);

                  legend.append('rect')
                    .attr('class', 'outer')
                    .attr('width',  75)
                    .attr('height', 20)
                    .attr('x', 10)
                    .attr('y', 10);

                  legend.append('text')
                    .attr('x', 115)
                    .attr('y', 25)
                    .text('5% - 95%');

                  legend.append('rect')
                    .attr('class', 'inner')
                    .attr('width',  75)
                    .attr('height', 20)
                    .attr('x', 10)
                    .attr('y', 40);

                  legend.append('text')
                    .attr('x', 115)
                    .attr('y', 55)
                    .text('25% - 75%');

                  legend.append('path')
                    .attr('class', 'median-line')
                    .attr('d', 'M10,80L85,80');

                  legend.append('text')
                    .attr('x', 115)
                    .attr('y', 85)
                    .text('Average');
                }

                function drawPaths (svg, data, x, y) {
                  var upperOuterArea = d3.svg.area()
                    .interpolate('basis')
                    .x (function (d) { return x(new Date(2015,0,1,parseInt(d.time.split(':')[0], 10), parseInt(d.time.split(':')[1],10))) || 1; })
                    .y0(function (d) { return y(d.avgAvailableBikes); })
                    .y1(function (d) { return y(d.maxBikes); });

                  var upperInnerArea = d3.svg.area()
                    .interpolate('basis')
                    .x (function (d) { return x(new Date(2015,0,1,parseInt(d.time.split(':')[0], 10), parseInt(d.time.split(':')[1],10))) || 1; })
                    .y0(function (d) { return y(d.avgAvailableBikes); })
                    .y1(function (d) { return y(d.maxBikes); });

                  var medianLine = d3.svg.line()
                    .interpolate('basis')
                    .x(function (d) { return x(new Date(2015,0,1,parseInt(d.time.split(':')[0], 10), parseInt(d.time.split(':')[1],10))); })
                    .y(function (d) { return y(d.avgAvailableBikes); });

                  var lowerInnerArea = d3.svg.area()
                    .interpolate('basis')
                    .x (function (d) { return x(new Date(2015,0,1,parseInt(d.time.split(':')[0], 10), parseInt(d.time.split(':')[1],10))) || 1; })
                    .y0(function (d) { return y(d.avgAvailableBikes); })
                    .y1(function (d) { return y(d.minBikes); });

                  var lowerOuterArea = d3.svg.area()
                    .interpolate('basis')
                    .x (function (d) { return x(new Date(2015,0,1,parseInt(d.time.split(':')[0], 10), parseInt(d.time.split(':')[1],10))) || 1; })
                    .y0(function (d) { return y(d.avgAvailableBikes); })
                    .y1(function (d) { return y(d.minBikes); });

                  svg.datum(data);

                  svg.append('path')
                    .attr('class', 'area upper outer')
                    .attr('d', upperOuterArea)
                    .attr('clip-path', 'url(#rect-clip)');

                  svg.append('path')
                    .attr('class', 'area lower outer')
                    .attr('d', lowerOuterArea)
                    .attr('clip-path', 'url(#rect-clip)');

                  svg.append('path')
                    .attr('class', 'area upper inner')
                    .attr('d', upperInnerArea)
                    .attr('clip-path', 'url(#rect-clip)');

                  svg.append('path')
                    .attr('class', 'area lower inner')
                    .attr('d', lowerInnerArea)
                    .attr('clip-path', 'url(#rect-clip)');

                  svg.append('path')
                    .attr('class', 'median-line')
                    .attr('d', medianLine)
                    .attr('clip-path', 'url(#rect-clip)');
                }

                function startTransitions (svg, chartWidth, chartHeight, rectClip, x) {
                  rectClip.transition()
                    .duration(100*data.length)
                    .attr('width', chartWidth);
                }

                function makeChart (data) {
                  var svgWidth  = window.innerWidth - 60,
                      svgHeight = 500,
                      margin = { top: 20, right: 60, bottom: 40, left: 60 },
                      chartWidth  = svgWidth  - margin.left - margin.right,
                      chartHeight = svgHeight - margin.top  - margin.bottom;

                  var x = d3.time.scale().range([0, chartWidth])
                            .domain(d3.extent(data, function (d) {// return data.indexOf(d)})),
                              return new Date(2015,0,1,parseInt(d.time.split(':')[0], 10), parseInt(d.time.split(':')[1],10)) })),
                      y = d3.scale.linear().range([chartHeight, 0])
                            .domain([d3.min(data, function (d) { return d.minBikes*1.2; }), d3.max(data, function (d) { return d.maxBikes*1.4; })]);

                  var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(d3.time.minutes, 30)//.tickFormat(d3.time.format("%H:%M"))
                                .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(0),
                      yAxis = d3.svg.axis().scale(y).orient('left')
                                .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

                  var svg = d3.select('body').append('svg')
                    .attr('width',  svgWidth)
                    .attr('height', svgHeight)
                    .append('g')
                      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                  // clipping to start chart hidden and slide it in later
                  var rectClip = svg.append('clipPath')
                    .attr('id', 'rect-clip')
                    .append('rect')
                      .attr('width', 0)
                      .attr('height', chartHeight);

                  addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
                  drawPaths(svg, data, x, y);
                  startTransitions(svg, chartWidth, chartHeight, rectClip, x);
                }

                var parseDate  = d3.time.format('%Y-%m-%d').parse;

                var testData = [];
                for (var i = 0; i < 48; i++) {
                  var hour = Math.floor(i / 2);
                  var minutes = i % 2 === 0 ? '00' : '30';
                  testData[i] = { avgAvailableBikes: (Math.random() * 3000), time: hour + ':' + minutes, maxBikes: (((Math.random() / 2) + 0.5) * 4000), minBikes: (((Math.random() / 2)) * 1000) };
                }

                console.log('testData', testData);

                var data = testData;

                makeChart(vm.cityData);



                // // setup variables
                // var width = d3.select(element[0]).node().offsetWidth - margin;
                // // calculate the height
                // var height = vm.data.length * (barHeight + barPadding);
                // // Use the category20() scale function for multicolor support
                // var color = d3.scale.category20();
                // // our xScale
                // var xScale = d3.scale.linear()
                //   .domain([0, d3.max(data, function(d) {
                //     // console.log('d.hours[11].minutes[0].avgAvailableBikes', d.hours[11].minutes[0].avgAvailableBikes);
                //     return d.hours[11].minutes[0].avgAvailableBikes;
                //   })])
                //   .range([0, width]);

                // console.log('width', width);
                // console.log('height', height);
                // console.log('color', color());
                // console.log('xScale', xScale());

                // // set the height based on the calculations above
                // svg.attr('height', height);

                // //create the rectangles for the bar chart
                // svg.selectAll('rect')
                //   .data(data)
                //   .enter()
                //   .append('rect')
                //   .attr('height', barHeight)
                //   .attr('width', 140)
                //   .attr('x', Math.round(margin/2))
                //   .attr('y', function (d,i) {
                //     return i * (barHeight + barPadding);
                //   })
                //   .attr('fill', function (d) { 
                //     return color(d.hours[11].minutes[0].avgAvailableBikes); 
                //   })
                //   .transition()
                //   .duration(1000)
                //   .attr('width', function (d) {
                //     return xScale(d.hours[11].minutes[0].avgAvailableBikes);
                //   });
              }

            });
          });
        }
      };
    }]);

})();
