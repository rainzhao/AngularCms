(function() {
  angular.module('mp').factory('Base', function(CONF, API, $http, $q) {
    var factory = {};

    function _findUrl(url) {
      if (!url) {
        return null;
      }
      if (/^http?/.test(url)) {
        return url;
      }
      if (/^\//.test(url)) {
        return CONF.apiDomain + url;
      }
      return CONF.apiDomain + API[url];
    }

    //function _appendTransform(defaults, transform) {
    //  defaults = angular.isArray(defaults) ? defaults : [defaults];
    //  return defaults.concat(transform);
    //}

    factory.get = function(url, params, headers, cache) {
      url = _findUrl(url);
      if (!url) return;
      params = params || {};
      headers = headers || {};

      return $http({
        url: url,
        method: 'GET',
        cache: !!cache,
        params: params,
        headers: headers,
        withCredentials: true
      });
    };

    factory.post = function(url, params, data, headers) {
      url = _findUrl(url);
      if (!url) return;
      params = params || {};
      data = data || {};
      headers = headers || {};

      return $http({
        url: url,
        method: 'POST',
        params: params,
        data: data,
        headers: headers,
        withCredentials: true
      });
    };

    factory.upload = function(file) {
      if (!file) return;
      var formData = new FormData;
      formData.append('file', file);
      return $http({
        method: 'POST',
        url: CONF.apiDomain + API.fileUpload,
        data: formData,
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
    };

    return factory;
  });
})();