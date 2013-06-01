window.CatalogApp = angular.module('CatalogApp', ['ngResource', 'ngCookies', 'ui.bootstrap', 'infinite-scroll', 'LocalStorageModule']);

CatalogApp.config(function($routeProvider) {
  $routeProvider.
    when('/', { redirectTo: '/phones' }).
    when('/phones', { controller: ListCtrl, templateUrl: 'Templates/list.html' }).
    when('/phones/add', { controller: AddCtrl, templateUrl: 'Templates/add.html' }).
    when('/phones/compare', { controller: CompareCtrl, templateUrl: 'Templates/compare.html' }).
    when('/phones/:id', { controller: ShowCtrl, templateUrl: 'Templates/show.html' }).
    when('/phones/:id/edit', { controller: EditCtrl, templateUrl: 'Templates/edit.html' }).
    when('/phones/:id/delete', { controller: DeleteCtrl, template: ' ' }).

    when('/login', { controller: LoginCtrl, templateUrl: 'Templates/login.html' }).

    otherwise({ redirectTo: '/' });
}).config(function($httpProvider) {
  $httpProvider.responseInterceptors.push('AuthHttpInterceptor');
});

CatalogApp.run(function($rootScope, $location, User, Comparer, localStorageService) {
  // $rootScope.$on('$routeChangeStart', function(event, next, current) {
  //   if (!User.isAuthenticated() && next.templateUrl !== '/Templates/login.html')
  //   {
  //     User.tryAuthWithOldData(function(successful) {
  //       if (!successful)
  //         $location.path('/login');
  //     });
  //   }
  // });
  User.tryAuthWithOldData(function(successful) {});

  $rootScope.current_user = function() {
    return User;
  };

  $rootScope.saveSelectedToLocalStorage = function() {
    localStorageService.add('selectedPhones', JSON.stringify(Comparer.itemsToCompare));
  };

  $rootScope.restoreSelectedFromLocalStorage = function() {
    Comparer.itemsToCompare = JSON.parse(localStorageService.get('selectedPhones')) || {};
  };

  $rootScope.clearSelectedInLocalStorage = function() {
    localStorageService.remove('selectedPhones');
  };

  $rootScope.restoreSelectedFromLocalStorage();
});
