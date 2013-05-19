var AddCtrl = function($scope, $location, $routeParams, Phone) {
  $scope.add = function() {
    $scope.newPhone = new Phone({make: $scope.make, model: $scope.model});
    $scope.newPhone.$save();
    $location.path('/phones');
  };
};
