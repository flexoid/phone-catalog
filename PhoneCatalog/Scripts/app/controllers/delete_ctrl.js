var DeleteCtrl = function($scope, $location, $routeParams, Phone) {
  Phone.get({id: $routeParams.id}, function(phone) {
    phone.$delete({id: phone.Id});
    $location.path('/phones');
  });
};
