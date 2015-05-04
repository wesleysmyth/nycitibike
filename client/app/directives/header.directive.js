(function() {
  'use strict';

  angular
    .module('customHeader', [])
    .directive('customHeader', customHeader);
   
    function customHeader () {
        
      return {
        restrict: 'EA',
        templateUrl: 'app/templates/header.html',
        replace: true
      };

    }

})();
