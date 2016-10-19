(function() {
  angular.module('mp').filter('orgStatusText', function() {
    return function(status) {
      var statusText = '';
      switch (status) {
        case 'AUDITING':
          statusText = '待审核';
          break;
        case 'AUDIT_FAILED':
          statusText = '不通过';
          break;
        case 'ACTIVE':
          statusText = '通过';
          break;
        case 'INACTIVE':
          statusText = '封禁';
          break;
        default:
          break;
      }
      return statusText;
    }
  });
})();