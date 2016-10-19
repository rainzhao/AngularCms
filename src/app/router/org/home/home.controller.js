(function() {
  angular.module('mp').controller('OrgHomeController', function(Base, CONF, API, $http, $scope, $timeout, AuthService, $rootScope, ACTIVITY_STATUS) {
    var vm = this;
    vm.modifyProfileSuccess = function(data) {
      AuthService.setUserStatus('AUDITING');
      TOASTR.success('提交成功，请耐心等待平台审核');
    };

    if ($rootScope.getUser().$checkPass()) {
      Base.get(API.getActivities, {status: ACTIVITY_STATUS.auditing}).then(function(res) {
        vm.activities2bCheck = res.data.payload.results;
      });

      Base.get(API.getActivities, {orgIndex: 1}).then(function(res) {
        vm.activities = res.data.payload.results;
      });

      Base.get(API.getFaq, {oid: $rootScope.getUser().id}).then(function(res) {
        vm.faqs = res.data.payload;
      });



      vm.chart = {};
      //vm.chart.labels = ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"];
      vm.chart.series = ['活动数', '小时数', '志愿者数'];
      vm.chart.colors = ['#63CCC5', '#AFC583', '#E17176'];
      //vm.chart.data = [
      //  [65, 59, 80, 81, 56, 55, 40, 48, 40, 19, 86, 27],
      //  [28, 48, 40, 19, 86, 27, 90, 56, 55, 40, 48, 40],
      //  [20, 72, 37, 16, 56, 34, 85, 48, 40, 19, 86, 27]
      //];
      vm.chart.onClick = function (points, evt) {
        console.log(points, evt);
      };

      Base.get(API.getOrgStatistics, {oid: $rootScope.getUser().id}).then(function(res) {
        console.log(res.data.payload);
        var data = res.data.payload;
        vm.chart.labels = data.labels;
        vm.chart.data = data.data;
        vm.chart.total = data.total;
      });

    }


  })
})();
