(function() {
  'use strict';

  angular
    .module('core.httpRetry')
    .factory('httpRetry', httpRetry);
 
  function httpRetry ($q, $injector) {
    return {
      'responseError': function(response) {
        if (response.status === 0) {
          // should retry
          var $http = $injector.get('$http');
          return $http(response.config);
        }
        // give up
        return $q.reject(response);
      }
    };
  }

})(); 
