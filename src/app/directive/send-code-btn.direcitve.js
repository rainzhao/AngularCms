(function() {
  angular.module('mp').directive('mpSendCodeBtn', function(REGEXP, $timeout, Base, API, $interval) {
    return {
      restrict: 'A',
      scope: {
        mpSendCodeBtn: '='
      },
      link: function(scope, ele, attr) {
        var btn = ele[0];
        var waitSeconds = 45;

        var originText = btn.textContent || '发送验证码';
        btn.textContent = originText;

        var isDisable = function() {
          if (!scope.mpSendCodeBtn) return true;
          if (!REGEXP.cellphone.test(scope.mpSendCodeBtn.cellphone)) return true;
          if (scope.sending) return true;
          if (scope.waiting) return true;
          return false;
        };
        btn.onclick = function() {
          $timeout(function() {
            if (scope.sending || scope.waiting) return;
            scope.sending = true;
            Base.post(API.sendMessageCode, null, scope.mpSendCodeBtn).then(function() {
              TOASTR.success('验证码已发送，请注意查收');
              scope.waiting = true;
              scope.sending = false;
            }, function() {
              scope.sending = false;
              TOASTR.error('验证码发送失败，请重试');
            });
          });
        };

        scope.$watch(function() {
          return isDisable();
        }, function(disabled) {
          if (disabled) {
            $timeout(function() {
              btn.setAttribute('disabled', 'disabled');
            });
          } else {
            $timeout(function() {
              btn.removeAttribute('disabled');
            });
          }
        });

        scope.$watch(function() {
          return scope.waiting;
        }, function(waiting) {
          if (waiting) {
            $timeout(function() {
              var leftSeconds = waitSeconds;
              btn.textContent = leftSeconds + '秒后重发';
              if (scope.interval) $interval.cancel(scope.interval);
              scope.interval = $interval(function() {
                if (leftSeconds > 0) {
                  leftSeconds--;
                }
                if (leftSeconds > 0) {
                  btn.textContent = leftSeconds + '秒后重发';
                } else {
                  btn.textContent = originText;
                  $interval.cancel(scope.interval);
                  scope.waiting = false;
                }
              }, 1000)
            });
          }
        });

        scope.$on('$destroy', function() {
          if (scope.interval) $interval.cancel(scope.interval);
        });
      }
    }
  });
})();