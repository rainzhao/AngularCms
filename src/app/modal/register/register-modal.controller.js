(function() {
  angular.module('mp').controller('registerModalController', function($scope, $uibModalInstance, $state, Base, API, AuthService, resolve) {
    $scope.closeModal = function() {
      $uibModalInstance.dismiss('close');
    };

    $scope.success = function(data) {
      TOASTR.success('注册成功，请耐心等待平台审核');
      $scope.closeModal();
      resolve(data);
    }
  });
})();