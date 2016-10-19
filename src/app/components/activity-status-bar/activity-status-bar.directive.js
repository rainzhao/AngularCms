(function() {
  angular.module('mp').directive('mpActivityStatusBar', function(PATH, ACTIVITY_STATUS) {
    return {
      restrict: 'E',
      templateUrl: PATH.componentsBase + 'activity-status-bar/activity-status-bar.html',
      scope: {
        status: '='
      },
      link: function(scope) {
        console.log(scope.status);
        switch (scope.status) {
          case ACTIVITY_STATUS.auditing:
            scope.colorClass = 'auditing';
            scope.step = 1;
            break;
          case ACTIVITY_STATUS.active:
            scope.colorClass = 'active';
            scope.step = 2;
            break;
          case ACTIVITY_STATUS.inActive:
            scope.colorClass = 'onGoing';
            scope.step = 3;
            break;
          case ACTIVITY_STATUS.onGoing:
            scope.colorClass = 'onGoing';
            scope.step = 3;
            break;
          case ACTIVITY_STATUS.finished:
            scope.colorClass = 'finished';
            scope.step = 4;
            break;
          default:
            scope.step = 0;
            break;
        }
      }
    }
  });
})();