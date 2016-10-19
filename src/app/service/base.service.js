(function() {
  angular.module('mp').service('BaseService', function($compile, $rootScope) {
    var self = this;

    var _loadingElem;

    this.funcEach = function() {
      if (arguments.length < 2) return;
      var argArr = Array.prototype.slice.call(arguments);
      var items = argArr[1];
      var func = argArr.shift();
      if (!angular.isArray(items) || !angular.isFunction(func)) return;

      angular.forEach(items, function(item) {
        argArr[0] = item;
        func.apply(item, argArr);
      });
    };

    this.showLoading = function() {
      _loadingElem = document.querySelector('#mp-loading');
      _loadingElem.style.display = "block";
    };

    this.removeLoading = function() {
      _loadingElem.style.display = "none";
    };
  })
})();