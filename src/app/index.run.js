TOASTR = null;
SWEETALERT = null;
(function() {
  'use strict';

  angular
    .module('mp')
    .run(runBlock);

  /** @ngInject */
  function runBlock(toastr, SweetAlert, $rootScope, $state, AuthService, CONF) {
    TOASTR = toastr;
    SWEETALERT = SweetAlert;

    $rootScope.getUser = function() {
      return AuthService.getUser();
    };

    var _childOf = function(parent, current) {
      return new RegExp('^' + parent + '\\.').test(current);
    };

    var _isfreePage = function(current) {
      if (!current) return true;
      return /^orgLogin$|^adminLogin/.test(current);
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var role = AuthService.getRole();

      if (role === 'admin') {
        if (toState.name === 'adminLogin') {
          if (!_isfreePage(fromState.name)) {
              event.preventDefault();
              return;
          }
          if (!fromState.name) {
            $state.go('admin.home');
            event.preventDefault();
            return;
          }
        }
        if (_childOf('org', toState.name)) {
          $state.go('orgLogin');
          event.preventDefault();
          return;
        }
      } else if (role === 'org') {
        if (toState.name === 'orgLogin') {
          if (!_isfreePage(fromState.name)) {
            event.preventDefault();
            return;
          }
          if (!fromState.name) {
            $state.go('org.home');
            event.preventDefault();
            return;
          }
        } else {
          if (toState.name !== 'org.home' && !$rootScope.getUser().$checkPass()) {
            TOASTR.warning('请等待审核通过');
            event.preventDefault();
            return;
          }
        }
        if (_childOf('admin', toState.name)) {
          $state.go('adminLogin');
          event.preventDefault();
          return;
        }
      } else {
        if (!_isfreePage(toState.name)) {
          if (_childOf('admin', toState.name)) {
            $state.go('adminLogin');
          } else if (_childOf('org', toState.name)) {
            $state.go('orgLogin');
          }
          event.preventDefault();
          return;
        }
      }

    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

    });

    $rootScope.logout = function() {

      SweetAlert.swal({
          title: "确定退出？",
          type: "info",
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'

      }, function(isConfirm){
        if (!isConfirm) return;

        var role = AuthService.getRole();
        var loginState = 'orgLogin';
        if (role === 'admin') {
          loginState = 'adminLogin';
        }
        AuthService.clearUser();
        $state.go(loginState);
      });
    };

    //$.ajaxSetup({
    //  beforeSend: function (xhr) {
    //    xhr.setRequestHeader(CONF.tokenKey, CONF.tokenValuePrefix + AuthService.getToken());
    //  }
    //})
  }

})();
