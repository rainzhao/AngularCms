(function() {
  angular.module('mp').controller('LoginController', function($state, API, Base, AuthService, $state, CONF, $uibModal, PATH, modalService, BaseService) {
    var vm = this;

    vm.role = $state.current.$role || 'org';

    var loginUrl;
    var redirectState;

    var orgInit = function() {
      vm.title = '组织机构登陆';
      loginUrl = API.orgLogin;
      redirectState = 'org.home';
    };

    var adminInit = function() {
      vm.title = '平台管理员登陆';
      loginUrl = API.adminLogin;
      redirectState = 'admin.home';
    };

    switch (vm.role) {
      case 'org':
        orgInit();
        break;
      case 'admin':
        adminInit();
        break;
      default:
        orgInit();
        break
    }

    vm.register = function() {
      modalService.openRegister().then(function(data) {
        vm.formData.username = data.adminUsername;
        vm.formData.password = data.adminPassword;
        vm.submit(vm.formData);
      });
    };

    vm.forgotPwd = function() {
      modalService.openResetPwd();
    };

    vm.submit = function(formData) {
      if (!formData.username || !formData.password) {
        return;
      }
      //console.log(md5(md5(formData.password, CONF.salt)));
      Base.post(loginUrl, null, formData).then(function(res) {
        AuthService.setLoginForm(formData);
        AuthService.setUser(res.data.payload, vm.rememberPassword);
        $state.go(redirectState);
      }, function(err) {
        TOASTR.error(err.message);
      })
    };
  });
})();