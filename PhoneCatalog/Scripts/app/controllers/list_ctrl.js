var ListCtrl = function($scope, $location, $http, Phone, Comparer) {
  $scope.search = function() {
    $scope.is_busy = true;
    Phone.query({
        q: $scope.query,
        sort: $scope.sort_order,
        desc: $scope.is_desc,
        offset: $scope.offset,
        limit: $scope.limit
      }, function(data) {
        $scope.more = data.length === $scope.limit;
        $scope.phones = $scope.phones.concat(data);
        $scope.is_busy = false;
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

  $scope.canLoadMore = function() {
    return !$scope.is_busy && $scope.more;
  };

  $scope.reset = function() {
    $scope.limit = 10;
    $scope.offset = 0;
    $scope.phones = [];
    $scope.more = true;
    $scope.search();
  };

  $scope.compareCheckboxChanged = function(phone) {
    Comparer.updateComparingState(phone);
  };

  $scope.comparingItemsCount = function() {
    return Comparer.itemsCount();
  };

  $scope.comparingItems = function() {
    return Comparer.itemsToCompare;
  };

  $scope.clearComparingItems = function() {
    Comparer.reset();
  };

  $scope.isSelectedForComparing = function(phone) {
    return !!Comparer.itemsToCompare[phone];
  }

  $scope.sort_order = "Make";
  $scope.is_desc = false;
  $scope.query = "";
  $scope.is_busy = false;

  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  $scope.autocompleteValues = function(text) {
    return $http.get('/api/phones/type_ahead?text=' + text).then(function(response) {
      return response.data;
    });
  }

  $scope.reset();
};
