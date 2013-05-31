CatalogApp.factory('Comment', function($resource) {
  return $resource('/api/phones/:phoneId/comments', {phoneId: '@phoneId'});
});
