(function() {
  angular.module('mp').directive('mpOrgVolunteerDataBar', function(PATH) {
    return {
      restirct: 'E',
      templateUrl: PATH.componentsBase + 'org-volunteer-data-bar/org-volunteer-data-bar.html',
      scope: {

      },
      link: function(scope, ele, attr) {

      }
    }
  });
})();