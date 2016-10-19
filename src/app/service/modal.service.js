(function() {
  angular.module('mp').service('modalService', function(PATH, $uibModal, $q) {
    this.openRegister = function() {
      var dfd = $q.defer();
      var modal = $uibModal.open({
        templateUrl: PATH.modalBase + 'register/register-modal.html',
        size: 'lg',
        windowClass: 'mp-register-modal',
        backdrop: 'static',
        controller: 'registerModalController',
        resolve: {
          resolve: function() {
            return dfd.resolve;
          }
        }
      });
      return dfd.promise;
    };

    this.openResetPwd = function() {
      var dfd = $q.defer();
      var modal = $uibModal.open({
        templateUrl: PATH.modalBase + 'reset-pwd/reset-pwd-modal.html',
        size: 'lg',
        windowClass: 'mp-reset-pwd-modal',
        backdrop: 'static',
        controller: 'ResetPwdModalController',
        resolve: {
          resolve: function() {
            return dfd.resolve;
          }
        }
      });
      return dfd.promise;
    };

  });
})();