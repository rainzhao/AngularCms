(function() {
  angular.module('mp').directive('mpNiceScroll', function() {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        var option = scope.$eval(attrs.mpNiceScroll) || {};

        angular.extend(option, {
          cursorcolor: '#2cb5ac',
          cursorborder: 'none',
          autohidemode: false
        });

        var niceScroll = $(ele).niceScroll(option);

        scope.$on('$destroy', function () {
          if (angular.isDefined(niceScroll.version)) {
            niceScroll.remove();
          }
        })
      }
    }
  });
})();