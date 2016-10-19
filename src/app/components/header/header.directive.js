(function() {
  angular.module('mp').directive('mpHeader', function(PATH, $state, AuthService) {
    return {
      restrict: 'E',
      templateUrl: PATH.componentsBase + 'header/header.html',
      scope: {

      },
      link:function(scope) {
        scope.breadcrumb = [];

        scope.getUser = function() {
          return AuthService.getUser();
        };

        var _unshiftBreadcrumb = function(state) {
          scope.breadcrumb.unshift(state);
          if (state.$parent) {
            if (state.$parent.state) {
              _unshiftBreadcrumb($state.get(state.$parent.state))
            } else {
              _unshiftBreadcrumb({$name: state.$parent.name});
            }
          }
        };

        scope.$watch(function() {
          return $state.current;
        }, function(currentState) {
          scope.breadcrumb = [];
          _unshiftBreadcrumb(currentState);
        })
      }
    }
  });
})();