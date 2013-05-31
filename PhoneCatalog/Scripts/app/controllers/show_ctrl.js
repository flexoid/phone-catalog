var ShowCtrl = function($scope, $location, $routeParams, Phone, Comment) {
  $scope.phone = Phone.get({id: $routeParams.id});
};
