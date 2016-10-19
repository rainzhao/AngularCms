(function () {
  angular.module('mp').filter('img', function (CONF) {

    /**
     * @param src: img src
     * @param isLocal: 是否和 html 文件在同一服务器
     */
    return function (src, isLocal, defaultSrc) {
      src = src || defaultSrc;

      if (!src) {
        return
      }

      var isAbsolute = /^http:\/\//.test(src);
      if (isAbsolute) {
        return src;
      }

      var imgDomain = isLocal ? CONF.localImgDomain : CONF.qiniuDomain;

      return imgDomain + '/' + src;
    }
  });
})();