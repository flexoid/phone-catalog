CatalogApp.factory('User', function ($http, $cookieStore) {
  var _this = this;
  this.authenticated = false;

  return {
    isAuthenticated: function() {
      return _this.authenticated;
    },
    tryAuthWithOldData: function(callback) {
      var authdata = $cookieStore.get('authdata');
      if (authdata) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        this.login('', '', function(data) {
          if (data)
            callback(true);
          else
            callback(false);
        });
      }
      else {
        callback(false);
      }
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
      _this.authenticated = false;
    }
  };
});
