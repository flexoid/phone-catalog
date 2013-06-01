CatalogApp.factory('AuthHttpInterceptor', function ($q, $window, $rootScope, $location) {
  return function (promise) {
    // $rootScope.polling = true;
    return promise.then(function (response) {
      // $rootScope.polling = false;
      return response;
    }, function (response) {
      // $rootScope.polling = false;
      // $rootScope.network_error = true;
      if (response.status == 401) {
        $location.path('/login');
      }
      return $q.reject(response);
    });
  };
});
