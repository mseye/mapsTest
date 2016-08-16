angular.module('starter')

// Configure the state provider (navigation between pages)
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('map', {
            url: '/',
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl'
        });

    $urlRouterProvider.otherwise("/");

});