CatalogApp.factory('User', function() {
  var _this = this;
  this.authenticated = false;

  return {
    isAuthenticated: function() {
      return _this.authenticated;
    },
    login: function(user, password, callback) {
      var result = null;
      if (user === password)
      {
        _this.authenticated = true;
        _this.result = true;
      }
      callback(result);
    },
    logout: function(callback) {
    }
  };
});
