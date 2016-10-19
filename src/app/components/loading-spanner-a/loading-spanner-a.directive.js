(function() {
  angular.module('mp').directive('mpLoadingSpannerA', function(PATH) {
    return {
      restrict: 'E',
      templateUrl: PATH.componentsBase + 'loading-spanner-a/loading-spanner-a.html',
      replace: true,
      link: function(scope, ele) {

      }
    }
  });
})();