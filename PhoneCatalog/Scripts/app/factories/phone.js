CatalogApp.factory('Phone', function($resource) {
  var Phone = $resource('/api/phones/:id', { id: '@id' }, { update: { method: 'PUT' } } );
  Phone.prototype.summary = function() {
    return this.OS + ', экран\u00A0' + this.ScreenSize + '\u00A0(' + this.Resolution +
      '), процессор\u00A0' + this.Processor + ', камера\u00A0' + this.CameraPixelCount +
      ', аккумулятор\u00A0' + this.BatteryCapacity;
  };
  return Phone;
});
