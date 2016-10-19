(function(){
  angular.module('mp').directive('mpValidator', function () {

    var _error = {
      required: '不能为空',
      pattern: '格式不正确',
      same: '两次输入不一致'
    };

    function _errorFilter($error, customMessage) {
      var errorMsgs = angular.extend(angular.copy(_error), customMessage);
      var msg;
      for (var key in $error) {
        msg = errorMsgs[key];
        if (msg) break;
      }
      return msg;
    }

    return {
      restrict: 'A',
      require: ['ngModel','^^form'],
      link: function (scope, ele, attr, ctrs) {

        var customErrorMsg = scope.$eval(attr.mpValidator) || {};

        var wrapper = attr.wrapper;

        var modelCtrl = ctrs[0];
        var formCtrl = ctrs[1];

        var wrapperEle = $(ele).parent();
        if (wrapper) {
          wrapperEle = $(ele).parents(wrapper);
        }

        var _showError = function () {
          if (formCtrl.$submitted && modelCtrl.$invalid) return true;
          if (modelCtrl.$invalid && modelCtrl.$dirty) return true;
          return false;
        };

        var _errorMsg = function () {
          return _errorFilter(modelCtrl.$error, customErrorMsg);
        };

        /* 是否该显示 error message */
        scope.$watch(function () {
          return _showError();
        }, function (error) {
          if (error) {
            $(wrapperEle).addClass('_error');
          } else {
            $(wrapperEle).removeClass('_error');
          }
        });

        /* error message 的更新 */
        scope.$watch(function () {
          return _errorMsg();
        }, function (msg) {
          if (!msg) {
            $(wrapperEle).removeAttr('data-error');
          }
          $(wrapperEle).attr('data-error', msg);
        });

      }
    };
  });
})();
