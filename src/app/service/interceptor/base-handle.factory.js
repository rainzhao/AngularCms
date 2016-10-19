(function () {

  angular.module('mp').factory('BaseHandle', function (CONF, $q, AuthService, $injector, API, cfpLoadingBar) {
    var apiReg = new RegExp(CONF.apiDomain);

    var _getPathVariableKeys = function (url) {
      var keys = url.match(/{.+?}/g);
      return keys.map(function (key) {
        return key.replace('{', '').replace('}', '');
      });
    };

    var _fillPathVariables = function (url, params) {
      var keys = _getPathVariableKeys(url);
      angular.forEach(keys, function (key) {
        url = url.replace('{' + key + '}', params[key]);
        delete params[key];
      });

      return url;
    };

    return {
      'request': function(config) {
        cfpLoadingBar.start();
        config.params = angular.copy(config.params);
        if (apiReg.test(config.url)) {
          if (/{.+}/.test(config.url)) {
            config.url = _fillPathVariables(config.url, config.params);    //填充 api 的 path variables
          }
          if (!/login/.test(config.url)) {
            config.headers[CONF.tokenKey] = CONF.tokenValuePrefix  + AuthService.getToken();  //带上token
          }
        }
        return config;
      },

      'requestError': function(rejection) {
        cfpLoadingBar.complete();
        return $q.reject(rejection);
      },

      'response': function(res) {
        cfpLoadingBar.complete();
        if (apiReg.test(res.config.url)) {
          var token = res.headers()[CONF.tokenKey.toLowerCase()];
          if (token) AuthService.setToken(token);      //存储token

          if (res.data.error) return $q.reject(res.data.error);
          //return res.data.payload;
        }

        return res;
      },

      'responseError': function(rejection) {
        cfpLoadingBar.complete();
        if (rejection.status === 401) {
          var dfd = $q.defer();

          var Base = $injector.get('Base');
          var AuthService = $injector.get('AuthService');
          var $state = $injector.get('$state');
          var $http = $injector.get('$http');
          //console.log(AuthService.getUser());
          Base.post(API.orgLogin, null, AuthService.getLoginForm()).then(function(res) {
            $http(rejection.config).then(function(res) {
              if (res.data.error) {
                dfd.reject(res.data.error);
              } else {
                dfd.resolve(res);
              }
            }, function(err) {

            });
          }, function(err) {
            TOASTR.error('用户信息有变更，请重新登陆');
            AuthService.clearUser();
            dfd.reject('用户信息有变更，请重新登陆');
            $state.reload();
          });

          return dfd.promise;
        }
        return $q.reject(rejection);
      }
    };
  });
})();
