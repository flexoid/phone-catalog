var LogoutCtrl = function($scope, $location, User, Auth) {
  $scope.sign_out = function() {
    Auth.clearCredentials();
    User.logout();
  };
};
