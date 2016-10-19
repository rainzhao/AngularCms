(function () {
  angular.module('mp').service('AuthService', function ($localStorage, $sessionStorage, $rootScope) {
    var tokenKey = 'token';
    var userKey = 'user';
    var loginFormKey = 'loginForm';

    var self = this;

    this.setToken = function(token) {
      $localStorage[tokenKey] = token;
    };

    this.getToken = function() {
      return $localStorage[tokenKey];
    };

    this.clearToken = function() {
      delete $localStorage[tokenKey];
    };

    this.enhanceUser = function(user) {
      if (!user) {
        return;
      }
      //'Organization', 'Platform'
      if (user.role === 'Platform') {
        user.$role = 'admin';
      } else {
        user.$role = 'org';
      }
      user.$isOrg = function() {
        return user.$role === 'org';
      };
      user.$isAdmin = function() {
        return user.$role === 'admin';
      };
      user.$checking = function() {
        return user.status === 'AUDITING'
      };
      user.$checkFailed = function() {
        return user.status === 'AUDIT_FAILED'
      };
      user.$checkPass = function() {
        return user.status === 'ACTIVE'
      };
      user.$forbidden = function() {
        return user.status === 'INACTIVE'
      };
      return user;
    };

    this.setUser = function(user, remember) {
      if (remember) {
        $localStorage[userKey] = user;
      } else {
        $sessionStorage[userKey] = user;
      }
    };

    this.setUserStatus = function(status) {
      if (this.getUser()) {
        this.getUser().status = status;
      }
    };

    this.setLoginForm = function(from) {
      $localStorage[loginFormKey] = from;
    };

    this.getLoginForm = function() {
      return $localStorage[loginFormKey];
    };

    this.getUser = function() {
      return self.enhanceUser($sessionStorage[userKey] || $localStorage[userKey]);
    };

    this.getRole = function() {
      return self.getUser() && self.getUser().$role || undefined;
    };

    this.clearUser = function() {
      delete $sessionStorage[userKey];
      delete $localStorage[userKey];
    };
  });
})();