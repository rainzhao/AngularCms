(function() {
  angular.module('mp').controller('AdminActivityController', function(Base, $stateParams, API) {
    var vm = this;
    /*设为或取消热点活动*/
    vm.isMarkHot = function (aid,flag) {
      var val = 0;
      if(flag == true){
        val = 0;
      }
      if(flag == false){
        val = 1;
      }
      Base.post(API.postPlatformHot,{aid:aid,value:val}).then(function () {
        if(val<=0){
          TOASTR.success('成功取消');
        }else{
          TOASTR.success('成功设置');
        }
      },function () {
        TOASTR.error('设置失败');
      });

    };
  });
})();
