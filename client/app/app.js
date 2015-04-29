(function() {
  'use strict';

  angular
    .module('app', [
      'app.core',
      'app.home',
      'ui.router'
    ])
    
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/home/home.html',
          controller: 'Home as vm'
        });
      
      // // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');
    });

})();
