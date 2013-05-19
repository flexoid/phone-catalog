var LoginCtrl = function($scope, $location, User) {
  $scope.sign_in = function() {
    User.login($scope.login, $scope.password, function(result) {
      $location.path('/');
    });
  };
};
