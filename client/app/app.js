(function() {
  'use strict';

  angular
    .module('app', [
      'app.core',
      'app.directives',
      'app.main',
      'smart-table',
      'ui.router'
    ])
    
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/templates/home.html',
          controller: 'Main as vm'
        })
        .state('city', {
          url: '/city',
          templateUrl: 'app/templates/city.html',
          controller: 'Main as vm'
        })
        .state('borough', {
          url: '/{borough}',
          templateUrl: 'app/templates/borough.html',
          controller: 'Main as vm'
        })
        .state('postalCode', {
          url: '/postalCode/{postalCode}',
          templateUrl: 'app/templates/postalCode.html',
          controller: 'Main as vm'
        })
        .state('station', {
          url: '/station/{stationId}',
          templateUrl: 'app/templates/station.html',
          controller: 'Main as vm'
        })
      
      // // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode(true);
    });

})();
