(function() {
  angular.module('mp').filter('trust', function($sce) {
    return function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    }
  });
})();