var LoginCtrl = function($scope, $location, User, Auth) {
  $scope.sign_in = function() {
    Auth.setCredentials($scope.login, $scope.password);
    User.login($scope.login, $scope.password, function(result) {
      if (result)
      {
        $location.path('/');
      }
      else
      {
        Auth.clearCredentials();
      }
    });
  };
};
