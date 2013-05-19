CatalogApp.directive('sorted', function() {
  return {
    scope: true,
    transclude: true,
    template: '<a ng-click="do_sort()" ng-transclude></a>' +
      '<span ng-show="do_show(true)"><i class="icon-arrow-down"></i></span>' +
      '<span ng-show="do_show(false)"><i class="icon-arrow-up"></i></span>',
    controller: function($scope, $element, $attrs) {
      $scope.sort = $attrs.sorted;

      $scope.do_sort = function() {
        $scope.sort_by($scope.sort);
      };

      $scope.do_show = function(asc) {
        return ($scope.is_desc != asc) && ($scope.sort_order == $scope.sort);
      };
    }
  };
});
