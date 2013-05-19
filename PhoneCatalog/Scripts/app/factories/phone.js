CatalogApp.factory('Phone', function($resource) {
  return $resource('/api/phones/:id', { id: '@id' }, { update: { method: 'PUT' } } );
});
