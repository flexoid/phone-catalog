window.CatalogApp = angular.module('CatalogApp', ['ngResource', 'ngCookies', 'ui.bootstrap', 'infinite-scroll']);

CatalogApp.config(function($routeProvider) {
  $routeProvider.
    when('/', { redirectTo: '/phones' }).
    when('/phones', { controller: ListCtrl, templateUrl: 'Templates/list.html' }).
    when('/phones/add', { controller: AddCtrl, templateUrl: 'Templates/add.html' }).
    when('/phones/compare', { controller: CompareCtrl, templateUrl: 'Templates/compare.html' }).
    when('/phones/:id', { controller: ShowCtrl, templateUrl: 'Templates/show.html' }).
    when('/phones/:id/delete', { controller: DeleteCtrl, template: ' ' }).

    when('/login', { controller: LoginCtrl, templateUrl: 'Templates/login.html' }).

    otherwise({ redirectTo: '/' });
}).config(function($httpProvider) {
  $httpProvider.responseInterceptors.push('AuthHttpInterceptor');
});

// CatalogApp.run(function($rootScope, $location, User) {
//   $rootScope.$on('$routeChangeStart', function(event, next, current) {
//     if (!User.isAuthenticated() && next.templateUrl !== '/Templates/login.html')
//     {
//       User.tryAuthWithOldData(function(successful) {
//         if (!successful)w
//           $location.path('/login');
//       });
//     }
//   });
// });
