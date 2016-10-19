(function() {
  angular.module('mp').directive('mpSameAs', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, ele, attr, ngModel) {

        var isSame = function(value) {
          return value === scope.$eval(attr.mpSameAs);
        };

        ngModel.$validators['same'] = function(value) {
          return isSame(value);
        };

        scope.$watch(function() {
          return scope.$eval(attr.mpSameAs);
        }, function() {
          ngModel.$setValidity('same', isSame(ngModel.$modelValue));
        });
      }
    }
  });
})();