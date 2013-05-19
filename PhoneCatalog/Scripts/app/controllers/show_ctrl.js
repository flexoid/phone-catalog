var ShowCtrl = function($scope, $location, $routeParams, Phone) {
  $scope.phone = Phone.get({id: $routeParams.id});
};
