(function() {
  'use strict';

  angular
    .module('customTable', [])
    .directive('customTable', customTable);
     
    function customTable () {
        
      return {
        restrict: 'EA',
        templateUrl: 'app/templates/table.html',
        replace: true
      };

    }

})();
