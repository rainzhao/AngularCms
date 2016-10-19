(function () {
  angular
    .module('mp')
    .controller('AdminActivityDetailController',AdminActivityDetailController);

    function AdminActivityDetailController (Base, API, $stateParams) {
      var vm = this;
      vm.checkBtnStatus = false;
      Base.get(API.getOneActivity,{aid: $stateParams.id}).then(function (data){
        vm.data = data.data.payload;
        /*当状态为审核中时再显示审核按钮*/
        if(vm.data.status == 'AUDITING'){
          vm.checkBtnStatus = true;
        }else{
          vm.checkBtnStatus = false;
        }
        $('.activityOneMesPlatDetail').html(data.details);
      },function (err){
        SWEETALERT.swal('查看信息失败',err.message,'error');
      });

      vm.checkButton = function(results) {
        if(results == 'pass'){
          Base.post(API.auditPlatActivity,{aid:$stateParams.id},{value:'SUCCESSFUL'}).then(function(){
            SWEETALERT.swal('审核成功','','success');
          },function(err){
            SWEETALERT.swal('审核失败',err.message,'error');
          });
        }
        if(results == 'reject'){
          SWEETALERT.swal({
              title: '审核不通过原因，必填！！！',
              type: 'input',
              showCancelButton: true,
              closeOnConfirm: false,
              animation : 'slide-from-top',
              inputPlaceholder: '请输入原因...',
              showLoaderOnConfirm: true
            },
            function (inputVal){
              if (inputVal === false) return false;
              if (inputVal === ""){
                SWEETALERT.swal.showInputError("你需要输入原因！！");
                return false;
              }
              Base.post(API.auditPlatActivity,{aid:$stateParams.id},{value:'FAILED',message:inputVal}).then(function(){
                SWEETALERT.swal('成功','','success');
              },function (err) {
                SWEETALERT.swal('失败',err.message,'success');
              });
            });

        }
      }

      vm.getSignUpCount = function(a, b) {
        return a <= 0 ? '不限制' : b;
      };

      vm.getSignUpCost = function(a, b) {
        return a <= 0 ? '免费' : b;
      };


    }
})();
