var EditCtrl = function($scope, $location, $routeParams, Phone) {
  $scope.phone = Phone.get({id: $routeParams.id});

  $scope.form_legend = 'Редактировать телефон';

  $scope.form_submit = function() {
    $scope.phone.$update(function(phone, putResponseHeaders) {
      $location.path('/phones/' + phone.Id);
    });
  };
};
