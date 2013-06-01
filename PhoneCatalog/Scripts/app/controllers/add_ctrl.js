var AddCtrl = function($scope, $location, $routeParams, Phone) {
  $scope.phone = new Phone();

  $scope.form_legend = 'Добавить телефон';

  $scope.form_submit = function() {
    $scope.phone.$save(function(phone, putResponseHeaders) {
      $location.path('/phones/' + phone.Id);
    });
  };
};
