(function() {
  angular.module('mp').controller('OrgActivityController', function(Base, API, $rootScope, $scope, EVENT) {
    var vm = this;
    //取消活动
    var oid = $rootScope.getUser().id;

    vm.cancelActivity = function (aid) {
      var reason = {
        res: '',
        reasonDescribe: ''
      };

      SWEETALERT.swal({
        html: true,
        title: '取消活动原因填写',
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        animation: "slide-from-top",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        //closeOnCancel: false,
        type: 'warning',
        text: '<select id="cancelActivitySelectOrg">' +
        '<option value="不可抗力">不可抗力</option>' +
        '<option value="活动主办方资源有变">活动主办方资源有变</option>' +
        '<option value="其他">其他</option>' +
        '</select>'+
        '<textarea id="cancelActivityDescribeOrg" rows="5" cols="30"></textarea>'
      },function (){

        reason.res = angular.element('#cancelActivitySelectOrg').val();
        reason.reasonDescribe = angular.element('#cancelActivityDescribeOrg').val();
        Base.post(API.cancelAuditActivity,{oid: oid,aid:aid},{reason:reason.res,reasonRemark:reason.reasonDescribe}).then(function () {
          $scope.$emit(EVENT.refreshPagination);
          SWEETALERT.swal('取消活动请求成功,平台会尽快审核','','success');
        },function (err) {
          SWEETALERT.swal('取消活动失败',err.message,'error');
        });
      });


    };


    //删除活动
    vm.deleteActivity = function (aid){
      SWEETALERT.swal({
        title: '确定删除?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#dd6b55",
        confirmButtonText: '确定删除',
        cancelButtonText: '再想想',
        closeOnConfirm: false,
        closeOnCancel: false
      },function (isConfirm) {
        if(isConfirm) {
          swal("删除请求已提交","你已成功提交删除请求，平台会尽快处理！","success");
        }else{
          swal("取消","活动未被删除！","error");
        }
        Base.post(API.deleteActivity,{oid:oid,aid:aid}).then(function () {
          $scope.$broadcast(EVENT.refreshPagination);
        })

      })

    };

  })
})();
