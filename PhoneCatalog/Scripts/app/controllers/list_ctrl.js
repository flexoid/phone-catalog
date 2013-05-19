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
