CatalogApp.factory('Comparer', function() {
  var _this = this;
  this.itemsToCompare = {};

  return {
    itemsToCompare: {},

    updateComparingState: function(phone) {
      if (this.itemsToCompare[phone.Id]) {
        delete this.itemsToCompare[phone.Id];
      }
      else {
        this.itemsToCompare[phone.Id] = phone;
      }
    },

    itemsCount: function() {
      return Object.getOwnPropertyNames(this.itemsToCompare).length;
    },

    reset: function() {
      this.itemsToCompare = {};
    }
  };
});
