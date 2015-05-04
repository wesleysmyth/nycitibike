(function() {
  'use strict';

  angular.module('core.d3', [])
    .factory('d3Service', ['$document', '$q', '$rootScope', '$location',
      function ($document, $q, $rootScope, $location) {
        var scriptTag = $document[0].createElement('script'); 
        var body = $document[0].getElementsByTagName('body')[0];
        var defer = $q.defer();
        var services = {};

        /** Create a script tag with d3 as the source and call our onScriptLoad
         *  callback when it has been loaded
         */
        scriptTag.async = true;
        scriptTag.onload = onScriptLoad;
        scriptTag.src = '../../../lib/d3/d3.min.js';
        scriptTag.onreadystatechange = function () {
          if (this.readyState === 'complete') {
            onScriptLoad();
          }
        };

        // append the script tag to the body
        body.appendChild(scriptTag);

        // add d3 and buildChart functions to services object
        services.d3 = d3
        services.buildChart = buildChart

        return services;

        //////////////////////////////////////////////////////////////

        // onScriptLoad - loads the client in the browser 
        function onScriptLoad () {
          $rootScope.$apply(function() { defer.resolve(window.d3); });
        }

        // d3 - returns promisified defer statement
        function d3 () {
          return defer.promise;
        }

        function buildChart (d3, attrs, vm, stations, $window, chartType) {
          var margin = parseInt(attrs.margin, 10) || 20;
          var barHeight = parseInt(attrs.barHeight, 10) || 20;
          var barPadding = parseInt(attrs.barPadding, 10) || 5;

          // add the d3 instance to d3Services to allow for access in all controllers / directives
          services.ddd = d3;

          // hide any existing charts
          vm.showChart = false;

          // set the absolute url to the current absolute url (used for rect-url paths)
          vm.absUrl = $location.absUrl();

          // Browser onresize event
          window.onresize = function() {
            vm.$apply();
          };

          // hard-code data
          vm.data = stations;

          // Watch for resize event
          vm.$watch(function() {
            return angular.element($window).innerWidth;
          }, function() {
            vm.render(vm.data);
          });

          /**
           * vm.render - renders the chart and tables
           * 
           * @param {object} data - station data
           * @return {object} schemas - schemas object contains all schema data
           */ 
          vm.render = function(data) {

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

              // create the axes for the chart
              var axes = svg.append('g')
		            .attr('clip-path', 'url(' + vm.absUrl + '#axes-clip)');

              // create the x axis labels based on height and width
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

              // create the y axis labels based on height and width
              axes.append('g')
                .attr('class', 'y axis')
                .call(yAxis)
                .append('text')
                  .attr('transform', 'rotate(-90)')
                  .attr('y', 6)
                  .attr('dy', '.71em')
                  .style('text-anchor', 'end')
                  .text('Citibikes');

              // create legend svg, append text and relevant data
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
                .text('Max');

              legend.append('rect')
                .attr('class', 'inner')
                .attr('width',  75)
                .attr('height', 20)
                .attr('x', 10)
                .attr('y', 40);

              legend.append('text')
                .attr('x', 115)
                .attr('y', 55)
                .text('Min');

              legend.append('path')
                .attr('class', 'median-line')
                .attr('d', 'M10,80L85,80');

              legend.append('text')
                .attr('x', 115)
                .attr('y', 85)
                .text('Average');
            }

            /**
             * drawPaths - draws the paths for the average, maximum and minimum bike data
             * 
             * @param {object} svg - svg object
             * @param {object} data - station data
             * @param {function} x - generate x axis data
             * @param {function} y - generate y axis data
             */
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
		            .attr('clip-path', 'url(' + vm.absUrl + '#rect-clip)');

              svg.append('path')
                .attr('class', 'area lower outer')
                .attr('d', lowerOuterArea)
		            .attr('clip-path', 'url(' + vm.absUrl + '#rect-clip)');

              svg.append('path')
                .attr('class', 'area upper inner')
                .attr('d', upperInnerArea)
		            .attr('clip-path', 'url(' + vm.absUrl + '#rect-clip)');

              svg.append('path')
                .attr('class', 'area lower inner')
                .attr('d', lowerInnerArea)
		            .attr('clip-path', 'url(' + vm.absUrl + '#rect-clip)');

              svg.append('path')
                .attr('class', 'median-line')
                .attr('d', medianLine)
                .attr('clip-path', 'url(' + vm.absUrl + '#rect-clip)');
    
	          }

            /**
             * startTransitions - draws the paths for the average, maximum and minimum bike data
             * 
             * @param {object} svg - svg object
             * @param {number} chartWidth - width of current chart
             * @param {number} chartHeight - height of current chart
             * @param {object} rectClip - data to transition
             * @param {function} x - generate x axis data
             */
            function startTransitions (svg, chartWidth, chartHeight, rectClip, x) {
              rectClip.transition()
                .duration(2200)
                .attr('width', chartWidth);

              // show the table associated with the chart
              vm.showChart = true;
            }

            /**
             * makeChart - builds the chart to display based on the input data
             * 
             * @param {object} data - station data
             */
            function makeChart (data) {
              var svgWidth  = window.innerWidth - 60,
                  svgHeight = 500,
                  margin = { top: 20, right: 60, bottom: 40, left: 60 },
                  chartWidth  = svgWidth  - margin.left - margin.right,
                  chartHeight = svgHeight - margin.top  - margin.bottom;

              // define scales for x and y axes
              var x = d3.time.scale().range([0, chartWidth])
                        .domain(d3.extent(data, function (d) {
                          return new Date(2015,0,1,parseInt(d.time.split(':')[0], 10), parseInt(d.time.split(':')[1],10)) })),
                  y = d3.scale.linear().range([chartHeight, 0])
                        .domain([d3.min(data, function (d) { return d.minBikes/1.2; }), d3.max(data, function (d) { return d.maxBikes*1.2; })]);

              // define tick sizes and orientation
              var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(d3.time.minutes, 30)
                            .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(0),
                  yAxis = d3.svg.axis().scale(y).orient('left')
                            .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

              // choose which type of chart directive to show
              var selectedChart = chartType + '-chart';

              // append the chart to the dom
              var svg = d3.select(selectedChart).append('svg')
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

              // add the axes and legend, draw the paths, and transition the data along the paths
              addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
              drawPaths(svg, data, x, y);
              startTransitions(svg, chartWidth, chartHeight, rectClip, x);
            }

            // create the chart based on the input data
            makeChart(vm.chartData);

          }
        }
      }
    ]);

})();
