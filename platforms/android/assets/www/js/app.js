angular.module('starter', ['ionic','starter.controllers'])
  
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
        })

    $urlRouterProvider.otherwise('/map');
});

