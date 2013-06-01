var LoginCtrl = function($scope, $location, User, Auth) {
  $scope.errors = [];

  $scope.sign_in = function() {
    Auth.setCredentials($scope.login, $scope.password);
    User.login($scope.login, $scope.password, function(result) {
      if (result)
      {
        $location.path('/');
        $scope.errors = [];
      }
      else
      {
        Auth.clearCredentials();
        $scope.errors.push("Invalid login or password");
      }
    });
  };
};
