(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

    function Home ($state, $http, dataservice) {

      // set $scope to vm (view model)
      var vm = this;

      function init () {
        dataservice.getCitibikeData();
      }

      init();
    }

})();
