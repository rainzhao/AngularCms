(function() {
  'use strict';

  angular
    .module('mp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, CONF, API, $localStorageProvider, $httpProvider, $sessionStorageProvider, simditorConfig, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $httpProvider.interceptors.push('BaseHandle');
    $localStorageProvider.setKeyPrefix('lvhuochaicms' + CONF.version);
    $sessionStorageProvider.setKeyPrefix('lvhuochaicms' + CONF.version);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventOpenDuplicates = true;
    toastrConfig.progressBar = true;


    simditorConfig.placeholder = '请在此处编辑内容...';
    //simditorConfig.upload.url = CONF.apiDomain + API.fileUploadSimditor;
    simditorConfig.upload.url = 'http://demo.0lz.net:8080/api/upload/img';
    simditorConfig.upload.fileKey = 'file';

    cfpLoadingBarProvider.includeSpinner = false;
  }

})();
