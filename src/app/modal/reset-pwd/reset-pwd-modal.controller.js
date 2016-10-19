(function() {
  angular.module('mp').controller('ResetPwdModalController', function($scope, $uibModalInstance, $state, Base, API, AuthService, resolve) {
    $scope.closeModal = function() {
      $uibModalInstance.dismiss('close');
    };

    $scope.submit = function(formData, form) {
      if (form.$invalid) return;
      Base.post(API.orgResetPassword, null, formData).then(function(res) {
        console.log(res);
        TOASTR.success('密码重置成功');
        $scope.closeModal();
      }, function(err) {
        TOASTR.error(err.message || '密码重置失败');
      });
    };
  });
})();