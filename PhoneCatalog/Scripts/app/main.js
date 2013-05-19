require.config({
  baseUrl: 'Scripts/lib',
  paths: {
    jquery: 'jquery-1.9.1.min',
    angular: 'angular',
    app: '../app'
  },
  shims: {
    'angular' : {exports: 'angular'}
  },
  priority: ['angular']
});

require(['app/app'], function(CatalogApp) {
});
