CatalogApp.factory('User', function($http) {
  var _this = this;
  this.authenticated = false;

  return {
    isAuthenticated: function() {
      return _this.authenticated;
    },
    login: function(user, password, callback) {
      $http.get('/api/users/validate_auth').success(function(response) {
        _this.authenticated = true;
        callback(response);
      }).error(function() {
        callback(null);
      });
    },
    logout: function(callback) {
    }
  };
});
