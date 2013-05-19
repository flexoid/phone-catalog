window.CatalogApp = angular.module('CatalogApp', ['ngResource', 'ngCookies']);

CatalogApp.config(function($routeProvider) {
  $routeProvider.
    when('/', { redirectTo: '/phones' }).
    when('/phones', { controller: ListCtrl, templateUrl: 'Templates/list.html' }).
    when('/phones/add', { controller: AddCtrl, templateUrl: 'Templates/add.html' }).
    when('/phones/:id', { controller: ShowCtrl, templateUrl: 'Templates/show.html' }).
    when('/phones/:id/delete', { controller: DeleteCtrl, template: ' ' }).

    when('/login', { controller: LoginCtrl, templateUrl: 'Templates/login.html' }).

    otherwise({ redirectTo: '/' });
});

CatalogApp.run(function($rootScope, $location, User) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (!User.isAuthenticated() && next.templateUrl !== '/Templates/login.html')
    {
      $location.path('/login');
    }
  });
});
