(function() {
  angular.module('mp').filter('regexp', function(REGEXP) {
    return function(key) {
      return REGEXP[key] || /.*/;
    }
  });
})();