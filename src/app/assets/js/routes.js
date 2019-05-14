angular.module('blockrApp').config(function ($routeProvider) {
  'ngInject';

  $routeProvider.when('/', {
    templateUrl: 'views/home/index.html',
    controller: 'HomeController',
    controllerAs: 'HomeCtrl'
  });

  $routeProvider.when('/project/:name', {
    templateUrl: 'views/project/index.html',
    controller: 'ProjectController',
    controllerAs: 'ProjectCtrl'
  });

  $routeProvider.otherwise({ redirectTo: '/' });
});
