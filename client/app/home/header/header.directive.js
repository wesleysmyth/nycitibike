(function() {
  'use strict';

  angular
    .module('app.customHeader', [])
    .directive('customHeader', customHeader);

    /* @ngInject */      
    function customHeader () {
        
      return {
        restrict: 'EA',
        templateUrl: 'app/home/header/header.html',
        replace: true
      };

    }

})();
