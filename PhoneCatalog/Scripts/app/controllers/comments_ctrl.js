var CommentsCtrl = function($scope, $location, $routeParams, Phone, Comment) {
  $scope.addComment = function() {
    Comment.save({phoneId: $scope.phone.Id, author: $scope.author, text: $scope.text}, function(comment, getResponseHeaders) {
     $scope.phone.Comments.push(comment);
     $scope.resetComment();
   });
  };

  $scope.resetComment = function() {
    $scope.author = "";
    $scope.text = "";
  }
};
