var CompareCtrl = function($scope, $location, $routeParams, Phone, Comparer) {
  $scope.comparingItems = function() {
    return Comparer.itemsToCompare;
  };

  $scope.comparingItemsCount = function() {
    return Comparer.itemsCount();
  };
};
