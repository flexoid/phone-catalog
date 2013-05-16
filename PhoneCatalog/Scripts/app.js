var CatalogApp = angular.module("CatalogApp", ["ngResource"]).
  config(function($routeProvider) {
    $routeProvider.
      when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
      otherwise({ redirectTo: '/' });
  });

CatalogApp.factory('Phone', function($resource) {
  return $resource('/api/phones/:id', { id: '@id' }, { update: { method: 'PUT' } } );
});

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

var ListCtrl = function($scope, $location, Phone) {
  $scope.search = function() {
    Phone.query({
        q: $scope.query,
        sort: $scope.sort_order,
        desc: $scope.is_desc,
        offset: $scope.offset,
        limit: $scope.limit
      }, function(data) {
        $scope.more = data.length === $scope.limit;
        $scope.phones = $scope.phones.concat(data);
    });
  };

  $scope.sort_by = function(field) {
    if ($scope.sort_order === field) {
      $scope.is_desc = !$scope.is_desc;
    }
    else
    {
      $scope.sort_order = field;
      $scope.is_desc = false;
    }
    $scope.reset();
  };

  $scope.show_more = function() {
    $scope.offset += $scope.limit;
    $scope.search();
  };

  $scope.has_more = function() {
    return $scope.more;
  };

  $scope.reset = function() {
    $scope.limit = 4;
    $scope.offset = 0;
    $scope.phones = [];
    $scope.more = true;
    $scope.search();
  };

  $scope.sort_order = "Make";
  $scope.is_desc = false;
  $scope.query = "";

  $scope.reset();
};
