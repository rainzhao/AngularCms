(function () {
  angular
    .module('mp')
    .filter('activityOperateFilter',activityOperateFilter);

    function activityOperateFilter (activityService) {
      return function (data) {
        return activityService.enhances(data);
      }
    }
})();
