(function() {
  'use strict';

  angular
    .module('modal', [])
    .directive('modal', modal);
     
    function modal() {
        
      return {
        restrict: 'EA',          
        templateUrl: 'app/templates/modal.html',
        replace: true
      };


    }

})();
