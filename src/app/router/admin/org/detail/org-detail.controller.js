(function() {
  angular.module('mp').controller('AdminOrgDetailController', function($state, $stateParams, Base, API) {
    var vm = this;

    vm.$isCheckPage = function() {
      return $state.current.name === 'admin.org-check';
    };

    var oid = $stateParams.id;

    Base.get(API.getOrg, {oid: oid}).then(function(res) {
      vm.org = res.data.payload;
    });

    if (vm.$isCheckPage()) {
      vm.checkFormData = {
        value: 'SUCCESSFUL'
      };
      vm.checkValue = 'SUCCESSFUL';
      vm.doCheck = function(formData) {
        Base.post(API.checkOrg, {oid: oid}, formData).then(function() {
          $state.go('admin.org');
          TOASTR.success('操作成功');
        });
      };
    }


  });
})();