(function() {
  angular.module('mp').service('OrgService', function(BaseService) {
    var self = this;

    var _enhance = function(org) {
      if (!org) return;
      org.$checking = function() {
        return org.status === 'AUDITING'
      };
      org.$checkFailed = function() {
        return org.status === 'AUDIT_FAILED'
      };
      org.$checkPass = function() {
        return org.status === 'ACTIVE'
      };
      org.$forbidden = function() {
        return org.status === 'INACTIVE'
      };
      return org;
    };

    this.enhance = function(data) {
      if (angular.isArray(data)) {
        BaseService.funcEach(_enhance, data);
      } else {
        _enhance(data);
      }
      return data;
    }
  })
})();