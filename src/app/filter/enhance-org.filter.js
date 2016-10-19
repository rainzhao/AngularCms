(function() {
  angular.module('mp').filter('enhanceOrg', function(OrgService) {
    return function(data) {
      OrgService.enhance(data);
      return data
    };
  });
})();