(function() {
  angular.module('mp').controller('OrgActivityReviewController', function(Base, API, $rootScope, $stateParams) {
    var vm = this;
    var oid = $rootScope.getUser().id;
    var aid = $stateParams.id;
    Base.get(API.getOneActivity,{aid: aid}).then(function (data) {
      vm.reviewData = data.data.payload;
      vm.numData = {
        checkInCount:angular.isNumber(vm.reviewData.signUpSummary.checkInCount)?vm.reviewData.signUpSummary.checkInCount: 0,
        signUpCount:angular.isNumber(vm.reviewData.signUpSummary.signUpCount)?vm.reviewData.signUpSummary.signUpCount: 0,
        arrivalRate: angular.isNumber(vm.reviewData.signUpSummary.arrivalRate)?vm.reviewData.signUpSummary.arrivalRate: 0,
        punctualRate: angular.isNumber(vm.reviewData.signUpSummary.punctualRate)?vm.reviewData.signUpSummary.punctualRate:0
      };
      vm.numData.arrivalRate = parseFloat(vm.numData.arrivalRate).toFixed(1);
      vm.numData.punctualRate = parseFloat(vm.numData.punctualRate).toFixed(1);
      console.log(vm.reviewData)
      if(vm.reviewData.reviews !== ""){
        vm.activeLookBack = vm.reviewData.reviews;
      }

      if(vm.reviewData.signInRecords.records.length == 0){
        TOASTR.warning('该活动尚未有人报名！');
      }
    });

    vm.activeReview = function () {
      Base.post(API.addActivityReview,{oid:oid,aid:aid},{reviews : vm.activeLookBack}).then(function(data){
        SWEETALERT.swal('提交成功','','success');
      });
    };
  })
})();
