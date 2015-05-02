(function() {
  'use strict';

  angular
    .module('modal', [])
    .directive('modal', modal);

    /* @ngInject */      
    function modal() {
        
      return {
        restrict: 'EA',          
        templateUrl: 'app/templates/modal.html',
        replace: true
      };


    }

})();
