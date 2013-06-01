var DeleteCtrl = function($scope, $location, $routeParams, Phone) {

  $scope.deletePhone = function(id) {
    var confirmed = confirm('Are you sure you want to delete?');
    if (confirmed)
    {
      Phone.get({id: id}, function(phone) {
        phone.$delete({id: phone.Id});
        for (i = 0; i < $scope.phones.length; i++) {
          if ($scope.phones[i].Id == phone.Id)
            $scope.phones.splice(i, 1);
        }
      });
    }
  };
};
